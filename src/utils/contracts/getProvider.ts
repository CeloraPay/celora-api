import { ethers, Contract } from 'ethers';

import envs from '../../config/envs';
import GATEWAY_ABI from "../../abi/GATEWAY_ABI.json";

const getConfigs = () => {
    const { RPC_URI, ADMIN_SECRET_KEY, GATEWAY_CONTRACT } = envs();


    const provider = new ethers.JsonRpcProvider(RPC_URI);
    const wallet = new ethers.Wallet(ADMIN_SECRET_KEY, provider);
    const gatewayContract = new Contract(GATEWAY_CONTRACT, GATEWAY_ABI, wallet);

    return {
        wallet,
        provider,
        gatewayContract
    };
};

export default getConfigs;