import { IAccount } from "./wallet.types"
import cryptoUtils from "../../utils/crypto"
import { WalletTypes } from "./wallet.types"

function match(
    account: IAccount,
    fromNewSeed: (
        nWords: number,
        nonce: number,
        chain: WalletTypes.Chain
    ) => IAccount,
    fromExistingSeed: (
        seed: string,
        nonce: number,
        chain: WalletTypes.Chain
    ) => IAccount,
    fromPrivateKey: (privateKey: string, chain: WalletTypes.Chain) => IAccount,
    fromPublicKey: (publicKey: string, chain: WalletTypes.Chain) => IAccount,
    fromAddress: (address: string, chain: WalletTypes.Chain) => IAccount
): IAccount {
    if (account.seed != undefined) {
        const nonce = account.nonce != undefined ? account.nonce : 0
        return fromExistingSeed(account.seed, nonce, account.chain)
    } else if (account.privateKey != undefined) {
        return fromPrivateKey(account.privateKey, account.chain)
    } else if (account.publicKey != undefined) {
        return fromPublicKey(account.publicKey, account.chain)
    } else if (account.address != undefined) {
        return fromAddress(account.address, account.chain)
    } else {
        const nWords = account.nWords != undefined ? account.nWords : 12
        const nonce = account.nonce != undefined ? account.nonce : 0
        return fromNewSeed(nWords, nonce, account.chain)
    }
}

const generate = {
    wallet: (account: IAccount): IAccount => {
        return match(
            account,
            cryptoUtils.fromNewSeed,
            cryptoUtils.fromExistingSeed,
            cryptoUtils.fromPrivateKey,
            cryptoUtils.fromPublicKey,
            cryptoUtils.fromAddress
        )
    }
}

export default generate
