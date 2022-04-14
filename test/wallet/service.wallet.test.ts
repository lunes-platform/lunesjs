import lunesjs from "../../src/index"
import * as wasm from "lunesrs"

describe("Create Wallet from New Seed", () => {
    const newWallet = (n?: number) => {
        return lunesjs.walletFactory({
            seedLen: n != undefined ? n : 12
        })
    }

    test.each([
        { response: 458, result: 459 },
        { response: 802, result: 801 },
        { response: 97, result: 96 },
        { response: 31, result: 30 },
        { response: 12, result: 12 },
        { response: 21, result: 21 },
        { response: 15, result: 15 }
    ])(
        "The seed should be list of worlds multiple of 3",
        ({ response, result }) => {
            const len = newWallet(response).seed.split(" ").length
            expect(len).toEqual(result)
        }
    )
    test.each([
        { w1: newWallet(), w2: newWallet() },
        { w1: newWallet(), w2: newWallet() },
        { w1: newWallet(), w2: newWallet() },
        { w1: newWallet(), w2: newWallet() },
        { w1: newWallet(), w2: newWallet() },
        { w1: newWallet(), w2: newWallet() },
        { w1: newWallet(), w2: newWallet() },
        { w1: newWallet(), w2: newWallet() },
        { w1: newWallet(), w2: newWallet() },
        { w1: newWallet(), w2: newWallet() },
        { w1: newWallet(), w2: newWallet() }
    ])("The seed should be list of worlds multiple of 3", ({ w1, w2 }) => {
        expect(w1.privateKey).not.toEqual(w2.privateKey)
        expect(w1.publicKey).not.toEqual(w2.publicKey)
        expect(w1.address).not.toEqual(w2.address)
        expect(w1.seed).not.toEqual(w2.seed)
        expect(w1.chain).toEqual(w2.chain)
        expect(w1.nonce).toEqual(w2.nonce)
    })
})

describe("Create Wallet from Seed", () => {
    const seed =
        "scrub guard swim catch range upon dawn ensure segment alpha sentence spend effort bar benefit"

    const WalletMainnet = (seed: string, nonce?: number) => {
        return lunesjs.walletFactory({
            seed: seed,
            nonce: nonce != undefined ? nonce : 0,
            chain: 1
        })
    }

    const WalletTestnet = (seed: string, nonce?: number) => {
        return lunesjs.walletFactory({
            seed: seed,
            nonce: nonce != undefined ? nonce : 0,
            chain: 0
        })
    }

    it("Test Create Mainnet Wallet from seed", () => {
        const prvk = "BnafXBSq1VDUdZ1nSjJoxhnQdBv2hk3o6dbV49TD1bzo"
        const pubk = "2uuQVr3B5aGgvSJ5BMCw4Cd19tdYdnMGoYnji99aPde4"
        const addr = "37o7aY3eZZTXmzrDa5e4Wj3Z4ZZuyV42Aaj"
        const w = WalletMainnet(seed)
        expect(w.privateKey).toEqual(prvk)
        expect(w.publicKey).toEqual(pubk)
        expect(w.address).toEqual(addr)
    })

    it("Test Create Testnet Wallet from seed", () => {
        const prvk = "BnafXBSq1VDUdZ1nSjJoxhnQdBv2hk3o6dbV49TD1bzo"
        const pubk = "2uuQVr3B5aGgvSJ5BMCw4Cd19tdYdnMGoYnji99aPde4"
        const addr = "37PmyYwMGrH4uBR5V4DjCEvHGw4f2pdXW5u"
        const w = WalletTestnet(seed)
        expect(w.privateKey).toEqual(prvk)
        expect(w.publicKey).toEqual(pubk)
        expect(w.address).toEqual(addr)
    })

    const Nonce0To4: [number, string][] = [
        [0, "37o7aY3eZZTXmzrDa5e4Wj3Z4ZZuyV42Aaj"],
        [1, "37tD32367v1fiWgW8waw3QTdYTKKGrCV3zw"],
        [2, "37qYK5eRJEr8a38hUXmxYv9aoQ8NpXH7Aqd"],
        [3, "37w8stLd9JQwUKBrBUQr1VryJuhS3RWqEen"],
        [4, "37vVbQVXEE4Lvs7X4wimsoxAvqBmoyHsWDJ"]
    ]
    test.each(Nonce0To4)(
        "Test Create Mainnet Wallet with range of nonces",
        (nonce, address) => {
            expect(WalletMainnet(seed, nonce).address).toEqual(address)
        }
    )

    const Nonce0To1: [number, string][] = [
        [0, "37PmyYwMGrH4uBR5V4DjCEvHGw4f2pdXW5u"],
        [1, "37UsS2vnqCqCqhFN3vAbivLMkpp4L8GMCyP"],
        [2, "37SCi6Y81XffhDhZPWMdES2K1md7skK1mFu"],
        [3, "37XoGuEKrbEUbVki6SzWh1jhXHCB6jnKFxS"],
        [4, "37X9zRPDwWst43gNyvJSZKpu9CgWsHt1U8i"]
    ]
    test.each(Nonce0To1)(
        "Test Create Testnet Wallet with range of nonces",
        (nonce, address) => {
            expect(WalletTestnet(seed, nonce).address).toEqual(address)
        }
    )
})

describe("Create Wallet from Private Key", () => {
    const privateKey = "BnafXBSq1VDUdZ1nSjJoxhnQdBv2hk3o6dbV49TD1bzo"
    const publicKey = "2uuQVr3B5aGgvSJ5BMCw4Cd19tdYdnMGoYnji99aPde4"

    const WalletMainnet = (privateKey: string) => {
        return lunesjs.walletFactory({
            privateKey: privateKey,
            chain: 1
        })
    }

    const WalletTestnet = (privateKey: string) => {
        return lunesjs.walletFactory({
            privateKey: privateKey,
            chain: 0
        })
    }

    it("Test Create Mainnet Wallet from Private Key", () => {
        const w = WalletMainnet(privateKey)
        const addr = "37o7aY3eZZTXmzrDa5e4Wj3Z4ZZuyV42Aaj"
        expect(w.privateKey).toEqual(privateKey)
        expect(w.publicKey).toEqual(publicKey)
        expect(w.address).toEqual(addr)
    })

    it("Test Create Testnet Wallet from Private Key", () => {
        const w = WalletTestnet(privateKey)
        const addr = "37PmyYwMGrH4uBR5V4DjCEvHGw4f2pdXW5u"
        expect(w.privateKey).toEqual(privateKey)
        expect(w.publicKey).toEqual(publicKey)
        expect(w.address).toEqual(addr)
    })
})

describe("Validate Wallet Address", () => {
    const WalletMainnet = () => {
        return lunesjs.walletFactory({
            chain: 1
        }).address
    }

    const WalletTestnet = () => {
        return lunesjs.walletFactory({
            chain: 0
        }).address
    }

    const addressMainnet = Array.from(new Array(20), () => WalletMainnet())

    const addressTestnet = Array.from(new Array(20), () => WalletTestnet())
    test.each(addressMainnet)(
        "Test Validating Mainnet Wallet Address",
        (addressMainnet) => {
            const result = lunesjs.crypto.validateAddress(addressMainnet, 1)
            expect(result).toEqual(true)
        }
    )

    test.each(addressTestnet)(
        "Test Validating Testnet Wallet Address",
        (addressTestnet) => {
            const result = lunesjs.crypto.validateAddress(addressTestnet, 1)
            expect(result).toEqual(false)
        }
    )
})

describe("Create Signatures", () => {
    const newWalletMainnet = () => {
        return lunesjs.walletFactory({
            chain: 1
        })
    }
    const newWalletTestnet = () => {
        return lunesjs.walletFactory({
            chain: 1
        })
    }
    const message = [
        wasm.arrayToBase58(wasm.serializeString("Hello, Lunes Signature!")),
        wasm.arrayToBase58(
            wasm.serializeString(
                "This is a new test for validate Signatures in Lunes Cryptography"
            )
        ),
        wasm.arrayToBase58(
            wasm.serializeString("Let's do some more tests just in case")
        ),
        wasm.arrayToBase58(
            wasm.serializeString(
                "One more to see if everything is working well"
            )
        ),
        wasm.arrayToBase58(
            wasm.serializeString(
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
        Maecenas turpis felis, gravida eget dapibus quis, molestie at mi. \
        Phasellus quis mollis nulla. Nam euismod nec diam in viverra."
            )
        )
    ]

    test.each(message)(
        "Test sign and validate signatures for Mainnet random Wallet with FastSignature function",
        (message) => {
            const w = newWalletMainnet()
            const signature = lunesjs.crypto.fastSignature(
                w.privateKey,
                message
            )
            const result = lunesjs.crypto.validateSignature(
                w.publicKey,
                message,
                signature
            )
            expect(result).toEqual(true)
        }
    )
    test.each(message)(
        "Test sign and validate signatures for Testnet random Wallet with FastSignature function",
        (message) => {
            const w = newWalletTestnet()
            const signature = lunesjs.crypto.fastSignature(
                w.privateKey,
                message
            )
            const result = lunesjs.crypto.validateSignature(
                w.publicKey,
                message,
                signature
            )
            expect(result).toEqual(true)
        }
    )
    test.each(message)(
        "Test sign and validate signatures for Mainnet random Wallet with FullSignature function",
        (message) => {
            const w = newWalletMainnet()
            const signature = lunesjs.crypto.fullSignature(
                w.privateKey,
                message
            )
            const result = lunesjs.crypto.validateSignature(
                w.publicKey,
                message,
                signature
            )
            expect(result).toEqual(true)
        }
    )
    test.each(message)(
        "Test sign and validate signatures for Testnet random Wallet with FullSignature function",
        (message) => {
            const w = newWalletTestnet()
            const signature = lunesjs.crypto.fullSignature(
                w.privateKey,
                message
            )
            const result = lunesjs.crypto.validateSignature(
                w.publicKey,
                message,
                signature
            )
            expect(result).toEqual(true)
        }
    )
})
