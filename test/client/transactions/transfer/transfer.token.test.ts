import { TransferToken } from "../../../../src/client/transactions/transfer/service.transfer"
import { WalletTypes } from "../../../../src/client/wallet/wallet.types"
import { Account } from "../../../../src/client/wallet/service.account"
import { TransactionsTypes } from "../../../../src/client/transactions/transactions.types"
import cryptoUtils from "../../../../src/utils/crypto"

describe("Create Transfer Transaction", () => {
    const timestamp = () => {
        return new Date().getTime()
    }

    const sender = () => {
        return new Account({
            chain: WalletTypes.Chain.Mainnet,
            privateKey: "8YMbX5BCQdazwgdVfeUpKuoUJrmYpMyGVAGAsNaHVj1u"
        })
    }

    const renceiver = () => {
        return new Account({
            chain: WalletTypes.Chain.Mainnet,
            privateKey: "G6E2xNBWtsRG8XBDmeTQQxZNHHUa6K9dnc9KrYtKyGwM"
        })
    }

    const basicTransferToken = (sender: Account, receiver: Account) => {
        return new TransferToken({
            sender: sender.publicKey,
            chain: WalletTypes.Chain.Mainnet,
            amount: 1, // Lunes
            receiver: receiver.address
        })
    }

    const transferTransaction = (
        sender: Account,
        receiver: Account,
        timestamp: number
    ) => {
        return {
            ready: true,
            type: TransactionsTypes.TransferToken.int,
            sender: sender.address,
            senderPublicKey: sender.publicKey,
            recipient: receiver.address,
            amount: 100000000000, // Unes
            timestamp: timestamp,
            fee: TransactionsTypes.TransferToken.fee,
            assetId: "",
            feeAsset: "",
            message: "",
            signature: ""
        }
    }

    it("Test validated passed data for Transfer Token", () => {
        expect(basicTransferToken(sender(), renceiver()).ready).toEqual(true)
    })

    it("Should return TransferTransaction", () => {
        expect(basicTransferToken(sender(), renceiver()).transaction).toEqual(
            transferTransaction(sender(), renceiver(), timestamp())
        )
    })

    it("Should return a TransferTransaction signed", () => {
        const { message, signature } = transferTransaction(
            sender(),
            renceiver(),
            timestamp()
        )
        expect(
            cryptoUtils.validateSignature(
                sender().publicKey,
                message,
                signature
            )
        ).toEqual(true)
    })
})
