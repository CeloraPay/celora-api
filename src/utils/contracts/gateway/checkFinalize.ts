import log from "../../../config/logger";
import getConfigs from "../getProvider";
import getReadyFinalize from "./getReadyFinalize"
import { ONE_SECENDS } from "../../../constants/dates";
import updatePayment from "../../payments/updatePayment";

const checkFinalize = async () => {
    const { gatewayContract } = getConfigs()

    const ids = await getReadyFinalize()

    for (let i = 0; i < ids.length; i++) {
        try {
            const tx = await gatewayContract.finalizePayment(ids[i], false);
            const result = await tx.wait();

            if (!result.status) {
                log.error(`id(${ids[i]}) faild finalize`)
                continue
            }

            updatePayment(ids[i])
        } catch (e) {
            log.error(e.message)
        }
    }

    await new Promise((resolve) => setTimeout(resolve, ONE_SECENDS * 2));
    checkFinalize()
}

export default checkFinalize