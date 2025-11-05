import z from "zod";
import { isAddress } from "ethers";
import { RequestHandler } from "express";

import User from "../../models/User";
import randomKey from "../../utils/randomKey";
import validatorMiddleware from "../../middlewares/validatorMiddleware";
import registerReceiver from "../../utils/contracts/gateway/registerReceiver";

const addUserHandler: RequestHandler[] = [
    validatorMiddleware({
        body: z.object({
            address: z.string(),
            description: z.string()
        }),
    }),
    async (req, res) => {
        try {
            const { address, description } = req.body;

            if (!isAddress(address)) {
                return res.status(400).j({
                    message: 'Address invalid',
                });
            }

            const user = await User.findOne({ address })

            if (user) {
                return res.status(400).j({
                    message: 'User exist',
                    result: user
                });
            }

            const newUser = new User({
                plan: 0,
                address,
                description,
                telegramId: "",
                apikey: randomKey()
            })

            const result = await registerReceiver(address, description)

            if (!result) {
                return res.status(400).j({
                    message: 'User added faild',
                });
            }

            await newUser.save()

            return res.status(201).j({
                message: 'User added successfuly',
                result: newUser
            });
        } catch (error) {
            return res.status(500).j({
                message: error.message,
            });
        }
    }
]

export default addUserHandler