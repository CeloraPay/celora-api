import getConfigs from '../getProvider';

const getReadyFinalize = async () => {
    const { gatewayContract } = getConfigs()

    const paymentsReady: bigint[] = await gatewayContract.getReadyToFinalizeInvoices();

    return paymentsReady
}

export default getReadyFinalize