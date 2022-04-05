import { IBlockError } from "../../../src/server/blocks/block.types"
import {
    blockByHeight,
    blockHeight,
    blockAverageDelay, blockSeq, blockLast, blockChild
} from "../../../src/server/blocks/service.blocks"



describe("blockByHeight function- suite test block service", () => {
    it("blockByHeight - block testing error, passing -1 number", async () => {
        // const result = await blockByHeight(-1);
        // expect(result).toEqual(1);
        // expect().toEqual(error);
        // try {
        const result = await blockByHeight(-1)
        //} catch (error) {
        //   console.log(error)
        //expect(error).toEqual('s');
        // expect(error).toBeInstanceOf(error)
        // expect(error).toHaveProperty("cilada")
        //}
        expect(result).toEqual({
            message:
                "the block cannot be less than or equal to zero or greater than or equal 2147483647",
            status: "error"
        })
        expect(result).toMatchObject({
            message: expect.any(String)
        })
    })

    it("blockbyHeight - block testing error, passing i32Max ", async () => {
        const result = await blockByHeight(2147483648)

        expect(result).toEqual({
            message:
                "the block cannot be less than or equal to zero or greater than or equal 2147483647",
            status: "error"
        })
        expect(result).toMatchObject({
            message: expect.any(String)
        })
    })

    it("blockByHeight- receive number 10 param to get fetch", async () => {
        const result = await blockByHeight(10)
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

    it("blockByHeight - block testing error, passing -100 number", async () => {
        try {
            const result = await blockByHeight(-100)
        } catch (error) {
            console.log(error)
            //expect(error).toEqual(error);
            //expect(error).toBeInstanceOf(IError)
            expect(error).toHaveProperty("status")
        }
    })
})

describe("blockHeight function - suite test block service", () => {
    it("blockHeight - see height block from node ", async () => {
        const result = await blockHeight()
        expect(result).toMatchObject({
            height: expect.any(Number)
        })
    })
})

describe("blockAverageDelay function - suite test block service", () => {
    it("blockAverageDelay - see Average delay ", async () => {
        const result = await blockAverageDelay(
            "3TzngGgQ2xsC1huRantEWNZzG3FoCPA5rCRdqenCy1jGxyRb16nb6p4Xy9ZM4FnypTdWXE31QsZ5EkTTnzTDrjKi",
            1
        )
        expect(result).toMatchObject({
            delay: expect.any(Number)
        })
    })

    it("blockAverageDelay - blockNum >9 error ", async () => {
        const result = await blockAverageDelay(
            "3TzngGgQ2xsC1huRantEWNZzG3FoCPA5rCRdqenCy1jGxyRb16nb6p4Xy9ZM4FnypTdWXE31QsZ5EkTTnzTDrjKi",
            10
        )
        // expect(result).toMatchObject({
        // delay: expect.any(Number)
        // })
        expect(result).toEqual({
            message:
                "the blockNum cannot be less than or equal to zero or greater than nine",
            status: "error"
        })
    })
})


describe("blockSeq function - suite test block service", () => {
it("blockSeq - Get block at specified heights ", async () => {
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

it("blockSeq - from > to error ", async () => {
    const result = await blockSeq(2, 1)
    expect(result).toEqual({"message": "Too big sequences requested OR {from} cannot be bigger than {to}, change it", "status": "error"})
})

it("blockSeq - big sequences ", async () => {
    const result = await blockSeq(1, 101)
    expect(result).toEqual({"message": "Too big sequences requested OR {from} cannot be bigger than {to}, change it", "status": "error"})
})

it("blockSeq - max === false ", async () => {
    const result = await blockSeq(1, 200)
    expect(result).toEqual({"message": "Too big sequences requested OR {from} cannot be bigger than {to}, change it", "status": "error"})
})

})

describe("blockLast function - suite test block service", () => {
    it("blockLast - Get last block data ", async () => {
        const result = await blockLast()
        expect(result).toMatchObject(result)
        //https://stackoverflow.com/questions/47754777/jest-how-to-test-for-object-keys-and-values
    })
})

describe("blockChild function - suite test block service", () => {
    it("blockChild - Get children of specified block ", async () => {
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

 it("blockChild - error 404 ", async () => {
   /*
        try {
             const result = await  blockChild("124afdsfaf")
            
        } catch (error) {
            console.log(error)
           // expect(error).toHaveProperty('status Code', 404);
           
        }
    */
   // await expect(
    //    async () => await blockChild("124afdsfaf")
    //).rejects.toThrow();

   // const request = Promise.reject({statusCode: 404})
    //await expect(request).rejects.toMatchObject({ statusCode: 500 });
     //expect(() =>blockChild("124afdsfaf")).toThrow('ERR_UNHANDLED_REJECTION');
    //const result = await  blockChild("124afdsfaf")
    
    const action = async () => {
        await blockChild("124afdsfaf");
      };
      
      expect(action()).rejects.toThrow();

    /*    expect(result).toStrictEqual({
            status: `error`,
            message: `block does not exist, try later`
        })
    */
    })  

})