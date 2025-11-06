import z from "zod";
import { isAddress } from "ethers";
import { RequestHandler } from "express";

import User from "../../models/User";
import validatorMiddleware from "../../middlewares/validatorMiddleware";

const getUserHandler: RequestHandler[] = [
    validatorMiddleware({
        params: z.object({
            address: z.string(),
        }),
    }),
    async (req, res) => {
        try {
            const { address } = req.params;

            if (!isAddress(address)) {
                return res.status(400).j({
                    message: 'Address invalid',
                });
            }

            const user = await User.findOne({ address })

            if (!user) {
                return res.status(404).j({
                    message: 'User not exist',
                    result: user
                });
            }

            return res.status(200).j({
                message: 'Get user successfuly',
                result: user
            });
        } catch (error) {
            return res.status(500).j({
                message: error.message,
            });
        }
    }
]

export default getUserHandler