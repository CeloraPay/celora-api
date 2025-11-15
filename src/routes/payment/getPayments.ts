import z from "zod";
import { RequestHandler } from "express";

import Payment from "../../models/Payment";
import apiKeyMiddleware from "../../middlewares/apiKeyMiddleware";
import { IUser } from "../../models/User";

const getPaymentsHandler: RequestHandler[] = [
    apiKeyMiddleware,
    async (req, res) => {
        try {
            const user = req.user as IUser
            const payment = await Payment.find({ user: user._id }).populate("token")

            if (!payment.length) {
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

export default getPaymentsHandler