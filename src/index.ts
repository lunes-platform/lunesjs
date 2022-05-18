import { transferTokenFactory } from "./tx/transfer/transfer.service"
import { withdrawStakeFactory } from "./tx/stake/withdrawStake.service"
import { createStakeFactory } from "./tx/stake/createStake.service"
import { walletFactory } from "./wallet/wallet.service"
import { crypto } from "./utils/crypto"
import { issueTokenFactory } from "./tx/tokens/issueToken.service"
import { issueNFTFactory } from "./tx/tokens/issueToken.service"
import { reissueTokenFactory } from "./tx/tokens/reissueToken.service"
import { burnTokenFactory } from "./tx/tokens/burnToken.service"

export default {
    transferTokenFactory,
    withdrawStakeFactory,
    reissueTokenFactory,
    createStakeFactory,
    issueTokenFactory,
    burnTokenFactory,
    issueNFTFactory,
    walletFactory,
    crypto
}
