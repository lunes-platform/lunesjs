import { IAccount, WalletTypes } from "./wallet.types"
import generate from "./utils"

export class Account implements IAccount {
    nWords: WalletTypes.nWords
    chain: WalletTypes.Chain
    nonce: WalletTypes.Nonce
    seed: WalletTypes.Seed
    privateKey: WalletTypes.PrivateKey
    publicKey: WalletTypes.PublicKey
    address: WalletTypes.Address

    constructor(account: IAccount) {
        const wallet: IAccount = generate.wallet(account)
        this.chain = wallet.chain
        this.nonce = wallet.nonce
        this.seed = wallet.seed
        this.privateKey = wallet.privateKey
        this.publicKey = wallet.publicKey
        this.address = wallet.address
    }
}
