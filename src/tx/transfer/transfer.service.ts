import { serializeTransfer } from "./utils"
import { crypto } from "../../utils/crypto"
import * as wasm from "lunesrs"
import signer from "../../utils/signer"
import broadcast from "../../utils/broadcast"

export class TransferToken {
    senderPublicKey: string
    timestamp: number
    signature: string
    recipient: string
    feeAsset: string
    message: string
    assetId: string
    amount: number
    sender: string
    type: number
    fee: number
    constructor(
        senderPublicKey: string,
        timestamp: number,
        receiver: string,
        feeAsset: string,
        assetId: string,
        amount: number,
        sender: string,
        fee: number
    ) {
        this.senderPublicKey = senderPublicKey
        this.timestamp = timestamp
        this.signature = ""
        this.recipient = receiver
        this.feeAsset = feeAsset
        this.message = ""
        this.assetId = assetId
        this.amount = amount
        this.sender = sender
        this.type = 4
        this.fee = fee
    }

    transaction() {
        return {
            senderPublicKey: this.senderPublicKey,
            timestamp: this.timestamp,
            signature: this.signature,
            recipient: this.recipient,
            feeAsset: this.feeAsset,
            assetId: this.assetId,
            amount: this.amount,
            sender: this.sender,
            type: this.type,
            fee: this.fee
        }
    }

    sign(privateKey: string): TransferToken {
        ;[this.signature, this.message] = signer<TransferToken>(
            privateKey,
            serializeTransfer,
            this
        )
        return this
    }

    async broadcast(node?: string) {
        return await broadcast(
            node != undefined ? node : "https://lunesnode.lunes.io",
            this.transaction()
        )
    }
}

export type Transfer = {
    senderPublicKey: string
    receiverAddress: string
    timestamp?: number
    feeAsset?: string
    assetId?: string
    chain?: number
    amount: number
    fee?: number
}

export function transferTokenFactory(tx: Transfer): TransferToken {
    const timestamp = tx.timestamp != undefined ? tx.timestamp : Date.now()
    const feeAsset = tx.feeAsset != undefined ? tx.feeAsset : ""
    const assetId = tx.assetId != undefined ? tx.assetId : ""
    const fee = tx.fee != undefined ? tx.fee : 100000
    const chain = tx.chain != undefined ? tx.chain : 1
    const sender = wasm.arrayToBase58(
        wasm.toAddress(1, chain, wasm.base58ToArray(tx.senderPublicKey))
    )

    if (crypto.sameChainAddress(tx.receiverAddress, sender) != true) throw new Error("Sender AND Receiver should be same chain")
    if (timestamp < 1483228800) throw new Error(`Timestamp should be greater than 1483228800, but ${timestamp}`)
    if (tx.amount <= 0) throw new Error(`Amount should be greater than 0, but ${tx.amount}`)
    if (fee < 100000) throw new Error(`Fee should be greater than 100000, but ${fee}`)

    return new TransferToken(
        tx.senderPublicKey,
        timestamp,
        tx.receiverAddress,
        feeAsset,
        assetId,
        Math.floor(tx.amount * 10e7),
        sender,
        fee
    )
}
