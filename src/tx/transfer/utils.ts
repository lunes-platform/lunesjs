import { TransferToken } from "./transfer.service"
import * as wasm from "lunesrs"

export function serializeTransfer(tx: TransferToken): Uint8Array {
    const tokenId: Uint8Array =
        tx.assetId != ""
            ? new Uint8Array([1, ...wasm.base58ToArray(tx.assetId)])
            : new Uint8Array([0])
    const tokenFee: Uint8Array =
        tx.feeAsset != ""
            ? new Uint8Array([1, ...wasm.base58ToArray(tx.feeAsset)])
            : new Uint8Array([0])

    return new Uint8Array([
        ...[tx.type],
        ...wasm.base58ToArray(tx.senderPublicKey),
        ...tokenId,
        ...tokenFee,
        ...wasm.serializeUInteger(BigInt(tx.timestamp)),
        ...wasm.serializeUInteger(BigInt(tx.amount)),
        ...wasm.serializeUInteger(BigInt(tx.fee)),
        ...wasm.base58ToArray(tx.recipient)
    ])
}
