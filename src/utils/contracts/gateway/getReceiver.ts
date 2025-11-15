import bigIntToNumber from "../../bigIntToNumber";
import getConfigs from "../getProvider"

export interface IReceiverDetailsBlockchain {
    receiver: IReceiverDetails,
    receiverToken: IToken[]
}

interface IReceiverDetails {
    addr: string;
    planId: bigint;
    invoiceIds: bigint[];
    activePayments: bigint;
    name: string;

}

interface IToken {
    token: string;
    amount: bigint;
}

const getReceiver = async (address: string) => {
    const { gatewayContract } = getConfigs()

    const [receiver, receiverToken]: [IReceiverDetails, IToken[]] = await gatewayContract.getReceiver(address)

    const invoiceIds = receiver.invoiceIds.map((i) => bigIntToNumber(i))

    const tokens = receiverToken.map((t) => {
        return {
            address: t.token,
            amount: bigIntToNumber(t.amount)
        }
    })

    const receiverDetails = {
        tokens,
        invoiceIds,
        activePayments: bigIntToNumber(receiver.activePayments),
        name: receiver.name,
        address: receiver.addr,
        planId: bigIntToNumber(receiver.planId),
    }

    return receiverDetails
}

export default getReceiver