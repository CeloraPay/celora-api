import { Contract } from "ethers";

const getLogsFromResult = (tx: any, gatewayContract: Contract, eventName: string) => {
    const event = tx.logs
        .map(log => {
            try {
                return gatewayContract.interface.parseLog(log);
            } catch {
                return null;
            }
        })
        .filter(e => e && e.name === eventName)[0];

    if (!event) {
        return null
    }

    return event
}

export default getLogsFromResult