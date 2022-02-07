import { IAccount } from "./wallet.types"
import cryptoUtils from "../../utils/crypto"

function match(
    account: IAccount,
    fromNewSeed: (account: IAccount) => IAccount,
    fromExistingSeed: (account: IAccount) => IAccount,
    fromPrivateKey: (account: IAccount) => IAccount,
    fromPublicKey: (account: IAccount) => IAccount,
    fromAddress: (account: IAccount) => IAccount
): IAccount {
    if (account.seed != undefined) {
        return fromExistingSeed(account)
    } else if (account.privateKey != undefined) {
        return fromPrivateKey(account)
    } else if (account.publicKey != undefined) {
        return fromPublicKey(account)
    } else if (account.address != undefined) {
        return fromAddress(account)
    } else {
        return fromNewSeed(account)
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
