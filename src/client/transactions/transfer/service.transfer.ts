import { TransactionsTypes } from "../transactions.types"
import { WalletTypes } from "../../wallet/wallet.types"
import { BaseTransaction } from "../BaseTransaction"
import { ITransfer } from "./transfer.types"
import validator from "./validator"
import * as wasm from "lunesrs"

class TransferToken implements BaseTransaction {
    private tx: ITransfer
    private chain: WalletTypes.Chain
    constructor(tx: ITransfer, chain: WalletTypes.Chain) {
        this.tx = tx
        this.chain = chain
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
    chain?: WalletTypes.Chain,
    timestamp?: number,
    feeAsset?: string,
    assetId?: string,
    fee?: number
): TransferToken {
    const chain_id = chain != undefined ? chain : WalletTypes.Chain.Mainnet
    if (
        false == validator.ready(senderPublicKey, recipient, amount, chain_id)
    ) {
        throw new Error("dados invalidos")
    }
    return new TransferToken(
        {
            senderPublicKey: senderPublicKey,
            recipient: recipient,
            amount: amount,
            sender: wasm.hexToB58(
                wasm.toAddressHex(1, chain_id, wasm.b58ToVec(senderPublicKey))
            ),
            timestamp:
                timestamp != undefined ? timestamp : new Date().getTime(),
            feeAsset: feeAsset != undefined ? feeAsset : "",
            assetId: assetId != undefined ? assetId : "",
            type: TransactionsTypes.TransferToken.int,
            fee: fee != undefined ? fee : TransactionsTypes.TransferToken.fee,
            signature: ""
        },
        chain_id
    )
}
