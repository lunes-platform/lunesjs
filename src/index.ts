import { transferTokenFactory } from "./tx/transfer/transfer.service"
import { withdrawStakeFactory } from "./tx/stake/withdrawStake.service"
import { createStakeFactory } from "./tx/stake/createStake.service"
import { walletFactory } from "./wallet/wallet.service"
import { crypto } from "./utils/crypto"

export default {
    transferTokenFactory,
    withdrawStakeFactory,
    createStakeFactory,
    walletFactory,
    crypto
}
