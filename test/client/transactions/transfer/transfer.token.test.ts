import {TransferToken} from "../../../../src/client/transactions/transfer/service.transfer"

describe("Create new Transfer Transaction", () => {
    it(`Create Transfer of Lunes`, () => {
        expect(new TransferToken()).toEqual(new TransferToken())
    })
})