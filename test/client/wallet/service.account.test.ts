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


describe("Create Account From Seed", () => {
    const mainnetAccountFromSeed = (nonce?: number) => {
        const seed = "scrub guard swim catch range upon dawn ensure segment alpha sentence spend effort bar benefit"
        return new Account({
            seed: seed,
            nonce: nonce != undefined ? nonce : 0,
            chain: WalletTypes.Chain.Mainnet
        })
    }

    const testnetAccountFromSeed = (nonce?: number) => {
        const seed = "scrub guard swim catch range upon dawn ensure segment alpha sentence spend effort bar benefit"
        return new Account({
            seed: seed,
            nonce: nonce != undefined ? nonce : 0,
            chain: WalletTypes.Chain.Testnet
        })
    }

    it("Create Mainnet Account from seed", () => {
        const addr = "37o7aY3eZZTXmzrDa5e4Wj3Z4ZZuyV42Aaj"
        expect(mainnetAccountFromSeed().address)
        .toEqual(addr)
    })

    it("Create Testnet Account from seed", () => {
        const addr = "37PmyYwMGrH4uBR5V4DjCEvHGw4f2pdXW5u"
        expect(mainnetAccountFromSeed().address)
        .toEqual(addr)
    })

    const mainnetNonce12345Address: [number, string][] = [
        [0, "37o7aY3eZZTXmzrDa5e4Wj3Z4ZZuyV42Aaj"],
        [1, "37tD32367v1fiWgW8waw3QTdYTKKGrCV3zw"],
        [2, "37qYK5eRJEr8a38hUXmxYv9aoQ8NpXH7Aqd"],
        [3, "37w8stLd9JQwUKBrBUQr1VryJuhS3RWqEen"],
        [4, "37vVbQVXEE4Lvs7X4wimsoxAvqBmoyHsWDJ"],
    ]
    test.each(mainnetNonce12345Address)("Create Mainnet Account with range of nonces", (nonce, address) =>{
        expect(
            mainnetAccountFromSeed(nonce).address
        ).toEqual(address)
    })

    const testnetNonce12345Address: [number, string][] =  [
        [0, "37PmyYwMGrH4uBR5V4DjCEvHGw4f2pdXW5u"],
        [1, "37UsS2vnqCqCqhFN3vAbivLMkpp4L8GMCyP"],
        [2, "37SCi6Y81XffhDhZPWMdES2K1md7skK1mFu"],
        [3, "37XoGuEKrbEUbVki6SzWh1jhXHCB6jnKFxS"],
        [4, "37X9zRPDwWst43gNyvJSZKpu9CgWsHt1U8i"],
    ]

    test.each(testnetNonce12345Address)("Create Testnet Account with range of nonces", (nonce, address) =>{
        expect(
            testnetAccountFromSeed(nonce).address
        ).toEqual(address)
    })
})

