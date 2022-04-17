import { validateAddr } from "../../../src/blockchain/address/service.address"

describe("validateAddr function- suite test block service", () => {
    it("validateAddr - validate address, passing true addrress", async () => {
        const result = await validateAddr("37pU1WLv8vettr9UHGfPpTMWe1twne8FCBn")
        expect(result).toStrictEqual({"address": "37pU1WLv8vettr9UHGfPpTMWe1twne8FCBn", "valid": true})
    })
})
