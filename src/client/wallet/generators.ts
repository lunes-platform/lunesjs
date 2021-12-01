import { IAccount, Types } from "./types";
import { net, words } from "./validators"


function generateNewSeed(nWords: Types.nWords): Types.Seed {
    return "nova seed pronta"
}

function seedGenerator(seed: Types.Seed,
                       nonce: Types.Nonce,
                       networkId: Types.NetworkId): IAccount {
    return {
        seed: "seed",
        network: "mainnet",
        privateKey: "seck",
        publicKey: "pubk",
        address: "addr",
        networkId: "1",
        nWords: 12,
        nonce: 0,
    }
}


function privateKeyGenerator(privateKey: Types.PrivateKey,
                             networkId: Types.NetworkId): IAccount {
    return {
        seed: "seed",
        network: "mainnet",
        privateKey: "seck",
        publicKey: "pubk",
        address: "addr",
        networkId: "1",
        nWords: 12,
        nonce: 0,
    }    
}


function publicKeyGenerator(publicKey: Types.PublicKey,
                            networkId: Types.NetworkId): IAccount {
    return {
        seed: "seed",
        network: "mainnet",
        privateKey: "seck",
        publicKey: "pubk",
        address: "addr",
        networkId: "1",
        nWords: 12,
        nonce: 0,
    }
}


function addressGenerator(publicKey: Types.PublicKey,
                          address: Types.Address,
                          networkId: Types.NetworkId): IAccount {
    return {
        seed: "seed",
        network: "mainnet",
        privateKey: "seck",
        publicKey: "pubk",
        address: "addr",
        networkId: "1",
        nWords: 12,
        nonce: 0,
    }
}


export function walletGenerator(data: IAccount): IAccount {
    data.networkId = net(data.network)
    data.nWords = words(data.nWords)
    data.nonce = typeof data.nonce === "undefined" ? 0 : data.nonce

    if(typeof data.seed === "string"){
        return seedGenerator(data.seed, data.nonce, data.networkId)
    } else if(typeof data.privateKey === "string") {
        return privateKeyGenerator(data.privateKey, data.networkId)
    } else if(typeof data.publicKey === "string") {
        return publicKeyGenerator(data.publicKey, data.networkId)
    } else if(typeof data.address === "string") {
        data.publicKey = ""
        return addressGenerator(data.publicKey, data.address, data.networkId)
    } else {
        data.seed = generateNewSeed(data.nWords)
        return seedGenerator(data.seed, data.nonce, data.networkId)
    }
}