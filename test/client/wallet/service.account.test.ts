import { Account } from "../../../src/client/wallet/service.account"
import { WalletTypes } from "../../../src/client/wallet/wallet.types"
import lunesCrypto from "../../../src/utils/crypto"

function newMainnetAccount() {
    return new Account({
        chain: WalletTypes.Chain.Mainnet
    })
}

function newTestnetAccount() {
    return new Account({
        chain: WalletTypes.Chain.Testnet
    })
}
describe("Create Account From New Seed", () => {
    it("Test type of Mainnet Account from New Seed", () => {
       expect(newMainnetAccount()).toBeInstanceOf(Account)
    })

    it("Test type of Testnet Account from New Seed", () => {
       expect(newTestnetAccount()).toBeInstanceOf(Account)
    })

    it("Test Address of Mainnet Account from New Seed", () => {
        expect(
            lunesCrypto.validateAddress(
                newTestnetAccount().address, WalletTypes.Chain.Mainnet
            )
        ).toEqual(true)
     })
    it("Test Address of Testnet Account from New Seed", () => {
        expect(
            lunesCrypto.validateAddress(
                newTestnetAccount().address, WalletTypes.Chain.Testnet
            )
        ).toEqual(true)
     })
})