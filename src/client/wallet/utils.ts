import { IAccount } from "./wallet.types"
import lunesCrypto from "../../utils/crypto"

function match(
    account: IAccount,
    fromNewSeed: (account: IAccount) => IAccount,
    fromExistingSeed: (account: IAccount) => IAccount,
    fromPrivateKey:  (account: IAccount) => IAccount,
    fromPublicKey:  (account: IAccount) => IAccount,
    fromAddress:  (account: IAccount) => IAccount
): IAccount {
    if (account.seed != undefined && 
        account.privateKey == undefined && account.publicKey == undefined && account.address == undefined) {
        return fromExistingSeed(account)
    } else
    if (account.privateKey != undefined && 
        account.seed == undefined && account.publicKey == undefined && account.address == undefined) {
        return fromPrivateKey(account)
    }else
    if (account.publicKey != undefined && 
        account.seed == undefined && account.privateKey == undefined && account.address == undefined) {
        return fromPublicKey(account)
    } else
    if (account.address != undefined && 
        account.seed == undefined && account.privateKey == undefined && account.publicKey == undefined) {
        return fromAddress(account)
    }
    else {
        return fromNewSeed(account)
    }
}


const generate = {
    wallet: (account: IAccount): IAccount => {
        return match(
            account,
            lunesCrypto.fromNewSeed,
            lunesCrypto.fromExistingSeed,
            lunesCrypto.fromPrivateKey,
            lunesCrypto.fromPublicKey,
            lunesCrypto.fromAddress
        )
    }
}


export default generate






