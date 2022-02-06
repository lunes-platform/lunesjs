import { Account } from "../../../src/client/wallet/service.account"
import { WalletTypes } from "../../../src/client/wallet/wallet.types"
import lunesCrypto from "../../../src/utils/crypto"


describe("Create Account From New Seed", () => {
    const mainnetAccountFromNewSeed = () => {
        return new Account({
            chain: WalletTypes.Chain.Mainnet
        })
    }

    const testnetAccountFromNewSeed = () => {
        return new Account({
            chain: WalletTypes.Chain.Testnet
        })
    }

    it("Test type of Mainnet Account from New Seed", () => {
       expect(mainnetAccountFromNewSeed()).toBeInstanceOf(Account)
    })

    it("Test type of Testnet Account from New Seed", () => {
       expect(testnetAccountFromNewSeed()).toBeInstanceOf(Account)
    })

    it("Test Address of Mainnet Account from New Seed", () => {
        expect(
            lunesCrypto.validateAddress(
                mainnetAccountFromNewSeed().address, WalletTypes.Chain.Mainnet
            )
        ).toEqual(true)
     })
    it("Test Address of Testnet Account from New Seed", () => {
        expect(
            lunesCrypto.validateAddress(
                testnetAccountFromNewSeed().address, WalletTypes.Chain.Testnet
            )
        ).toEqual(true)
     })
})