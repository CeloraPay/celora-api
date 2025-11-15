import log from "../../config/logger"
import Payment from "../../models/Payment"
import bigIntToNumber from "../bigIntToNumber"
import getPayment from "../contracts/gateway/getPayment"
import updateUserDetails from "../user/updateUserDetails"

const updatePayment = async (id: bigint) => {
    const payment = await Payment.findOne({ invoiceId: bigIntToNumber(id) })

    if (!payment) {
        log.error(`id(${id}) not found in db`)
        return
    }

    const paymentDetails = await getPayment(payment.paymentAddr)

    payment.finalized = paymentDetails.finalized
    payment.depositedAmount = paymentDetails.depositedAmount
    payment.isTransfer = paymentDetails.depositedAmount > 0 ? true : false
    payment.status = paymentDetails.depositedAmount > 0 ? "completed" : "expired"  

    await payment.save()

    updateUserDetails(paymentDetails.receiver)
}

export default updatePayment