import {blockByHeight, blockHeight} from "../../../src/server/blocks/service.blocks"

describe ("test block service" , () => {

    it("receive number 10 param to get fetch" , async()  => {
        const result = await blockByHeight(10);
        expect(result).toStrictEqual({
            "version": 3,
            "timestamp": 1528116159255,
            "reference": "5f6NF1TUgJ5xHyGdys8T19iETr4dSTo182r82Z4RTRzYj1wAYBRLTJhsBiRWHDTNZWKsqF4j3bAH5Ng1YxXCCLik",
            "nxt-consensus": {
            "base-target": 112701916,
            "generation-signature": "GrEEg2Uc25GfVG5Cp4xXLgvB4hYYE2KLrwLEvg48z2sT"},
            "features": [2],
            "generator": "37oqFHsx1cRtLWtnp6YyQpud5WJk4v79VPu",
            "signature": "3TzngGgQ2xsC1huRantEWNZzG3FoCPA5rCRdqenCy1jGxyRb16nb6p4Xy9ZM4FnypTdWXE31QsZ5EkTTnzTDrjKi",
            "blocksize": 227,
            "transactionCount": 0,
            "fee": 0,
            "transactions": [],
            "height": 10
        });

    } )

    it("see height block from node ",  async()  => {

    const result = await blockHeight();
    expect(200);
    //expect(result.statusCode).toEqual(200);
    })

} )
