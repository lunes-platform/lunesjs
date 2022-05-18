import { serializeBurnToken } from "./utils"
import broadcast from "../../utils/broadcast"
import signer from "../../utils/signer"

export class BurnToken {
    senderPublicKey: string
    timestamp: number
    signature: string
    quantity: number
    assetId: string
    message: string
    type: number
    fee: number
    constructor(
        senderPublicKey: string,
        timestamp: number,
        quantity: number,
        assetId: string,
        fee: number
    ) {
        this.senderPublicKey = senderPublicKey
        this.timestamp = timestamp
        this.quantity = quantity
        this.assetId = assetId
        this.signature = ""
        this.message = ""
        this.fee = fee
        this.type = 5
    }

    transaction() {
        return {
            senderPublicKey: this.senderPublicKey,
            timestamp: this.timestamp,
            signature: this.signature,
            quantity: this.quantity,
            assetId: this.assetId,
            type: this.type,
            fee: this.fee
        }
    }

    sign(privateKey: string): BurnToken {
        ;[this.signature, this.message] = signer<BurnToken>(
            privateKey,
            serializeBurnToken,
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

export type Reissue = {
    senderPublicKey: string
    timestamp?: number
    quantity: number
    tokenId: string
    fee?: number
}

export function burnTokenFactory(tx: Reissue): BurnToken {
    const timestamp = tx.timestamp != undefined ? tx.timestamp : Date.now()
    const fee = tx.fee != undefined ? tx.fee : 100000

    if (timestamp < 1483228800) throw new Error(`Timestamp should be greater than 1483228800, but ${timestamp}`)
    if (tx.quantity <= 0) throw new Error(`Amount should be greater than 0, but ${tx.quantity}`)
    if (fee < 100000) throw new Error(`Fee should be greater than 100000, but ${fee}`)

    return new BurnToken(
        tx.senderPublicKey,
        timestamp,
        Math.floor(tx.quantity * 10e7),
        tx.tokenId,
        fee
    )
}
