import * as wasm from "lunesrs"

export default function signer<T>(
    senderPrivateKey: string,
    serializer: (tx: T) => Uint8Array,
    tx: T
): [string, string] {
    const message = wasm.arrayToBase58(serializer(tx))
    return [
        wasm.arrayToBase58(
            wasm.fastSignature(
                wasm.base58ToArray(senderPrivateKey),
                wasm.base58ToArray(message)
            )
        ),
        message
    ]
}
