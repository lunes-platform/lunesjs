import { IAccount, WalletTypes } from "./wallet.types";
import generate from "./generators"

export class Account implements IAccount {
    seed: WalletTypes.Seed
    hashSeed: WalletTypes.HashSeed;
    nonce: WalletTypes.Nonce
    chain: WalletTypes.Chain
    privateKey: WalletTypes.PrivateKey
    publicKey: WalletTypes.PublicKey
    address: WalletTypes.Address
    nWords: WalletTypes.nWords
    chainId: WalletTypes.ChainId

    constructor(account: IAccount) {
        const wallet: IAccount = generate.wallet(account)
        this.seed = wallet.seed
        this.hashSeed = wallet.hashSeed
        this.nonce = wallet.nonce
        this.nWords = wallet.nWords
        this.chain = wallet.chain
        this.chainId = wallet.chainId
        this.privateKey = wallet.privateKey
        this.publicKey = wallet.publicKey
        this.address = wallet.address
    }
}

