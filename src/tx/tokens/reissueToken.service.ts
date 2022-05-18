import { serializeReissueToken } from "./utils"
import broadcast from "../../utils/broadcast"
import signer from "../../utils/signer"

export class ReissueToken {
    senderPublicKey: string
    reissuable: number
    timestamp: number
    signature: string
    quantity: number
    assetId: string
    message: string
    type: number
    fee: number
    constructor(
        senderPublicKey: string,
        reissuable: number,
        timestamp: number,
        quantity: number,
        assetId: string,
        fee: number
    ) {
        this.senderPublicKey = senderPublicKey
        this.reissuable = reissuable
        this.timestamp = timestamp
        this.quantity = quantity
        ;(this.assetId = assetId), (this.signature = "")
        this.message = ""
        this.fee = fee
        this.type = 6
    }

    transaction() {
        return {
            senderPublicKey: this.senderPublicKey,
            reissuable: this.reissuable,
            timestamp: this.timestamp,
            signature: this.signature,
            quantity: this.quantity,
            assetId: this.assetId,
            type: this.type,
            fee: this.fee
        }
    }

    sign(privateKey: string): ReissueToken {
        ;[this.signature, this.message] = signer<ReissueToken>(
            privateKey,
            serializeReissueToken,
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
    reissuable?: boolean
    timestamp?: number
    quantity: number
    tokenId: string
    fee?: number
}

export function reissueTokenFactory(tx: Reissue): ReissueToken {
    const timestamp = tx.timestamp != undefined ? tx.timestamp : Date.now()
    const fee = tx.fee != undefined ? tx.fee : 100000
    const reissuable = () => {
        if (tx.reissuable != undefined) {
            return tx.reissuable == true ? 1 : 0
        } else {
            return 1
        }
    }

    if (timestamp < 1483228800) {
        throw new Error(
            `Timestamp should be greater than 1483228800, but ${timestamp}`
        )
    }
    if (tx.quantity <= 0) {
        throw new Error(`Amount should be greater than 0, but ${tx.quantity}`)
    }
    if (fee < 100000) {
        throw new Error(`Fee should be greater than 100000, but ${fee}`)
    }

    return new ReissueToken(
        tx.senderPublicKey,
        reissuable(),
        timestamp,
        Math.floor(tx.quantity * 10e7),
        tx.tokenId,
        fee
    )
}
