import { ethers } from 'ethers';

import envs from '../../config/envs';

const getConfigs = () => {
    const { RPC_URI, ADMIN_SECRET_KEY } = envs();

    const provider = new ethers.JsonRpcProvider(RPC_URI);
    const wallet = new ethers.Wallet(ADMIN_SECRET_KEY, provider);

    return {
        provider,
        wallet,
    };
};

export default getConfigs;