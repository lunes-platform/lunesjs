import { Account } from "../../../src/client/wallet/account"
import { WalletTypes } from "../../../src/client/wallet/wallet.types"

describe("Create new account with seed", () => {
    it(`Create Account from New Seed`, () => {
        expect(new Account({
            chain: WalletTypes.Chain.Mainnet
        })
        ).toEqual({
            chain: "1",
            nonce: 0,
            seed: "",
            privateKey: "",
            publicKey: "",
            address: ""
        })
    })
    it(`Create Account from Already Existing Seed`, () => {
        const alreadyExistentSeed = "already existing Seed"
        expect(new Account({
            seed: alreadyExistentSeed,
            chain: WalletTypes.Chain.Mainnet
        })
        ).toEqual({
            chain: "1",
            nonce: 0,
            seed: alreadyExistentSeed,
            privateKey: "",
            publicKey: "",
            address: ""
        })
    })
    it(`Create Account from Already Existing Private Key`, () => {

        const alreadyExistentPrivateKey = "already existing Private Key"
        expect(new Account({
            privateKey: alreadyExistentPrivateKey,
            chain: WalletTypes.Chain.Mainnet
        })
        ).toEqual({
            chain: "1",
            nonce: 0,
            seed: "",
            privateKey: alreadyExistentPrivateKey,
            publicKey: "",
            address: ""
        })
    })
    it(`Create Account from Already Existing Public Key`, () => {

        const alreadyExistentPublicKey = "already existing Public Key"
        expect(new Account({
            publicKey: alreadyExistentPublicKey,
            chain: WalletTypes.Chain.Mainnet
        })
        ).toEqual({
            chain: "1",
            nonce: 0,
            seed: "",
            privateKey: "",
            publicKey: alreadyExistentPublicKey,
            address: ""
        })
    })
    it(`Create Account from Already Existing Address`, () => {

        const alreadyExistentAddress = "already existing Address"
        expect(new Account({
            address: alreadyExistentAddress,
            chain: WalletTypes.Chain.Mainnet
        })
        ).toEqual({
            chain: "1",
            nonce: 0,
            seed: "",
            privateKey: "",
            publicKey: "",
            address: alreadyExistentAddress
        })
    })
})
