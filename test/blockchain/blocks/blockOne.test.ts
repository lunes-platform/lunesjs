// import { IBlockError } from "../../../src/server/blocks/block.types"
import * as blocks from "../../../src/blockchain/blocks/service.blocks"

describe("blockByHeight function- suite test block service", () => {
    it("blockByHeight - block testing error, passing -1 number", async () => {
        const result = await blocks.blockByHeight(-1)

        expect(result.isSuccess).toEqual(false)
    })

    it("blockbyHeight - block testing error, passing i32Max ", async () => {
        const result = await blocks.blockByHeight(2147483648)

        expect(result.isSuccess).toEqual(false)
    })

    it("blockByHeight- receive number 10 param to get fetch", async () => {
        const result = await blocks.blockByHeight(1)
        expect(result).toEqual({
            isSuccess: true,
            header: {
                blocksize: 312,
                features: [],
                fee: 0,
                generator: "37jG983kttnpw4kAAQ6wi1yTyegkLN5LMNb",
                height: 1,
                nxtConsensus: {
                    baseTarget: 153722867,
                    generationSignature: "11111111111111111111111111111111"
                },
                reference:
                    "67rpwLCuS5DGA8KGZXKsVQ7dnPb9goRLoKfgGbLfQg9WoLUgNY77E2jT11fem3coV9nAkguBACzrU1iyZM4B8roQ",
                signature:
                    "soKTPcsb5cD97jnm64zF3pVuVUqUYx3caaDvuPyM6PXPY7eWCxeHeYvKSE2aJwZwRpXdRFdW1g5BQMFpYkHcf85",
                timestamp: 1528077600000,
                transactionCount: 2,
                version: 1
            },
            body: [
                {
                    amount: 5072853761500800,
                    fee: 0,
                    id: "Er65mP3Mgs5PDZNmj2hmtVeBvF3gFp6SqVbqNrE8dq99bFve4EbCwh4efaQb5U5HT77e6Xhzi6DpL2G16sga8Jn",
                    recipient: "37oqFHsx1cRtLWtnp6YyQpud5WJk4v79VPu",
                    signature:
                        "Er65mP3Mgs5PDZNmj2hmtVeBvF3gFp6SqVbqNrE8dq99bFve4EbCwh4efaQb5U5HT77e6Xhzi6DpL2G16sga8Jn",
                    timestamp: 1528077600000,
                    type: 1
                },
                {
                    amount: 10000000000000000,
                    fee: 0,
                    id: "D3rtv9DWiRGmKpiTeknbug4gUuxBY6LMTVquR21ijUgcbTGdPyp4iHFAL4byCwSjnLpsE3nqkJSqkubQ4RmLTGW",
                    recipient: "3826zwbgHauHXAoppU4we3hsJc9GtRCpSvz",
                    signature:
                        "D3rtv9DWiRGmKpiTeknbug4gUuxBY6LMTVquR21ijUgcbTGdPyp4iHFAL4byCwSjnLpsE3nqkJSqkubQ4RmLTGW",
                    timestamp: 1528077600000,
                    type: 1
                }
            ]
        })
    })
})


describe("actualHeight function - suite test block service", () => {
    it("actualHeight - see height block from node ", async () => {
        const result = await blocks.actualHeight()
        expect(result).toBeGreaterThan(0)
    })
})

describe("blockAverageDelay function - suite test block service", () => {
    it("blockAverageDelay - see Average delay ", async () => {
        const result = await blocks.blockAverageDelay(
            "3TzngGgQ2xsC1huRantEWNZzG3FoCPA5rCRdqenCy1jGxyRb16nb6p4Xy9ZM4FnypTdWXE31QsZ5EkTTnzTDrjKi",
            1
        )
        expect(result).toStrictEqual(1011)
    })

    it("blockAverageDelay - blockNum >9 error ", async () => {
        const result = await blocks.blockAverageDelay(
            "3TzngGgQ2xsC1huRantEWNZzG3FoCPA5rCRdqenCy1jGxyRb16nb6p4Xy9ZM4FnypTdWXE31QsZ5EkTTnzTDrjKi",
            10
        )
        expect(result.isSuccess).toEqual(false)
    })
})

describe("blockSeq function - suite test block service", () => {
    it("blockSeq - Get block at specified heights ", async () => {
        const result = await blocks.blockSeq(1, 2)
        expect(result).toStrictEqual([
            {
                blocksize: 312,
                fee: 0,
                generator: "37jG983kttnpw4kAAQ6wi1yTyegkLN5LMNb",
                height: 1,
                "nxt-consensus": {
                    "base-target": 153722867,
                    "generation-signature": "11111111111111111111111111111111"
                },
                reference:
                    "67rpwLCuS5DGA8KGZXKsVQ7dnPb9goRLoKfgGbLfQg9WoLUgNY77E2jT11fem3coV9nAkguBACzrU1iyZM4B8roQ",
                signature:
                    "soKTPcsb5cD97jnm64zF3pVuVUqUYx3caaDvuPyM6PXPY7eWCxeHeYvKSE2aJwZwRpXdRFdW1g5BQMFpYkHcf85",
                timestamp: 1528077600000,
                transactionCount: 2,
                transactions: [
                    {
                        amount: 5072853761500800,
                        fee: 0,
                        id: "Er65mP3Mgs5PDZNmj2hmtVeBvF3gFp6SqVbqNrE8dq99bFve4EbCwh4efaQb5U5HT77e6Xhzi6DpL2G16sga8Jn",
                        recipient: "37oqFHsx1cRtLWtnp6YyQpud5WJk4v79VPu",
                        signature:
                            "Er65mP3Mgs5PDZNmj2hmtVeBvF3gFp6SqVbqNrE8dq99bFve4EbCwh4efaQb5U5HT77e6Xhzi6DpL2G16sga8Jn",
                        timestamp: 1528077600000,
                        type: 1
                    },
                    {
                        amount: 10000000000000000,
                        fee: 0,
                        id: "D3rtv9DWiRGmKpiTeknbug4gUuxBY6LMTVquR21ijUgcbTGdPyp4iHFAL4byCwSjnLpsE3nqkJSqkubQ4RmLTGW",
                        recipient: "3826zwbgHauHXAoppU4we3hsJc9GtRCpSvz",
                        signature:
                            "D3rtv9DWiRGmKpiTeknbug4gUuxBY6LMTVquR21ijUgcbTGdPyp4iHFAL4byCwSjnLpsE3nqkJSqkubQ4RmLTGW",
                        timestamp: 1528077600000,
                        type: 1
                    }
                ],
                version: 1
            },
            {
                blocksize: 227,
                features: [2],
                fee: 0,
                generator: "37oqFHsx1cRtLWtnp6YyQpud5WJk4v79VPu",
                height: 2,
                "nxt-consensus": {
                    "base-target": 153722867,
                    "generation-signature":
                        "E28JsgAfipFaBZLvYBJZUJh2aAdZcMTKuS9KZ4jRzZ6q"
                },
                reference:
                    "soKTPcsb5cD97jnm64zF3pVuVUqUYx3caaDvuPyM6PXPY7eWCxeHeYvKSE2aJwZwRpXdRFdW1g5BQMFpYkHcf85",
                signature:
                    "4qZHFNXz5CM4vTapEHoecqYthEacHje3pvesy2rGzj5yLrd52gN6iVwWuX3mBJTWvqJeHYHnNuWqWmQpFayZAxYX",
                timestamp: 1528116151053,
                transactionCount: 0,
                transactions: [],
                version: 3
            }
        ])
    })

    it("blockSeq - from > to error ", async () => {
        const result = await blocks.blockSeq(2, 1)
        expect(result.isSuccess).toEqual(false)
    })

    it("blockSeq - big sequences ", async () => {
        const result = await blocks.blockSeq(1, 101)
        expect(result.isSuccess).toEqual(false)    
    })

    it("blockSeq - max === false ", async () => {
        const result = await blocks.blockSeq(1, 200)
        expect(result.isSuccess).toEqual(false)
    })
})

describe("blockLast function - suite test block service", () => {
    it("blockLast - Get last block data ", async () => {
        const result = await blocks.blockLast()

        //ok
        expect(result.isSuccess).toEqual(true)

        //see received 
        //expect(result).toStrictEqual("")

    })
})

describe("blockChild function - suite test block service", () => {
    it("blockChild - Get children of specified block ", async () => {
        const result = await blocks.blockChild(
            "3Ho1ZKnxzKAvrwo5RsMAesdiw6EW3f5Mn8etEhPP2t5z6N3iVK385ezvbNkxUen6yRUhwuiXg97P9uGMVeUpHG4f"
        )
       //ok
       expect(result.isSuccess).toEqual(true)
    })

    it("blockChild - error 404 ", async () => {

        // const action = async () => {
        //     await blocks.blockChild("124afdsfaf")
        // }

        // expect(action()).rejects.toThrow()

        const result = await blocks.blockChild("124afdsfaf")
       //ok
       expect(result.isSuccess).toEqual(false)
    })
})

describe("blockHeightEncoded function - suite test block service", () => {
    it("blockHeightEncoded - Get height of a block by its Base58-encoded signature ", async () => {
        const result = await blocks.blockHeightEncoded(
            "3Ho1ZKnxzKAvrwo5RsMAesdiw6EW3f5Mn8etEhPP2t5z6N3iVK385ezvbNkxUen6yRUhwuiXg97P9uGMVeUpHG4f"
        )
        expect(result).toStrictEqual({
            height: 1887361
        })
    })

    it("blockHeightEncoded - error 404 ", async () => {
        // const result = async () => {
        //     await blocks.blockHeightEncoded("124afdsfaf")
        // }

        // expect(result()).rejects.toThrow()

        const result = await blocks.blockHeightEncoded("124afdsfaf")
        //ok
       expect(result.isSuccess).toEqual(false)
    })
})

describe("blockAtHeaderOnly function - suite test block service", () => {
    it("blockAtHeaderOnly - Get block at specified height without transactions payload ", async () => {
        const result = await blocks.blockAtHeaderOnly(1)
        expect(result.isSuccess).toEqual(true) 
    })

    it("blockAtHeaderOnly - error 404 ", async () => {
        // const result = async () => {
        //     await blocks.blockAtHeaderOnly(11111111111)
        // }

        // expect(result()).rejects.toThrow()

        const result = await blocks.blockAtHeaderOnly(11111111111)
        //ok
        expect(result.isSuccess).toEqual(false)       
    })
})

describe("blockSeqHeaderOnly function - suite test block service", () => {
    it(" blockSeqHeaderOnly test ", async () => {
        const result = await blocks.blockSeqHeaderOnly(1, 2)
        expect(result).toStrictEqual([
            {
                blocksize: 312,
                generator: "37jG983kttnpw4kAAQ6wi1yTyegkLN5LMNb",
                height: 1,
                "nxt-consensus": {
                    "base-target": 153722867,
                    "generation-signature": "11111111111111111111111111111111"
                },
                reference:
                    "67rpwLCuS5DGA8KGZXKsVQ7dnPb9goRLoKfgGbLfQg9WoLUgNY77E2jT11fem3coV9nAkguBACzrU1iyZM4B8roQ",
                signature:
                    "soKTPcsb5cD97jnm64zF3pVuVUqUYx3caaDvuPyM6PXPY7eWCxeHeYvKSE2aJwZwRpXdRFdW1g5BQMFpYkHcf85",
                timestamp: 1528077600000,
                transactionCount: 2,
                version: 1
            },
            {
                blocksize: 227,
                features: [2],
                generator: "37oqFHsx1cRtLWtnp6YyQpud5WJk4v79VPu",
                height: 2,
                "nxt-consensus": {
                    "base-target": 153722867,
                    "generation-signature":
                        "E28JsgAfipFaBZLvYBJZUJh2aAdZcMTKuS9KZ4jRzZ6q"
                },
                reference:
                    "soKTPcsb5cD97jnm64zF3pVuVUqUYx3caaDvuPyM6PXPY7eWCxeHeYvKSE2aJwZwRpXdRFdW1g5BQMFpYkHcf85",
                signature:
                    "4qZHFNXz5CM4vTapEHoecqYthEacHje3pvesy2rGzj5yLrd52gN6iVwWuX3mBJTWvqJeHYHnNuWqWmQpFayZAxYX",
                timestamp: 1528116151053,
                transactionCount: 0,
                version: 3
            }
        ])
    })

    it(" blockSeqHeaderOnly - error from > to ", async () => {
        const result = await blocks.blockSeqHeaderOnly(2, 1)
        //ok
        expect(result.isSuccess).toEqual(false) 
    })

    it(" blockSeqHeaderOnly - Max === false ", async () => {
        const result = await blocks.blockSeqHeaderOnly(1, 199)
        //ok
        expect(result.isSuccess).toEqual(false) 
    })
})

describe(" blockLastHeaderOnly function - suite test block service", () => {
    it(" blockLastHeaderOnly test ", async () => {
        const result = await blocks.blockLastHeaderOnly()

        //expect(result).toHaveProperty("height") // true
        expect(result.isSuccess).toEqual(true) 
    })
})


describe(" blockSignature - suite test block service", () => {
    it("blockSignature test", async () => {
        const result = await blocks.blockSignature(
            "3TzngGgQ2xsC1huRantEWNZzG3FoCPA5rCRdqenCy1jGxyRb16nb6p4Xy9ZM4FnypTdWXE31QsZ5EkTTnzTDrjKi"
        )
        expect(result.isSuccess).toEqual(true) 

    })

    it("blockSignature - error 404 ", async () => {
        // const result = async () => {
        //     await blocks.blockSignature("124afdsfaf")
        // }

        // expect(result()).rejects.toThrow()

        const result = await blocks.blockSignature("124afdsfaf")
        expect(result.isSuccess).toEqual(false) 
    })
})

describe(" blockFirst - suite test block service", () => {
    it("blockFirst test ", async () => {

        const result = await blocks.blockFirst()
        expect(result.isSuccess).toEqual(true) 

    })
})

// describe(" blockAddress - suite test block service", () => {
//     it("blockAddress test ", async () => {
//         const result = await blockAddress(
//             "385vc8T7brZYTaNb1QV4BjU4JN9S3MoeKZd",
//             1889863,
//             1889864
//         )
//         expect(result).toStrictEqual([
//             {
//                 blocksize: 225,
//                 features: [],
//                 fee: 0,
//                 generator: "385vc8T7brZYTaNb1QV4BjU4JN9S3MoeKZd",
//                 height: 1889864,
//                 "nxt-consensus": {
//                     "base-target": 51,
//                     "generation-signature":
//                         "9iHAgT78TCbzv5HfhxVzzRnM132n45UGqGbvH59FvBoB"
//                 },
//                 reference:
//                     "9zvED5KcnvkYsKLFxiCXQDiEsyXrKdtVH23b3qPt2FhAh3BrhUaZbqtndYWCbn4GmPrZvDbwY1vwqrxdgyazGfH",
//                 signature:
//                     "353wWZjKZzLiYKkVbgXLrxsK7dzYo9pEgw2pV31rXLnb1EdZbraZThrpg92swhrtQh1J353rPesvcB1mMEAoQtzP",
//                 timestamp: 1648218628090,
//                 transactionCount: 0,
//                 transactions: [],
//                 version: 3
//             }
//         ])
//     })

//     it(" blockAddress - error from > to ", async () => {
//         const result = await blockAddress(
//             "385vc8T7brZYTaNb1QV4BjU4JN9S3MoeKZd",
//             1889864,
//             1889863
//         )
//         expect(result).toEqual({
//             message:
//                 "Too big sequences requested OR {from} cannot be bigger than {to}, change it",
//             status: "error"
//         })
//     })

//     it(" blockAddress - error Max === false ", async () => {
//         const result = await blockAddress(
//             "385vc8T7brZYTaNb1QV4BjU4JN9S3MoeKZd",
//             1889863,
//             1889999
//         )
//         expect(result).toEqual({
//             message:
//                 "Too big sequences requested OR {from} cannot be bigger than {to}, change it",
//             status: "error"
//         })
//     })
// })
