import { transferTokenFactory } from "../../../../src/client/transactions/transfer/service.transfer"
import { TransactionsTypes } from "../../../../src/client/transactions/transactions.types"
import { accountFactory } from "../../../../src/client/wallet/service.account"
import validator from "../../../../src/client/transactions/transfer/validator"
import { WalletTypes } from "../../../../src/client/wallet/wallet.types"
import * as wasm from "lunesrs"

describe("Transfer Token Suite", () => {
    const senderAccount = accountFactory({
        privateKey: "8YMbX5BCQdazwgdVfeUpKuoUJrmYpMyGVAGAsNaHVj1u",
        chain: WalletTypes.Chain.Mainnet
    })

    const recipientAccount = accountFactory({
        privateKey: "G6E2xNBWtsRG8XBDmeTQQxZNHHUa6K9dnc9KrYtKyGwM",
        chain: WalletTypes.Chain.Mainnet
    })

    const rawTx = {
        type: TransactionsTypes.TransferToken.int,
        sender: senderAccount.address,
        senderPublicKey: senderAccount.publicKey,
        recipient: recipientAccount.address,
        amount: 100000000000,
        timestamp: 1648349834003,
        fee: TransactionsTypes.TransferToken.fee,
        signature: "",
        assetId: "",
        feeAsset: ""
    }

    const message = validator.serialize(
        rawTx.senderPublicKey,
        rawTx.assetId,
        rawTx.feeAsset,
        rawTx.timestamp,
        rawTx.amount,
        rawTx.fee,
        rawTx.recipient
    )

    const tx = transferTokenFactory(
        senderAccount.publicKey,
        recipientAccount.address,
        100000000000,
        undefined,
        undefined,
        1648349834003
    )

    it("Create a Transfer Transaction", () => {
        expect(tx.transaction().recipient).toEqual(recipientAccount.address)
        expect(tx.transaction().sender).toEqual(senderAccount.address)
        expect(tx.transaction().amount).toEqual(100000000000)
        expect(tx.transaction().type).toEqual(4)
    })

    it("Serialize Transfer Transaction ", () => {
        expect(wasm.arrayToBase58(Uint8Array.from(message))).toEqual(
            "2J2EfWqeqbH17PC5yfioAeQ5h27J76uduH5nafAUuJhKb8gHCSqpDFV4oGgWPwQkBgg9tfQjatWZu8eiYYe6NF67Sd5Hf7ieAsaZT5hZow9xgjefbfs5"
        )
        expect(message).toEqual(
            new Uint8Array([
                4, 28, 26, 172, 20, 253, 115, 23, 6, 248, 59, 119, 129, 151,
                144, 5, 252, 208, 116, 12, 81, 146, 227, 208, 88, 57, 27, 134,
                143, 7, 76, 94, 8, 0, 0, 0, 0, 1, 127, 201, 78, 107, 19, 0, 0,
                0, 23, 72, 118, 232, 0, 0, 0, 0, 0, 0, 15, 66, 64, 1, 49, 146,
                80, 170, 11, 139, 27, 185, 41, 131, 242, 219, 45, 180, 199, 38,
                41, 173, 240, 198, 30, 146, 73, 23, 128
            ])
        )
        expect(rawTx).toStrictEqual({
            senderPublicKey: "2ti1GM7F7J78J347fqSWSVocueDV3RSCFkLSKqmhk35Z",
            recipient: "37xRcbn1LiT1Az4REoLhjpca93jPG1gTEwq",
            sender: "37tQRv7x2RHd32Ss2i1EFTWSTSsqkwXcaBe",
            timestamp: 1648349834003,
            amount: 100000000000,
            signature: "",
            fee: 1000000,
            feeAsset: "",
            assetId: "",
            type: 4
        })
    })

    it("Signed a Transfer Transaction", () => {
        expect(tx.transaction()).toEqual(rawTx)
        const sign = tx.sign(senderAccount.privateKey).signature
        expect(tx.transaction().signature).not.toBe("")

        const result = wasm.validateSignature(
            wasm.base58ToArray(senderAccount.publicKey),
            new Uint8Array(message),
            wasm.base58ToArray(sign)
        )
        expect(result).toBe(true)
    })
})
