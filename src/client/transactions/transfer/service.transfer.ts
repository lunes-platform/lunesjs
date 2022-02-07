import { WalletTypes } from "../../wallet/wallet.types"
import { BaseTransaction, TransferTransaction } from "../BaseTransaction"

export class TransferToken implements BaseTransaction {
    sender?: WalletTypes.PublicKey
    receiver?: WalletTypes.Address
    chain?: WalletTypes.Chain.Mainnet | WalletTypes.Chain.Testnet
    amount?: number
    assetFee?: string
    assetId?: string
    timestamp?: number
    fee?: number
    privateKey?: WalletTypes.PrivateKey

    constructor(obj: TransferTransaction) {
        this.sender = obj.sender
        this.receiver = obj.receiver
        this.chain = obj.chain
        this.amount = obj.amount
        this.assetFee = obj.assetFee
        this.assetId = obj.assetId
        this.timestamp = obj.timestamp
        this.fee = obj.fee
        this.privateKey = obj.privateKey
    }

    transaction(): object {
        return {}
    }

    sign(privateKey: WalletTypes.PrivateKey): object {
        return {}
    }

    ready(): boolean {
        return false
    }

    send(): object {
        return {}
    }
}
