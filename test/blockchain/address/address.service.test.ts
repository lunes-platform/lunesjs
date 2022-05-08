//import { IAddress, IAddressError } from "../../../src/blockchain/address/address.types"
import {
    validateAddr,
    assetBalance, assetDistribution
} from "../../../src/blockchain/address/service.address"

describe("validateAddr function- suite test block service", () => {
    it("validateAddr - validate address, passing true addrress", async () => {
        const result = await validateAddr("37pU1WLv8vettr9UHGfPpTMWe1twne8FCBn")
        expect(result).toStrictEqual({
            address: "37pU1WLv8vettr9UHGfPpTMWe1twne8FCBn",
            valid: true
        })
    })

    it("validateAddr - incorrect address, testing response.data.valid=== false", async () => {
        const result = await validateAddr("-1")
        expect(result).toStrictEqual({
            message: "address invalid",
            status: "error"
        })
    })
})

describe("ASSETS  functions - suite test ASSETS service", () => {
    it("assetBalance  - check asset, passing true addrress", async () => {
        const result = await assetBalance("387LjpQ5fdBdcY4nRcfDU7gPYdesbc1Md4D")
        expect(result).toStrictEqual({
            address: "387LjpQ5fdBdcY4nRcfDU7gPYdesbc1Md4D",
            balances: [
                {
                    assetId: "FJL6J61NFWmZksXh3KnZdbN4ZWwgkZkUswWQ1G9DLvUk",
                    balance: 13140000,
                    issueTransaction: {
                        assetId: "FJL6J61NFWmZksXh3KnZdbN4ZWwgkZkUswWQ1G9DLvUk",
                        decimals: 8,
                        description:
                            "Reward Token for lunesrealnode.com Leasers",
                        fee: 100000000,
                        id: "FJL6J61NFWmZksXh3KnZdbN4ZWwgkZkUswWQ1G9DLvUk",
                        name: "NEO Token",
                        quantity: 1000000000000000,
                        reissuable: true,
                        sender: "37kGaGFGgzw5E6cr5thLVsxiXHoJSMuso92",
                        senderPublicKey:
                            "EkUV6ihoPtvXKX8q6KhkSasihjxWZcXivBuf4HpN4sRp",
                        signature:
                            "5uEUY5JgQ9756RAPCHNStsFNyLGU9pp1kv3q3N2MdwUnYAyzvU7wdtG5MTsKwNmYDvkTUwHP6fjaJqH6rzuCm7NP",
                        timestamp: 1529557133065,
                        type: 3
                    },
                    quantity: 1000000000000000,
                    reissuable: true
                }
            ]
        })
    })

    it("assetBalance -error 400  - check asset, passing invalid addrress", async () => {
        ///const result = await assetOne("387LjpQ5fdBdcY4nRcfDU7gPYdesbc1Md4Dm")
        //expect(result).toStrictEqual("invalid address")
        // expect(result()).rejects.toThrow()

        const result = async () => {
            await assetBalance("387LjpQ5fdBdcY4nRcfDU7gPYdesbc1Md4Dm")
        }

        expect(result()).rejects.toThrow()
    })
})



describe(" assetDistribution function- suite test ASSET DIST service", () => {
    it("assetDistribution  - check ASSET DIST, passing VALID assetID", async () => {
        const result = await assetDistribution("4xxGB1BgeiegawpZnvFssacbKzFuPKoueGD7k7xjmJn8")
        expect(result).toStrictEqual({
            "37rjJJQvE1g9qENxGTKubD3XkK5s5RAJS2f": 0,
            "385ZRVhNfK7oZhPFeBRgpvChdZrzPhwjDZR": 1
          })

    })

    it("assetDistribution  - check ASSET DIST, passing inexistent assetID", async () => {
        const result = await assetDistribution("abracadabra")
        expect(result).toStrictEqual({})

    })

})
//37qrqmmQ8jwJJB2aXMnXt98kiwezyzb5ww7 richlist com vários assets

/*
describe("validateAddr function- suite test block service", () => {

})*/
