import { WalletTypes } from "../wallet/wallet.types"

export interface BaseTransaction {
    sign(privateKey: WalletTypes.PrivateKey): object
    transaction(): object
    send(): object
}
