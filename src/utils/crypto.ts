import { IAccount, WalletTypes } from "../client/wallet/wallet.types"

const cryptoUtils = {
    fromExistingSeed: (account: IAccount): IAccount => {
    return {
        nonce: account.nonce != undefined ? account.nonce : 0,
        chain: account.chain != undefined ? account.chain : WalletTypes.Chain.Mainnet,
        seed: account.seed,
        privateKey: "",
        publicKey: "",
        address: ""
    }
},
    fromPrivateKey: (account: IAccount): IAccount => {
    return {
        nonce: account.nonce != undefined ? account.nonce : 0,
        chain: account.chain != undefined ? account.chain : WalletTypes.Chain.Mainnet,
        seed: "",
        privateKey: account.privateKey,
        publicKey: "",
        address: ""
    }
},
    fromPublicKey: (account: IAccount): IAccount => {
    return {
        nonce: account.nonce != undefined ? account.nonce : 0,
        chain: account.chain != undefined ? account.chain : WalletTypes.Chain.Mainnet,
        seed: "",
        privateKey: "",
        publicKey: account.publicKey,
        address: ""
    }
},
    fromAddress: (account: IAccount): IAccount => {
    return {
        nonce: account.nonce != undefined ? account.nonce : 0,
        chain: account.chain != undefined ? account.chain : WalletTypes.Chain.Mainnet,
        seed: "",
        privateKey: "",
        publicKey: "",
        address: account.address
    }
},
    fromNewSeed: (account: IAccount): IAccount => {
    return {
        chain: account.chain != undefined ? account.chain : WalletTypes.Chain.Mainnet,
        nonce: 0,
        seed: "",
        privateKey: "",
        publicKey: "",
        address: ""
    }
},
    validateAddress: (address: WalletTypes.Address, chain: WalletTypes.Chain) => {
        return true
    }
}


export default cryptoUtils
