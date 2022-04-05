import { TransactionsTypes } from "../transactions.types"
import { WalletTypes } from "../../wallet/wallet.types"
import { BaseTransaction } from "../BaseTransaction"
import { ITransfer } from "./transfer.types"
import validator from "./validator"
import * as wasm from "lunesrs"

class TransferToken implements BaseTransaction {
    private tx: ITransfer
    constructor(tx: ITransfer) {
        this.tx = tx
    }

    transaction(): ITransfer {
        return this.tx
    }

    sign(privateKey: WalletTypes.PrivateKey): ITransfer {
        this.tx.signature = validator.sign(privateKey, this.tx)
        return this.tx
    }

    async send() {
        validator.send(this.tx)
    }
}

export function transferTokenFactory(
    senderPublicKey: string,
    recipient: string,
    amount: number,
    assetId?: string,
    chain?: WalletTypes.Chain,
    timestamp?: number,
    feeAsset?: string,
    fee?: number
): TransferToken {
    const chain_id = chain != undefined ? chain : WalletTypes.Chain.Mainnet
    if (
        false == validator.ready(senderPublicKey, recipient, amount, chain_id)
    ) {
        throw new Error("dados invalidos")
    }
    return new TransferToken({
        senderPublicKey: senderPublicKey,
        recipient: recipient,
        amount: amount,
        sender: wasm.arrayToBase58(
            wasm.toAddress(1, chain_id, wasm.base58ToArray(senderPublicKey))
        ),
        timestamp: timestamp != undefined ? timestamp : new Date().getTime(),
        feeAsset: feeAsset != undefined ? feeAsset : "",
        assetId: assetId != undefined ? assetId : "",
        type: TransactionsTypes.TransferToken.int,
        fee: fee != undefined ? fee : TransactionsTypes.TransferToken.fee,
        signature: ""
    })
}
