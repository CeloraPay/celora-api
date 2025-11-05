import { Contract, ZeroAddress, parseUnits } from "ethers";

import getConfigs from "../getProvider";
import envs from "../../../config/envs";

import GATEWAY_ABI from "../../../abi/GATEWAY_ABI.json";
import getLogsFromResult from "../getLogsFromResult";

const createPayment = async (receiver: string, token: string, decimal: number, amount: string, isTransferFiat: boolean) => {
    const { GATEWAY_CONTRACT } = envs()
    const { wallet } = getConfigs()

    const gatewayContract = new Contract(GATEWAY_CONTRACT, GATEWAY_ABI, wallet);

    const payer = ZeroAddress;
    const amounts = parseUnits(amount, decimal);
    const durationSeconds = 15 * 60;

    const tx = await gatewayContract.createPayment(
        payer,
        receiver,
        token,
        amounts,
        durationSeconds,
        isTransferFiat
    );

    const result = await tx.wait();

    const event = getLogsFromResult(result, gatewayContract, "PaymentCreated")

    if (!event) {
        return false
    }

    return {
        invoiceId: event.args[0],
        paymentAddr: event.args[1],
        expiresAt: event.args[6]
    }
}

export default createPayment