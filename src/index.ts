import { transferTokenFactory } from "./tx/transfer/transfer.service"
import { blockchain } from "./blockchain/service.blockchain"
import { walletFactory } from "./wallet/wallet.service"
import { crypto } from "./utils/crypto"

export default {
    transferTokenFactory,
    walletFactory,
    blockchain,
    crypto
}
