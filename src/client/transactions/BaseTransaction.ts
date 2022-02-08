import { WalletTypes } from "../wallet/wallet.types"

export interface BaseTransaction {
    constructor: object
    transaction(): object
    sign(privateKey: WalletTypes.PrivateKey): object
    ready(): boolean
    send(): object
}

export type TransferTransaction = {
    sender: WalletTypes.PublicKey
    receiver: WalletTypes.Address
    chain: WalletTypes.Chain.Mainnet | WalletTypes.Chain.Testnet
    amount: number
    assetFee?: string
    assetId?: string
    timestamp?: number
    fee?: number
    privateKey?: WalletTypes.PrivateKey
}
