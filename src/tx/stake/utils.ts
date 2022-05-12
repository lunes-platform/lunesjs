import * as wasm from "lunesrs"
import { Stake } from "./createStake.service"
import { WithdrawStake } from "./withdrawStake.service"

export function serializeStake(tx: Stake): Uint8Array {
    return new Uint8Array([
        ...[tx.type],
        ...wasm.base58ToArray(tx.senderPublicKey),
        ...wasm.base58ToArray(tx.recipient),
        ...wasm.serializeUInteger(BigInt(tx.amount)),
        ...wasm.serializeUInteger(BigInt(tx.fee)),
        ...wasm.serializeUInteger(BigInt(tx.timestamp))
    ])
}
export function serializeWithoutStake(tx: WithdrawStake): Uint8Array {
    return new Uint8Array([
        ...[tx.type],
        ...wasm.base58ToArray(tx.senderPublicKey),
        ...wasm.serializeUInteger(BigInt(tx.fee)),
        ...wasm.serializeUInteger(BigInt(tx.timestamp)),
        ...wasm.base58ToArray(tx.id)
    ])
}
