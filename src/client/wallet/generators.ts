import { IAccount, WalletTypes } from "./wallet.types";
import validate from "./validators"
import walletConstants from "./constants";
import convert from "../../util/crypto/convert";
import crypto from "crypto"


const generate = {
    newSeed: (nWords: number): WalletTypes.Seed => {
        const f = () => {
            const wordCount = walletConstants.wordsList.length
            const random4bytes = convert.bytesToString(
                convert.urandom4()
            )
            const x = random4bytes[3] + (random4bytes[2] << 8) + (random4bytes[1] << 16) + (random4bytes[0] << 24)
            const w1 = x % wordCount
            const w2 = ((Math.round(x / wordCount) >> 0) + w1) % wordCount
            const w3 = ((Math.round((Math.round(x / wordCount) >> 0) / wordCount) >> 0) + w2) % wordCount
            return [w1, w2, w3]
        }
        const nWordsMultipleOf3 = Math.round(nWords / 3)

        return [
            ...Array(nWordsMultipleOf3).keys()
        ].flatMap(f).map(
            index => walletConstants.wordsList[index]
        ).join(" ")
    },
    seed: (
        seed: WalletTypes.Seed,
        nonce: WalletTypes.Nonce,
        chain: WalletTypes.Chain,
        chainId: WalletTypes.ChainId): IAccount => {

        crypto.


            return {
            seed: seed,
                hashSeed: convert.base58.to(seed),
                    chain: typeof chain === "undefined" ? "mainnet" : "testnet",
                        privateKey: "seck",
                            publicKey: "pubk",
                                address: "addr",
                                    chainId: chainId,
                                        nWords: seed?.split(" ").length,
                                            nonce: nonce,
        }
    },
    privateKey: (
        privateKey: WalletTypes.PrivateKey,
        chain: WalletTypes.Chain,
        chainId: WalletTypes.ChainId): IAccount => {
        return {
            seed: "",
            hashSeed: "",
            chain: chain,
            privateKey: privateKey,
            publicKey: "pubk",
            address: "addr",
            chainId: chainId,
            nWords: 0,
            nonce: 0,
        }
    },
    publicKey: (
        publicKey: WalletTypes.PublicKey,
        chain: WalletTypes.Chain,
        chainId: WalletTypes.ChainId): IAccount => {
        return {
            seed: "",
            hashSeed: "",
            chain: chain,
            privateKey: "",
            publicKey: publicKey,
            address: "addr",
            chainId: chainId,
            nWords: 0,
            nonce: 0,
        }
    },
    address: (
        address: WalletTypes.Address,
        chain: WalletTypes.Chain,
        chainId: WalletTypes.ChainId): IAccount => {
        return {
            seed: "",
            hashSeed: "",
            chain: chain,
            privateKey: "",
            publicKey: "",
            address: address,
            chainId: chainId,
            nWords: 0,
            nonce: 0,
        }
    },
    wallet: (account: IAccount): IAccount => {
        const chainId = validate.chain(account.chain)
        const nWords = validate.words(account.nWords)
        const _nonce = validate.nonce(account.nonce)

        if (typeof account.seed === "string") {
            return generate.seed(
                account.seed, _nonce, account.chain, chainId
            )
        } else if (typeof account.privateKey === "string") {
            return generate.privateKey(
                account.privateKey, account.chain, chainId
            )
        } else if (typeof account.publicKey === "string") {
            return generate.publicKey(
                account.publicKey, account.chain, chainId
            )
        } else if (typeof account.address === "string") {
            return generate.address(
                account.address, account.chain, chainId
            )
        } else {
            return generate.seed(
                generate.newSeed(nWords), _nonce, account.chain, chainId
            )
        }
    }
}

export default generate