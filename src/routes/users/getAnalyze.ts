import { RequestHandler } from "express";

import { IUser } from "../../models/User";
import Token, { IToken } from "../../models/Token";
import TokensAmount from "../../models/TokensAmount";
import apiKeyMiddleware from "../../middlewares/apiKeyMiddleware";

interface IResult {
    token: IToken,
    amount: number
}

const getUserAnalyzeHandler: RequestHandler[] = [
    apiKeyMiddleware,
    async (req, res) => {
        try {
            const user = req.user as IUser;

            const tokens = await TokensAmount.find({ user: user._id })

            const amounts: IResult[] = []

            for (let i = 0; i < tokens.length; i++) {
                const selectToken = await Token.find({ address: tokens[i].address })

                if (!selectToken) {
                    continue
                }

                amounts.push({
                    token: selectToken as unknown as IToken,
                    amount: tokens[i].amount
                })
            }

            return res.status(200).j({
                message: 'Get user analyze successfuly',
                result: amounts
            });
        } catch (error) {
            return res.status(500).j({
                message: error.message,
            });
        }
    }
]

export default getUserAnalyzeHandler