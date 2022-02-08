import { $log } from "@tsed/logger"
import { TransferTransaction } from "../BaseTransaction"
import cryptoUtils from "../../../utils/crypto"

const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
$log.name = "TRANSFER"

export function validateTransfer(transaction: TransferTransaction) {
    for (const i of transaction.sender) {
        if (!alphabet.includes(i)) {
            $log.error("Sender invalid `public key`")
            return false
        }
    }

    if (transaction.amount <= 0) {
        $log.error("amount should be greater than zero")
        return false
    }

    if (!cryptoUtils.validateAddress(transaction.receiver, transaction.chain)) {
        $log.error("receiver address is invalid")
        return false
    }

    return true
}
