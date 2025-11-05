import { Contract } from "ethers";

import getConfigs from "../getProvider";
import envs from "../../../config/envs";

import GATEWAY_ABI from "../../../abi/GATEWAY_ABI.json";
import log from "../../../config/logger";

const registerReceiver = async (receiver: string, description: string) => {
    try {
        const { GATEWAY_CONTRACT } = envs()
        const { wallet } = getConfigs()

        const gatewayContract = new Contract(GATEWAY_CONTRACT, GATEWAY_ABI, wallet);

        const tx = await gatewayContract.registerReceiver(
            receiver,
            description
        );

        await tx.wait();

        return true
    } catch (e) {
        log.error(e.message)

        return false
    }
}

export default registerReceiver