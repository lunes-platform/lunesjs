import { serializeIssueToken } from "./utils"
import broadcast from "../../utils/broadcast"
import signer from "../../utils/signer"

export class Token {
    senderPublicKey: string
    description: string
    reissuable: number
    timestamp: number
    signature: string
    quantity: number
    decimals: number
    message: string
    name: string
    type: number
    fee: number
    constructor(
        senderPublicKey: string,
        description: string,
        reissuable: number,
        timestamp: number,
        quantity: number,
        decimals: number,
        name: string,
        fee: number
    ) {
        this.senderPublicKey = senderPublicKey
        this.description = description
        this.reissuable = reissuable
        this.timestamp = timestamp
        this.quantity = quantity
        this.decimals = decimals
        this.signature = ""
        this.message = ""
        this.name = name
        this.fee = fee
        this.type = 3
    }

    transaction() {
        return {
            senderPublicKey: this.senderPublicKey,
            description: this.description,
            reissuable: this.reissuable,
            timestamp: this.timestamp,
            signature: this.signature,
            quantity: this.quantity,
            decimals: this.decimals,
            name: this.name,
            type: this.type,
            fee: this.fee
        }
    }

    sign(privateKey: string): Token {
        ;[this.signature, this.message] = signer<Token>(
            privateKey,
            serializeIssueToken,
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

export type _Token = {
    senderPublicKey: string
    description: string
    reissuable?: boolean
    timestamp?: number
    quantity: number
    decimals?: number
    name: string
    fee?: number
}

export function issueTokenFactory(tx: _Token): Token {
    const timestamp = tx.timestamp != undefined ? tx.timestamp : Date.now()
    const decimals = tx.decimals != undefined ? tx.decimals : 8
    const fee = tx.fee != undefined ? tx.fee : 100000
    const reissuable = () => {
        if (tx.reissuable != undefined) {
            return tx.reissuable == true ? 1 : 0
        } else {
            return 1
        }
    }

    if (tx.description.length > 1000) throw new Error(`Description should be less than 1000, but ${tx.description.length}`)
    if (timestamp < 1483228800) throw new Error(`Timestamp should be greater than 1483228800, but ${timestamp}`)
    if (tx.name.length > 16) throw new Error(`Name should be less than 16 char, but ${tx.name.length}`)
    if (tx.quantity <= 0) throw new Error(`Amount should be greater than 0, but ${tx.quantity}`)
    if (decimals > 8) throw new Error(`Decimals should be less than 8, but ${decimals}`)
    if (fee < 100000) throw new Error(`Fee should be greater than 100000, but ${fee}`)

    return new Token(
        tx.senderPublicKey,
        tx.description,
        reissuable(),
        timestamp,
        Math.floor(tx.quantity * 10e7),
        decimals,
        tx.name,
        fee
    )
}

export type NFT = {
    senderPublicKey: string
    description: string
    timestamp?: number
    name: string
    fee?: number
}

export function issueNFTFactory(tx: NFT): Token {
    const timestamp = tx.timestamp != undefined ? tx.timestamp : Date.now()
    const fee = tx.fee != undefined ? tx.fee : 100000

    if (tx.description.length > 1000) throw new Error(`Description should be less than 1000, but ${tx.description.length}`)
    if (timestamp < 1483228800) throw new Error(`Timestamp should be greater than 1483228800, but ${timestamp}`)
    if (tx.name.length > 16) throw new Error(`Name should be less than 16 char, but ${tx.name.length}`)
    if (fee < 100000) throw new Error(`Fee should be greater than 100000, but ${fee}`)

    return new Token(
        tx.senderPublicKey,
        tx.description,
        0,
        timestamp,
        1,
        0,
        tx.name,
        fee
    )
}
