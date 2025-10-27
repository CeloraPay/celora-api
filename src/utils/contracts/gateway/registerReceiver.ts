import { Contract } from "ethers";

import getConfigs from "../getProvider";
import envs from "../../../config/envs";

import GATEWAY_ABI from "../../../abi/GATEWAY_ABI.json";

const registerReceiver = async (receiver: string) => {
    const { GATEWAY_CONTRACT } = envs()
    const { wallet } = getConfigs()

    const gatewayContract = new Contract(GATEWAY_CONTRACT, GATEWAY_ABI, wallet);

    const tx = await gatewayContract.registerReceiver(
        receiver,
    );

    const result = await tx.wait();

    return result
}

export default registerReceiver