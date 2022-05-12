import broadcast from "../../utils/broadcast"
import signer from "../../utils/signer"
import { serializeWithoutStake } from "./utils"

export class WithdrawStake {
    senderPublicKey: string
    timestamp: number
    signature: string
    id: string
    message: string
    type: number
    fee: number
    constructor(
        senderPublicKey: string,
        timestamp: number,
        id: string,
        fee: number
    ) {
        this.senderPublicKey = senderPublicKey
        this.timestamp = timestamp
        this.signature = ""
        this.id = id
        this.message = ""
        this.type = 9
        this.fee = fee
    }

    transaction() {
        return {
            senderPublicKey: this.senderPublicKey,
            timestamp: this.timestamp,
            signature: this.signature,
            id: this.id,
            type: this.type,
            fee: this.fee
        }
    }

    sign(privateKey: string): WithdrawStake {
        ;[this.signature, this.message] = signer(
            privateKey,
            serializeWithoutStake,
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

export type withdrawStake = {
    senderPublicKey: string
    timestamp?: number
    id: string
    fee?: number
}

export function withdrawStakeFactory(tx: withdrawStake): WithdrawStake {
    const timestamp = tx.timestamp != undefined ? tx.timestamp : Date.now()
    const fee = tx.fee != undefined ? tx.fee : 100000

    if (timestamp < 1483228800) {
        throw new Error(
            `Timestamp should be greater than 1483228800, but ${timestamp}`
        )
    }
    if (fee < 100000) {
        throw new Error(`Fee should be greater than 100000, but ${fee}`)
    }
    return new WithdrawStake(tx.senderPublicKey, timestamp, tx.id, fee)
}
