import bigIntToNumber from "../../bigIntToNumber";
import getConfigs from "../getProvider"

export interface IPaymentDetailsBlockchain {
    paymentAddr: string;
    payer: string;
    receiver: string;
    token: string;
    amount: bigint;
    createdAt: bigint;
    expiresAt: bigint;
    invoiceId: bigint;
    receiveFiat: boolean;
    depositedAmount: bigint;
    finalized: boolean;
}

const getPayment = async (address: string) => {
    const { gatewayContract } = getConfigs()

    const payment: IPaymentDetailsBlockchain = await gatewayContract.getPayment(address)

    const paymentDetails = {
        token: payment.token,
        payer: payment.payer,
        receiver: payment.receiver,
        finalized: payment.finalized,
        paymentAddr: payment.paymentAddr,
        receiveFiat: payment.receiveFiat,
        amount: bigIntToNumber(payment.amount),
        createdAt: bigIntToNumber(payment.createdAt),
        invoiceId: bigIntToNumber(payment.invoiceId),
        expiresAt: bigIntToNumber(payment.expiresAt),
        depositedAmount: bigIntToNumber(payment.depositedAmount),
    }

    return paymentDetails

}

export default getPayment