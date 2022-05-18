import lunesjs from "../../../src/index"

describe("Test Burn Token", () => {
    const sender = lunesjs.walletFactory({
        privateKey: "8YMbX5BCQdazwgdVfeUpKuoUJrmYpMyGVAGAsNaHVj1u"
    })

    const createTx = (
        publicKey: string,
        quant: number,
    ) => {
        return lunesjs.burnTokenFactory({
            senderPublicKey: publicKey,
            tokenId: "TokenTest",
            quantity: quant,
            timestamp: 1649980377489
        })
    }

    it("Burn Token", () => {
        const tx = createTx(sender.publicKey, 1000)
        expect(tx.transaction()).toEqual({
            senderPublicKey: "2ti1GM7F7J78J347fqSWSVocueDV3RSCFkLSKqmhk35Z",
            assetId: "TokenTest",
            timestamp: 1649980377489,
            signature: "",
            quantity: Math.floor(1000 * 10e7),
            fee: 100000,
            type: 5
        })
    })

    it("Burn Ivalid Token by quantity", () => {
        expect(() => {
            createTx(sender.publicKey, 0)
        }).toThrow()
        }
    )

    it("Signature of Burn Token", () => {
        const tx = createTx(sender.publicKey, 1000)
        const sign_tx = tx.sign(sender.privateKey)

        const response = lunesjs.crypto.validateSignature(
            sign_tx.senderPublicKey,
            sign_tx.message,
            sign_tx.signature
        )

        expect(response).toEqual(true)
    })

    it("Broadcast of Burn Token", async () => {
        const sender = lunesjs.walletFactory({ chain: 0 })
        const tx = createTx(sender.publicKey, 1000)

        tx.sign(sender.privateKey)
        const x = await tx.broadcast()

        expect(x.isSuccess).toEqual(false)
    })
})
