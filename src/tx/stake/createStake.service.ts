import * as wasm from "lunesrs"
import { serializeStake } from "./utils"
import { crypto } from "../../utils/crypto"
import signer from "../../utils/signer"
import broadcast from "../../utils/broadcast"

export class Stake {
    senderPublicKey: string
    timestamp: number
    signature: string
    recipient: string
    message: string
    amount: number
    type: number
    fee: number
    constructor(
        senderPublicKey: string,
        timestamp: number,
        receiver: string,
        amount: number,
        fee: number
    ) {
        this.senderPublicKey = senderPublicKey
        this.timestamp = timestamp
        this.signature = ""
        this.recipient = receiver
        this.message = ""
        this.amount = amount
        this.type = 8
        this.fee = fee
    }

    transaction() {
        return {
            senderPublicKey: this.senderPublicKey,
            timestamp: this.timestamp,
            signature: this.signature,
            recipient: this.recipient,
            amount: this.amount,
            type: this.type,
            fee: this.fee
        }
    }

    sign(privateKey: string): Stake {
        ;[this.signature, this.message] = signer<Stake>(
            privateKey,
            serializeStake,
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

export type createStake = {
    senderPublicKey: string
    receiverAddress: string
    timestamp?: number
    chain?: number
    amount: number
    fee?: number
}

export function createStakeFactory(tx: createStake): Stake {
    const timestamp = tx.timestamp != undefined ? tx.timestamp : Date.now()
    const fee = tx.fee != undefined ? tx.fee : 100000
    const chain = tx.chain != undefined ? tx.chain : 1
    const sender = wasm.arrayToBase58(
        wasm.toAddress(1, chain, wasm.base58ToArray(tx.senderPublicKey))
    )

    if (crypto.sameChainAddress(tx.receiverAddress, sender) != true) throw new Error("Sender AND Receiver should be same chain")
    if (timestamp < 1483228800) throw new Error(`Timestamp should be greater than 1483228800, but ${timestamp}`)
    if (tx.amount <= 0) throw new Error(`Amount should be greater than 0, but ${tx.amount}`)
    if (fee < 100000) throw new Error(`Fee should be greater than 100000, but ${fee}`)

    return new Stake(
        tx.senderPublicKey,
        timestamp,
        tx.receiverAddress,
        Math.floor(tx.amount * 10e7),
        fee
    )
}
