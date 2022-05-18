import * as wasm from "lunesrs"
import { Token } from "./issueToken.service"
import { ReissueToken } from "./reissueToken.service"
import { BurnToken } from "./burnToken.service"

export function serializeIssueToken(tx: Token): Uint8Array {
    return new Uint8Array([
        ...[tx.type],
        ...wasm.base58ToArray(tx.senderPublicKey),
        ...wasm.serializeUInteger(BigInt(tx.name.length)),
        ...wasm.serializeString(tx.name),
        ...wasm.serializeString(tx.description),
        ...wasm.serializeString(tx.description),
        ...wasm.serializeUInteger(BigInt(tx.quantity)),
        ...wasm.serializeUInteger(BigInt(tx.decimals)),
        ...[tx.reissuable],
        ...wasm.serializeUInteger(BigInt(tx.fee)),
        ...wasm.serializeUInteger(BigInt(tx.timestamp))
    ])
}

export function serializeReissueToken(tx: ReissueToken): Uint8Array {
    return new Uint8Array([
        ...[tx.type],
        ...wasm.base58ToArray(tx.senderPublicKey),
        ...wasm.base58ToArray(tx.assetId),
        ...wasm.serializeUInteger(BigInt(tx.quantity)),
        ...wasm.serializeUInteger(BigInt(tx.reissuable)),
        ...wasm.serializeUInteger(BigInt(tx.fee)),
        ...wasm.serializeUInteger(BigInt(tx.timestamp))
    ])
}

export function serializeBurnToken(tx: BurnToken): Uint8Array {
    return new Uint8Array([
        ...[tx.type],
        ...wasm.base58ToArray(tx.senderPublicKey),
        ...wasm.base58ToArray(tx.assetId),
        ...wasm.serializeUInteger(BigInt(tx.quantity)),
        ...wasm.serializeUInteger(BigInt(tx.fee)),
        ...wasm.serializeUInteger(BigInt(tx.timestamp))
    ])
}
