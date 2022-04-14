import { ITransfer } from "./transfer.types"
import * as wasm from "lunesrs"

export function serializeTransfer(tx: ITransfer): Uint8Array {
    const tokenId: Uint8Array =
        tx.assetId != ""
            ? new Uint8Array([1, ...wasm.base58ToArray(tx.assetId)])
            : new Uint8Array([0])
    const tokenFee: Uint8Array =
        tx.feeAsset != ""
            ? new Uint8Array([1, ...wasm.base58ToArray(tx.feeAsset)])
            : new Uint8Array([0])

    return new Uint8Array([
        ...[4],
        ...wasm.base58ToArray(tx.senderPublicKey),
        ...tokenId,
        ...tokenFee,
        ...wasm.serializeUInteger(BigInt(tx.timestamp)),
        ...wasm.serializeUInteger(BigInt(tx.amount)),
        ...wasm.serializeUInteger(BigInt(tx.fee)),
        ...wasm.base58ToArray(tx.receiver)
    ])
}


export function signTransfer(privateKey: string, tx: ITransfer): string {
    const message = serializeTransfer(tx)

    return wasm.arrayToBase58(
        wasm.fastSignature(
            wasm.base58ToArray(privateKey),
            message
        )
    )
}

export interface ITransfer {
    senderPublicKey: string
    timestamp: number
    signature: string
    receiver: string
    feeAsset: string
    assetId: string
    amount: number
    sender: string
    type: number
    fee: number
}
