import { Account } from "../../../src/client/wallet/service.account"
import { WalletTypes } from "../../../src/client/wallet/wallet.types"
import cryptoUtils from "../../../src/utils/crypto"


describe("Create Account from New Seed", () => {
    const createMainnetAccountFromNewSeed = () => {
        return new Account({
            chain: WalletTypes.Chain.Mainnet
        })
    }

    const createTestnetAccountFromNewSeed = () => {
        return new Account({
            chain: WalletTypes.Chain.Testnet
        })
    }

    it("Test type of Mainnet Account from New Seed", () => {
       expect(createMainnetAccountFromNewSeed()).toBeInstanceOf(Account)
    })

    it("Test type of Testnet Account from New Seed", () => {
       expect(createTestnetAccountFromNewSeed()).toBeInstanceOf(Account)
    })

    it("Test Address of Mainnet Account from New Seed", () => {
        expect(
            cryptoUtils.validateAddress(
                createMainnetAccountFromNewSeed().address, WalletTypes.Chain.Mainnet
            )
        ).toEqual(true)
     })
    it("Test Address of Testnet Account from New Seed", () => {
        expect(
            cryptoUtils.validateAddress(
                createTestnetAccountFromNewSeed().address, WalletTypes.Chain.Testnet
            )
        ).toEqual(true)
     })
})


describe("Create Account from Seed", () => {
    const seed = "scrub guard swim catch range upon dawn ensure segment alpha sentence spend effort bar benefit"

    const createMainnetAccountFromSeed = (seed: string, nonce?: number) => {
        return new Account({
            seed: seed,
            nonce: nonce != undefined ? nonce : 0,
            chain: WalletTypes.Chain.Mainnet
        })
    }

    const createTestnetAccountFromSeed = (seed: string, nonce?: number) => {
        return new Account({
            seed: seed,
            nonce: nonce != undefined ? nonce : 0,
            chain: WalletTypes.Chain.Testnet
        })
    }

    it("Test Create Mainnet Account from seed", () => {
        const addr = "37o7aY3eZZTXmzrDa5e4Wj3Z4ZZuyV42Aaj"
        expect(createMainnetAccountFromSeed(seed, 0).address)
        .toEqual(addr)
    })

    it("Test Create Testnet Account from seed", () => {
        const addr = "37PmyYwMGrH4uBR5V4DjCEvHGw4f2pdXW5u"
        expect(createTestnetAccountFromSeed(seed).address)
        .toEqual(addr)
    })

    const mainnetNonce12345Address: [number, string][] = [
        [0, "37o7aY3eZZTXmzrDa5e4Wj3Z4ZZuyV42Aaj"],
        [1, "37tD32367v1fiWgW8waw3QTdYTKKGrCV3zw"],
        [2, "37qYK5eRJEr8a38hUXmxYv9aoQ8NpXH7Aqd"],
        [3, "37w8stLd9JQwUKBrBUQr1VryJuhS3RWqEen"],
        [4, "37vVbQVXEE4Lvs7X4wimsoxAvqBmoyHsWDJ"],
    ]
    test.each(mainnetNonce12345Address)
    ("Test Create Mainnet Account with range of nonces", (nonce, address) =>{
        expect(
            createMainnetAccountFromSeed(seed, nonce).address
        ).toEqual(address)
    })

    const testnetNonce12345Address: [number, string][] =  [
        [0, "37PmyYwMGrH4uBR5V4DjCEvHGw4f2pdXW5u"],
        [1, "37UsS2vnqCqCqhFN3vAbivLMkpp4L8GMCyP"],
        [2, "37SCi6Y81XffhDhZPWMdES2K1md7skK1mFu"],
        [3, "37XoGuEKrbEUbVki6SzWh1jhXHCB6jnKFxS"],
        [4, "37X9zRPDwWst43gNyvJSZKpu9CgWsHt1U8i"],
    ]

    test.each(testnetNonce12345Address)
    ("Test Create Testnet Account with range of nonces", (nonce, address) =>{
        expect(
            createTestnetAccountFromSeed(seed, nonce).address
        ).toEqual(address)
    })
})


describe("Create Account from Private Key", () => {
    const privateKey = "BnafXBSq1VDUdZ1nSjJoxhnQdBv2hk3o6dbV49TD1bzo"

    const createMainnetAccountFromPrivateKey = (privateKey: string) => {
        return new Account({
            privateKey: privateKey,
            chain: WalletTypes.Chain.Mainnet
        })
    }

    const createTestnetAccountFromPrivateKey = (privateKey: string) => {
        return new Account({
            privateKey: privateKey,
            chain: WalletTypes.Chain.Mainnet
        })
    }

    it("Test Create Mainnet Account from Private Key", () => {
        expect(
            createMainnetAccountFromPrivateKey(privateKey).address
        ).toEqual("37o7aY3eZZTXmzrDa5e4Wj3Z4ZZuyV42Aaj")
    })

    it("Test Create Testnet Account from Private Key", () => {
        expect(
            createTestnetAccountFromPrivateKey(privateKey).address
        ).toEqual("37PmyYwMGrH4uBR5V4DjCEvHGw4f2pdXW5u")
    })
})


describe("Create Account from Public Key", () => {
    const publicKey = "2uuQVr3B5aGgvSJ5BMCw4Cd19tdYdnMGoYnji99aPde4"

    const createMainnetAccountFromPublicKey = (publicKey: string) => {
        return new Account({
            publicKey: publicKey,
            chain: WalletTypes.Chain.Mainnet
        })
    }

    const createTestnetAccountFromPublicKey = (publicKey: string) => {
        return new Account({
            publicKey: publicKey,
            chain: WalletTypes.Chain.Testnet
        })
    }

    it("Test Create Mainnet Account From Public Key", () => {
        expect(
            createMainnetAccountFromPublicKey(publicKey).address
        ).toEqual("37o7aY3eZZTXmzrDa5e4Wj3Z4ZZuyV42Aaj")
    })

    it("Test Create Testnet Account From Public Key", () => {
        expect(
            createTestnetAccountFromPublicKey(publicKey).address
        ).toEqual("37PmyYwMGrH4uBR5V4DjCEvHGw4f2pdXW5u")
    })
})


describe("Create Account from Address", () => {
    const createMainnetAccountFromAdress = () => {
        return new Account({
            address: "37o7aY3eZZTXmzrDa5e4Wj3Z4ZZuyV42Aaj",
            chain: WalletTypes.Chain.Mainnet
        })
    }

    const createTestnetAccountFromAdress = () => {
        return new Account({
            address: "37PmyYwMGrH4uBR5V4DjCEvHGw4f2pdXW5u",
            chain: WalletTypes.Chain.Mainnet
        })
    }

    it("Test Create Mainnet Account from Address", () => {
        expect(
            createMainnetAccountFromAdress().address
        ).toEqual("37o7aY3eZZTXmzrDa5e4Wj3Z4ZZuyV42Aaj")
    })

    it("Test Create Testnet Account from Address", () => {
        expect(
            createTestnetAccountFromAdress().address
        ).toEqual("37PmyYwMGrH4uBR5V4DjCEvHGw4f2pdXW5u")
    })
})
