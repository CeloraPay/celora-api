import User from "../../models/User"
import TokensAmount from "../../models/TokensAmount"
import getReceiver from "../contracts/gateway/getReceiver"

const updateUserDetails = async (address: string) => {
    const receiver = await getReceiver(address)

    const user = await User.findOne({ address })

    if (!user) {
        return
    }

    for (let i = 0; i < receiver.tokens.length; i++) {
        const tokenAdsress = receiver.tokens[i].address
        const tokenAmount = receiver.tokens[i].amount

        const token = await TokensAmount.findOne({ address: tokenAdsress })

        if (!token) {
            const nt = new TokensAmount({
                user: user._id,
                address: tokenAdsress,
                amount: tokenAmount,
            })

            await nt.save()
            continue
        }

        token.amount = tokenAmount

        await token.save()
    }

}

export default updateUserDetails