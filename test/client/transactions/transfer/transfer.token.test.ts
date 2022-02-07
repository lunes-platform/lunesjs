import { TransferToken } from "../../../../src/client/transactions/transfer/service.transfer"
import { WalletTypes } from "../../../../src/client/wallet/wallet.types"
import { Account } from "../../../../src/client/wallet/service.account"

const sender = new Account({
    chain: WalletTypes.Chain.Testnet,
    privateKey: "8YMbX5BCQdazwgdVfeUpKuoUJrmYpMyGVAGAsNaHVj1u",
})

describe("Should return a bool, for validate passed data", () => {
    it("Should receive transfer data and return true", () => {
        expect(
            new TransferToken({
                sender: sender.publicKey,
                chain: WalletTypes.Chain.Testnet,
                amount: 10000,
                receiver: "37PmyYwMGrH4uBR5V4DjCEvHGw4f2pdXW5u",
            }).ready
        ).toEqual(true)
    })

    it("Should receive transfer data and return false", () => {
        expect(
            new TransferToken({
                sender: sender.publicKey,
                chain: WalletTypes.Chain.Testnet,
                amount: 0,
                receiver: "37PmyYwMGrH4uBR5V4DjCEvHGw4f2pdXW5u",
            }).ready
        ).toEqual(false)
    })
})

describe("Test transaction", () => {
    it("Should return obj with data of transactions type 4", () => {
        expect({
            sender: sender.publicKey,
            receiver: "37PmyYwMGrH4uBR5V4DjCEvHGw4f2pdXW5u",
            amount: 1000,
            chain: WalletTypes.Chain.Mainnet,
            fee: 100000,
        }).toEqual({
            type: 4,
            senderPublicKey: "2uuQVr3B5aGgvSJ5BMCw4Cd19tdYdnMGoYnji99aPde4",
            recipient: "37PmyYwMGrH4uBR5V4DjCEvHGw4f2pdXW5u",
            feeAsset: "",
            assetId: "",
            amount: 1000,
            sender: "",
            fee: 100000,
        })
    })
})

describe("Test sign method", () => {
    it("Should sign and return a transfer transaction", () => {
        expect(
            new TransferToken({
                sender: sender.publicKey,
                chain: WalletTypes.Chain.Testnet,
                amount: 10000,
                receiver: "37PmyYwMGrH4uBR5V4DjCEvHGw4f2pdXW5u",
                fee: 100000,
                assetId: "",
            }).sign(sender.privateKey)
        ).toEqual({
            type: 4,
            senderPublicKey: sender.publicKey,
            timestamp: "",
            recipient: "37PmyYwMGrH4uBR5V4DjCEvHGw4f2pdXW5u",
            feeAsset: "",
            assetId: "",
            amount: "",
            sender: "",
            fee: 100000,
            signature: "",
        })
    })
})

describe("Test send method", () => {
    it("Should send a transaction signed for a lunes node", () => {
        expect({}).toEqual({
            sended: true,
            response: {},
        })
    })
})
