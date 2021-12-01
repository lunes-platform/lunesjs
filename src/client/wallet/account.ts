import { IAccount, Types } from "./types";
import { walletGenerator } from "./generators"

export class Account implements IAccount {
    seed: Types.Seed
    nonce: Types.Nonce
    network: Types.Network
    privateKey: Types.PrivateKey
    publicKey: Types.PublicKey
    address: Types.Address
    nWords: Types.nWords
    networkId: Types.NetworkId

    constructor(data: IAccount) {
        const wallet: IAccount = walletGenerator(data)
        this.seed = wallet.seed
        this.nonce = wallet.nonce
        this.nWords = wallet.nWords
        this.network = wallet.network
        this.networkId = wallet.networkId
        this.privateKey = wallet.privateKey
        this.publicKey = wallet.publicKey
        this.address = wallet.address
    }
}

