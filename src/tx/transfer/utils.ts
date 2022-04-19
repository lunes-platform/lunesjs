import { TransferToken } from "./transfer.service"
import * as wasm from "lunesrs"
import axios from "axios"

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

export function signTransfer(
    senderPrivateKey: string,
    tx: TransferToken
): string {
    tx.message = wasm.arrayToBase58(serializeTransfer(tx))

    return wasm.arrayToBase58(
        wasm.fastSignature(
            wasm.base58ToArray(senderPrivateKey),
            wasm.base58ToArray(tx.message)
        )
    )
}

export async function broadcastTransfer(
    node: string,
    tx: TransferToken
): Promise<TransferSuccess | TransferFail> {
    return new Promise(async (resolve) => {
        axios
            .post(`${node}/transactions/broadcast`, tx.transaction())
            .then((res) => {
                const x: TransferSuccess = {
                    isSuccess: true,
                    response: {
                        senderPublicKey: res.data.senderPublicKey,
                        timestamp: res.data.timestamp,
                        signature: res.data.signature,
                        recipient: res.data.recipient,
                        feeAsset: res.data.feeAsset,
                        assetId: res.data.assetId,
                        sender: res.data.sender,
                        amount: res.data.amount,
                        type: res.data.type,
                        fee: res.data.fee,
                        id: res.data.id
                    }
                }
                resolve(x)
            })
            .catch((erro) => {
                resolve({
                    isSuccess: false,
                    response: {
                        codeError: erro.response.data.error,
                        message: erro.response.data.message
                    }
                })
            })
    })
}

type TransferSuccess = {
    isSuccess: boolean
    response: {
        senderPublicKey: string
        timestamp: number
        signature: string
        recipient: string
        feeAsset: string
        assetId: string
        sender: string
        amount: number
        type: number
        fee: number
        id: string
    }
}

type TransferFail = {
    isSuccess: boolean
    response: {
        codeError: number
        message: string
    }
}
