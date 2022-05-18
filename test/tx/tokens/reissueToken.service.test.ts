import lunesjs from "../../../src/index"

describe("Test Reissue Token", () => {
    const sender = lunesjs.walletFactory({
        privateKey: "8YMbX5BCQdazwgdVfeUpKuoUJrmYpMyGVAGAsNaHVj1u"
    })

    const createTx = (publicKey: string, quant: number, reisssue: boolean) => {
        return lunesjs.reissueTokenFactory({
            senderPublicKey: publicKey,
            tokenId: "TokenTest",
            quantity: quant,
            reissuable: reisssue,
            timestamp: 1649980377489
        })
    }

    it("Reissue Token", () => {
        const tx = createTx(sender.publicKey, 1000, true)
        expect(tx.transaction()).toEqual({
            senderPublicKey: "2ti1GM7F7J78J347fqSWSVocueDV3RSCFkLSKqmhk35Z",
            assetId: "TokenTest",
            timestamp: 1649980377489,
            signature: "",
            reissuable: 1,
            quantity: Math.floor(1000 * 10e7),
            fee: 100000,
            type: 6
        })
    })

    it("Reissue Ivalid Token by quantity", () => {
        expect(() => createTx(sender.publicKey, 0, true)).toThrow()
    })

    it("Signature of Reissue Token", () => {
        const tx = createTx(sender.publicKey, 1000, true)
        const sign_tx = tx.sign(sender.privateKey)

        const response = lunesjs.crypto.validateSignature(
            sign_tx.senderPublicKey,
            sign_tx.message,
            sign_tx.signature
        )

        expect(response).toEqual(true)
    })

    it("Broadcast of Reissue Token", async () => {
        const sender = lunesjs.walletFactory({ chain: 0 })
        const tx = createTx(sender.publicKey, 1000, true)

        tx.sign(sender.privateKey)
        const x = await tx.broadcast()

        expect(x.isSuccess).toEqual(false)
    })
})
