import lunesjs from "../../../src/index"

describe("Test Withdraw Stake", () => {
    const sender = lunesjs.walletFactory({
        privateKey: "8YMbX5BCQdazwgdVfeUpKuoUJrmYpMyGVAGAsNaHVj1u"
    })

    const txId = "HW6LEMco39XTKxqD5SinvVCVHNY7T44LgQeRiNXX9LL"

    const createTx = (publicKey: string, id: string) => {
        return lunesjs.withdrawStakeFactory({
            senderPublicKey: publicKey,
            id: id,
            timestamp: 1649980377489
        })
    }

    it("Test Create Withdraw Stake", () => {
        const tx = createTx(sender.publicKey, txId)
        expect(tx.transaction()).toEqual({
            senderPublicKey: "2ti1GM7F7J78J347fqSWSVocueDV3RSCFkLSKqmhk35Z",
            id: txId,
            timestamp: 1649980377489,
            signature: "",
            fee: 100000,
            type: 9
        })
    })

    it("Test Signature of Withdraw Stake", () => {
        const tx = createTx(sender.publicKey, txId)
        const sign_tx = tx.sign(sender.privateKey)

        const response = lunesjs.crypto.validateSignature(
            sign_tx.senderPublicKey,
            sign_tx.message,
            sign_tx.signature
        )

        expect(response).toEqual(true)
    })

    it("Test Broadcast of Withdraw Stake", async () => {
        const sender = lunesjs.walletFactory({ chain: 0 })
        const tx = lunesjs.withdrawStakeFactory({
            senderPublicKey: sender.publicKey,
            id: txId
        })

        tx.sign(sender.privateKey)
        const x = await tx.broadcast()
        expect(x.isSuccess).toEqual(false)
    })
})
