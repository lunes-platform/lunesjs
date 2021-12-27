import { Account } from "../../../src/client/wallet/account"

describe("Create new default account", () => {
    it("Default account must have `12` words in seed", () => {
        expect(
            new Account({}).seed?.split(" ").length
        ).toEqual(12)
    })
    it("Default account must be `mainnet` chain", () => {
        expect(
            new Account({}).chain
        ).toEqual("mainnet")
    })
    it("Default account must have nonce `0`", () => {
        expect(
            new Account({}).nonce
        ).toEqual(0)
    })
})
