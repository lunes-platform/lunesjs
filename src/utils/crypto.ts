import { IAccount, WalletTypes } from "../client/wallet/wallet.types"
import walletConstants from "../client/wallet/constants"
import * as wasm from "lunesrs"

const cryptoUtils = {
    fromExistingSeed: (
        seed: string,
        nonce: number,
        chain: WalletTypes.Chain
    ): IAccount => {
        const hidden_seed = wasm.hidden_seed(nonce, seed)
        const privateKey = wasm.to_private_key_hex(
            wasm.from_str_hex(hidden_seed)
        )
        const publicKey = wasm.to_public_key_hex(wasm.from_str_hex(privateKey))
        const address = wasm.to_address_hex(
            1,
            chain,
            wasm.from_str_hex(publicKey)
        )

        return {
            nonce: nonce,
            chain: chain,
            seed: seed,
            privateKey: wasm.hex_to_b58(privateKey),
            publicKey: wasm.hex_to_b58(publicKey),
            address: wasm.hex_to_b58(address)
        }
    },
    fromPrivateKey: (
        privateKey: string,
        chain: WalletTypes.Chain
    ): IAccount => {
        const publicKey = wasm.to_public_key_hex(wasm.b58_to_vec(privateKey))
        const address = wasm.to_address_hex(
            1,
            chain,
            wasm.from_str_hex(publicKey)
        )

        return {
            chain: chain,
            privateKey: privateKey,
            publicKey: wasm.hex_to_b58(publicKey),
            address: wasm.hex_to_b58(address)
        }
    },
    fromPublicKey: (publicKey: string, chain: WalletTypes.Chain): IAccount => {
        const address = wasm.to_address_hex(
            1,
            chain,
            wasm.b58_to_vec(publicKey)
        )

        return {
            chain: chain,
            publicKey: publicKey,
            address: wasm.hex_to_b58(address)
        }
    },
    fromAddress: (address: string, chain: WalletTypes.Chain): IAccount => {
        return {
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
            for (let n in wasm.random_triple_number()) {
                seed.push(walletConstants.wordsList[n])
            }
        }
        return cryptoUtils.fromExistingSeed(seed.join(" "), nonce, chain)
    },
    validateAddress: (address?: string, chain?: WalletTypes.Chain) => {
        return true
    },
    validateSignature: (signer: string, message: string, signature: string) => {
        return true
    }
}

export default cryptoUtils
