import generate from "./generators"
import { IAccount, WalletTypes } from "./wallet.types"



const validate = {
    nonce: (nonce: WalletTypes.Nonce): number => {
        if (typeof nonce === "number") {
            return nonce
        } else {
            return 0
        }
    },
    chain: (chain: WalletTypes.Chain): WalletTypes.ChainId => {
        if (chain == "testnet") {
            return "0"
        } else {
            return "1"
        }
    },
    words: (nWord: WalletTypes.nWords): number => {
        const multipleOf3 = (n: number) => {
            if (n % 3 === 0) {
                return n
            } else {
                return 3 * Math.round(n / 3)
            }
        }

        if (typeof nWord === "number") {
            return multipleOf3(nWord)
        } else {
            return 12
        }
    },
    address: (address: WalletTypes.Address): boolean => {
        return true
    }
}


export default validate