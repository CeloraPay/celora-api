import z from "zod";
import { RequestHandler } from "express";

import { IUser } from "../../models/User";
import Payment from "../../models/Payment";
import { IToken } from "../../models/Token";
import getTokens from "../../utils/getTokens";
import { FIFTEEN_MINUTES } from "../../constants/dates";
import convertUsdToToken from "../../utils/convertUsdToToken";
import checkCurrencyExists from "../../utils/checkCurrencyExists";
import apiKeyMiddleware from "../../middlewares/apiKeyMiddleware";
import convertCurrencyToUsd from "../../utils/convertCurrencyToUsd";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import createPayment from "../../utils/contracts/gateway/createPayment";

const createPaymentHandler: RequestHandler[] = [
    apiKeyMiddleware,
    validatorMiddleware({
        body: z.object({
            token: z.string(),
            amount: z.string(),
            currency: z.string(),
            descriptions: z.string(),
            redirectUrl: z
                .string({
                    required_error: 'redirectUrl is required',
                    invalid_type_error: 'redirectUrl must be a string',
                })
                .url({
                    message: 'redirectUrl must be a valid URL',
                }),
        }),
    }),
    async (req, res) => {
        try {
            const { token, amount, descriptions, currency, redirectUrl } = req.body;
            const user = req.user as IUser;

            let selectedCurrency = 'usd';

            if (currency) {
                selectedCurrency = currency.toLowerCase();
            }

            const existingCurrency = await checkCurrencyExists(selectedCurrency);

            if (!existingCurrency) {
                return res.status(400).j({
                    message: 'Currency does not exist',
                });
            }

            const tokens = await getTokens() as IToken[]
            const tokensName = tokens.map((token) => token.symbol)

            if (!tokensName.includes(token)) {
                return res.status(400).j({
                    message: 'Token does not exist',
                });
            }

            const selectToken = tokens.filter((t) => t.symbol == token)[0]

            const number = convertCurrencyToUsd(amount, existingCurrency.rate);
            console.log(number)

            const amounts = await convertUsdToToken(selectToken.symbol, number);

            const newPayment = new Payment({
                redirectUrl, // @ts-ignore
                descriptions,
                amount: number,
                user: user._id,
                status: 'pending',
                initialAmount: amounts,
                token: selectToken._id,
                currency: selectedCurrency,
                expiredTime: Date.now() + FIFTEEN_MINUTES,
            });

            const result = await createPayment(user.address, selectToken.address, amounts)

            if (!result) {
                return res.status(500).j({
                    message: 'Payment create faild',
                });
            }

            newPayment.invoiceId = result.invoiceId
            newPayment.escrowAddress = result.escrowAddress

            await newPayment.save()

            return res.status(201).j({
                message: 'Payment create successfuly',
                result: newPayment
            });
        } catch (error) {
            return res.status(500).j({
                message: error.message,
            });
        }
    }
]

export default createPaymentHandler