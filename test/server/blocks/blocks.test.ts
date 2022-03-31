import { IBlockError } from "../../../src/server/blocks/block.types"
import {
    blockByHeight,
    blockHeight,
    blockAverageDelay,
    blockSeq,
    blockLast,
    blockChild,
    blockHeightEncoded,
    blockAtHeaderOnly,
    blockSeqHeaderOnly,
    blockLastHeaderOnly,
    blockSignature,
    blockFirst,
    blockAddress
} from "../../../src/server/blocks/service.blocks"

describe("test block service", () => {


    it("see height block from node ", async () => {
        const result = await blockHeight()
        //expect(200);
        //expect(result.statusCode).toEqual(200);
        /*expect(result).toBeCalledWith(
                expect.objectContaining({
                height: expect.any(Number),
                }),
            );*/ // estudar melhor o código

        expect(result).toMatchObject({
            height: expect.any(Number)
        })
    })

    it("see Average delay ", async () => {
        const result = await blockAverageDelay(
            "3TzngGgQ2xsC1huRantEWNZzG3FoCPA5rCRdqenCy1jGxyRb16nb6p4Xy9ZM4FnypTdWXE31QsZ5EkTTnzTDrjKi",
            1
        )
        expect(result).toMatchObject({
            delay: expect.any(Number)
        })
    })

    it("Get block at specified heights ", async () => {
        const result = await blockSeq(1, 2)
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

    it("Get last block data ", async () => {
        const result = await blockLast()
        expect(result).toMatchObject(result)
        //https://stackoverflow.com/questions/47754777/jest-how-to-test-for-object-keys-and-values
    })

    it("Get children of specified block ", async () => {
        const result = await blockChild(
            "3Ho1ZKnxzKAvrwo5RsMAesdiw6EW3f5Mn8etEhPP2t5z6N3iVK385ezvbNkxUen6yRUhwuiXg97P9uGMVeUpHG4f"
        )
        expect(result).toStrictEqual({
            version: 3,
            timestamp: 1648064056012,
            reference:
                "3Ho1ZKnxzKAvrwo5RsMAesdiw6EW3f5Mn8etEhPP2t5z6N3iVK385ezvbNkxUen6yRUhwuiXg97P9uGMVeUpHG4f",
            "nxt-consensus": {
                "base-target": 39,
                "generation-signature":
                    "EKoXAqLn4ij3936rxtESW3EAjHtuJXDiFuTYrKNa4uku"
            },
            features: [],
            generator: "37nX3hdCt1GWeSsAMNFmWgbQWZZhbvBG3mX",
            signature:
                "2jeAT1NG4XeH48ckeuPVj4Ejmxg4ZU4VYzpHNCMeq2WTZvcrtBt1RraXq7mtu5pphiiwdyWfVTPxcAZXQcm6V99a",
            blocksize: 225,
            transactionCount: 0,
            fee: 0,
            transactions: []
        })
    })

    it("Get height of a block by its Base58-encoded signature ", async () => {
        const result = await blockHeightEncoded(
            "3Ho1ZKnxzKAvrwo5RsMAesdiw6EW3f5Mn8etEhPP2t5z6N3iVK385ezvbNkxUen6yRUhwuiXg97P9uGMVeUpHG4f"
        )
        expect(result).toStrictEqual({
            height: 1887361
        })
    })

    it("Get block at specified height without transactions payload ", async () => {
        const result = await blockAtHeaderOnly(1)
        expect(result).toStrictEqual({
            version: 1,
            timestamp: 1528077600000,
            reference:
                "67rpwLCuS5DGA8KGZXKsVQ7dnPb9goRLoKfgGbLfQg9WoLUgNY77E2jT11fem3coV9nAkguBACzrU1iyZM4B8roQ",
            "nxt-consensus": {
                "base-target": 153722867,
                "generation-signature": "11111111111111111111111111111111"
            },
            generator: "37jG983kttnpw4kAAQ6wi1yTyegkLN5LMNb",
            signature:
                "soKTPcsb5cD97jnm64zF3pVuVUqUYx3caaDvuPyM6PXPY7eWCxeHeYvKSE2aJwZwRpXdRFdW1g5BQMFpYkHcf85",
            blocksize: 312,
            transactionCount: 2,
            height: 1
        })
    })

    it("blockSeqHeaderOnly test ", async () => {
        const result = await blockSeqHeaderOnly(1, 2)
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

    it("blockLastHeaderOnly test ", async () => {
        const result = await blockLastHeaderOnly()
        //expect(result).toMatchObject(result)
        //https://stackoverflow.com/questions/47754777/jest-how-to-test-for-object-keys-and-values
        expect(result).toHaveProperty("height") // true
    })

    it("blockSignature test", async () => {
        const result = await blockSignature(
            "3TzngGgQ2xsC1huRantEWNZzG3FoCPA5rCRdqenCy1jGxyRb16nb6p4Xy9ZM4FnypTdWXE31QsZ5EkTTnzTDrjKi"
        )
        expect(result).toStrictEqual({
            version: 3,
            timestamp: 1528116159255,
            reference:
                "5f6NF1TUgJ5xHyGdys8T19iETr4dSTo182r82Z4RTRzYj1wAYBRLTJhsBiRWHDTNZWKsqF4j3bAH5Ng1YxXCCLik",
            "nxt-consensus": {
                "base-target": 112701916,
                "generation-signature":
                    "GrEEg2Uc25GfVG5Cp4xXLgvB4hYYE2KLrwLEvg48z2sT"
            },
            features: [2],
            generator: "37oqFHsx1cRtLWtnp6YyQpud5WJk4v79VPu",
            signature:
                "3TzngGgQ2xsC1huRantEWNZzG3FoCPA5rCRdqenCy1jGxyRb16nb6p4Xy9ZM4FnypTdWXE31QsZ5EkTTnzTDrjKi",
            blocksize: 227,
            transactionCount: 0,
            fee: 0,
            transactions: [],
            height: 10
        })
    })

    it("blockFirst test ", async () => {
        const result = await blockFirst()
        expect(result).toStrictEqual({
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
        })
    })

    it("blockAddress test ", async () => {
        const result = await blockAddress(
            "385vc8T7brZYTaNb1QV4BjU4JN9S3MoeKZd",
            1889863,
            1889864
        )
        expect(result).toStrictEqual([
            {
                blocksize: 225,
                features: [],
                fee: 0,
                generator: "385vc8T7brZYTaNb1QV4BjU4JN9S3MoeKZd",
                height: 1889864,
                "nxt-consensus": {
                    "base-target": 51,
                    "generation-signature":
                        "9iHAgT78TCbzv5HfhxVzzRnM132n45UGqGbvH59FvBoB"
                },
                reference:
                    "9zvED5KcnvkYsKLFxiCXQDiEsyXrKdtVH23b3qPt2FhAh3BrhUaZbqtndYWCbn4GmPrZvDbwY1vwqrxdgyazGfH",
                signature:
                    "353wWZjKZzLiYKkVbgXLrxsK7dzYo9pEgw2pV31rXLnb1EdZbraZThrpg92swhrtQh1J353rPesvcB1mMEAoQtzP",
                timestamp: 1648218628090,
                transactionCount: 0,
                transactions: [],
                version: 3
            }
        ])
    })
})
