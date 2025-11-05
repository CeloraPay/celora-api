import z from "zod";
import { RequestHandler } from "express";

import Payment from "../../models/Payment";
import validatorMiddleware from "../../middlewares/validatorMiddleware";

const getPaymentHandler: RequestHandler[] = [
    validatorMiddleware({
        params: z.object({
            address: z.string(),
        }),
    }),
    async (req, res) => {
        try {
            const { address } = req.params;

            const payment = await Payment.findOne({ paymentAddr: address }).populate("token")

            if (!payment) {
                return res.status(404).j({
                    message: 'Payment not found'
                });
            }

            return res.status(200).j({
                message: 'Get payment successfuly',
                result: payment
            });

        } catch (error) {
            return res.status(500).j({
                message: error.message,
            });
        }
    }
]

export default getPaymentHandler