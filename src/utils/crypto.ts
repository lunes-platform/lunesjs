import { IAccount, WalletTypes } from "../client/wallet/wallet.types"
import walletConstants from "../client/wallet/constants"
import * as wasm from "lunesrs"

const cryptoUtils = {
    fromExistingSeed: (
        seed: string,
        nonce: number,
        chain: WalletTypes.Chain
    ): IAccount => {
        const hidden_seed = wasm.hiddenSeed(nonce, seed)
        const privateKey = wasm.toPrivateKeyHex(wasm.fromStrHex(hidden_seed))
        const publicKey = wasm.toPublicKeyHex(wasm.fromStrHex(privateKey))
        const address = wasm.toAddressHex(1, chain, wasm.fromStrHex(publicKey))

        return {
            nonce: nonce,
            chain: chain,
            seed: seed,
            privateKey: wasm.hexToB58(privateKey),
            publicKey: wasm.hexToB58(publicKey),
            address: wasm.hexToB58(address)
        }
    },
    fromPrivateKey: (
        privateKey: string,
        chain: WalletTypes.Chain
    ): IAccount => {
        const publicKey = wasm.toPublicKeyHex(wasm.b58ToVec(privateKey))
        const address = wasm.toAddressHex(1, chain, wasm.fromStrHex(publicKey))

        return {
            seed: "",
            nonce: 0,
            chain: chain,
            privateKey: privateKey,
            publicKey: wasm.hexToB58(publicKey),
            address: wasm.hexToB58(address)
        }
    },
    fromPublicKey: (publicKey: string, chain: WalletTypes.Chain): IAccount => {
        const address = wasm.toAddressHex(1, chain, wasm.b58ToVec(publicKey))

        return {
            seed: "",
            nonce: 0,
            privateKey: "",
            chain: chain,
            publicKey: publicKey,
            address: wasm.hexToB58(address)
        }
    },
    fromAddress: (address: string, chain: WalletTypes.Chain): IAccount => {
        return {
            seed: "",
            nonce: 0,
            privateKey: "",
            publicKey: "",
            chain: chain,
            address: address
        }
    },
    fromNewSeed: (
        nWords: number,
        nonce: number,
        chain: WalletTypes.Chain
    ): IAccount => {
        let seed = []
        nWords = nWords != undefined ? Math.round(nWords / 3) : 4
        for (let i = 0; i < nWords; i++) {
            for (let n in wasm.randomTripleNumber()) {
                seed.push(walletConstants.wordsList[n])
            }
        }
        return cryptoUtils.fromExistingSeed(seed.join(" "), nonce, chain)
    },
    validateAddress: (address: string, chain: WalletTypes.Chain): boolean => {
        return wasm.validateAddress(chain, wasm.b58ToVec(address))
    },
    validateSignature: (
        publicKey: string,
        message: string,
        signature: string
    ): boolean => {
        return wasm.validateSignature(
            wasm.toVecu32(wasm.b58ToVec(publicKey)),
            wasm.toVecu32(wasm.b58ToVec(message)),
            wasm.toVecu32(wasm.b58ToVec(signature))
        )
    },
    fastSignature: (privateKey: string, message: string) => {
        return wasm.hexToB58(
            wasm.vecu32ToHex(
                wasm.fastSignature(
                    wasm.toVecu32(wasm.b58ToVec(privateKey)),
                    wasm.toVecu32(wasm.b58ToVec(message))
                )
            )
        )
    },
    fullSignature: (privateKey: string, message: string) => {
        return wasm.hexToB58(
            wasm.vecu32ToHex(
                wasm.fullSignature(
                    wasm.toVecu32(wasm.b58ToVec(privateKey)),
                    wasm.toVecu32(wasm.b58ToVec(message))
                )
            )
        )
    }
}

export default cryptoUtils
