import { WalletTypes } from "../../wallet/wallet.types"
import { TransactionsTypes } from "../transactions.types"
import cryptoUtils from "../../../utils/crypto"
import { ITransfer } from "./transfer.types"
import * as wasm from "lunesrs"
import axios from "axios"

const validator = {
    serialize: (
        senderPublicKey: string,
        assetId: string,
        feeAsset: string,
        timestamp: number,
        amount: number,
        fee: number,
        recipient: string
    ): Array<number> => {
        const tokenId = assetId != "" ? [1, ...wasm.base58ToArray(assetId)] : [0]
        const tokenFee = feeAsset != "" ? [1, ...wasm.base58ToArray(feeAsset)] : [0]
        return [
            ...[TransactionsTypes.TransferToken.int],
            ...wasm.base58ToArray(senderPublicKey),
            ...tokenId,
            ...tokenFee,
            ...wasm.serializeUInteger(BigInt(timestamp)),
            ...wasm.serializeUInteger(BigInt(amount)),
            ...wasm.serializeUInteger(BigInt(fee)),
            ...wasm.base58ToArray(recipient)
        ]
    },
    ready: (
        senderPublicKey: string,
        recipient: string,
        amount: number,
        chain: WalletTypes.Chain
    ): boolean => {
        const sender = wasm.arrayToBase58(
            wasm.toAddress(1, chain, wasm.base58ToArray(senderPublicKey))
        )
        if (amount <= 0) {
            return false
        } else if (
            !(
                cryptoUtils.validateAddress(sender, chain) === true &&
                cryptoUtils.validateAddress(recipient, chain) === true
            )
        ) {
            return false
        } else {
            return true
        }
    },
    sign: (privateKey: WalletTypes.PrivateKey, tx: ITransfer): string => {
        const message = validator.serialize(
            tx.senderPublicKey,
            tx.assetId,
            tx.feeAsset,
            tx.timestamp,
            tx.amount,
            tx.fee,
            tx.recipient
        )
        return cryptoUtils.fastSignature(
            privateKey,
            wasm.arrayToBase58(new Uint8Array(message))
        )
    },
    send: async (tx: ITransfer) => {
        await axios
            .request({
                url: "https://lunesnode.lunes.io/transactions/broadcast",
                method: "post",
                data: tx
            })
            .then((x) => {
                console.log(x)
            })
            .catch((error) => {
                console.error(error.response.data)
            })
    }
}

export default validator
