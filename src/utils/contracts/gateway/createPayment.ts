import { Contract, ZeroAddress, parseEther } from "ethers";

import getConfigs from "../getProvider";
import envs from "../../../config/envs";

import GATEWAY_ABI from "../../../abi/GATEWAY_ABI.json";
import getLogsFromResult from "../getLogsFromResult";

const createPayment = async (receiver: string, token: string, amount: string, isTransferFiat: boolean) => {
    const { GATEWAY_CONTRACT } = envs()
    const { wallet } = getConfigs()

    const gatewayContract = new Contract(GATEWAY_CONTRACT, GATEWAY_ABI, wallet);

    const payer = ZeroAddress;
    const amounts = parseEther(amount);
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

    const {
        invoiceId,
        escrowAddress,
        expiresAt
    } = event.args;

    return {
        invoiceId,
        escrowAddress,
        expiresAt
    }
}

export default createPayment