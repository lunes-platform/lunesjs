import { IBlockError } from "../../../src/server/blocks/block.types"
import {
    blockByHeight,
    blockHeight, blockAverageDelay
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
       expect(result).toEqual({"message": "the blockNum cannot be less than or equal to zero or greater than nine", "status": "error"});
    })

})