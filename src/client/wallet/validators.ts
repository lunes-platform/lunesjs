import { walletGenerator } from "./generators"
import { IAccount, Types } from "./types"

export function net(chain: Types.Network): Types.NetworkId {
    if (chain == "testnet") {
        return "0"
    } else {
        return "1"
    }
}

export function words(nWord: Types.nWords): number {
    // number should be n % 3 == 0 or round this
    if(typeof nWord === "number") {
        if(nWord % 3 === 0) {
            return nWord
        } else {
            return Math.round(nWord / 3) * 3
        }
    }
    return 12
}

export function validateAddress(address: Types.Address): boolean {
    return true
}