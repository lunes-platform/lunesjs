import lunesjs from "../../../src/index"

describe("Test Issue NFT", () => {
    const sender = lunesjs.walletFactory({
        privateKey: "8YMbX5BCQdazwgdVfeUpKuoUJrmYpMyGVAGAsNaHVj1u"
    })

    const createTx = (
        publicKey: string,
    ) => {
        return lunesjs.issueNFTFactory({
            senderPublicKey: publicKey,
            description: "My new Test Token",
            name: "TokenTest",
            timestamp: 1649980377489
        })
    }

    it("Issue NFT", () => {
        const tx = createTx(sender.publicKey)
        expect(tx.transaction()).toEqual({
            senderPublicKey: "2ti1GM7F7J78J347fqSWSVocueDV3RSCFkLSKqmhk35Z",
            description: "My new Test Token",
            name: "TokenTest",
            timestamp: 1649980377489,
            signature: "",
            decimals: 0,
            reissuable: 0,
            quantity: 1,
            fee: 100000,
            type: 3
        })
    })
    test.each([
        {
            publicKey: sender.publicKey,
            describe: "123",
            name: "NAME ERRO LEGHT 1",
            timestamp: Date.now(),
            fee: 100000
        },
        {
            publicKey: sender.publicKey,
            describe: "TIMESTAMP SHOULD BE MORE THAN 1483228800",
            quant: 1000,
            decimals: 10,
            reisssue: true,
            name: "NAME RIGHT",
            timestamp: 1483228799,
            fee: 100000
        },
        {
            publicKey: sender.publicKey,
            describe:
                "DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER DESCRIPTION SHOULD BE LESS THAN 1000 CHARACTER ",
            name: "NAME RIGTH",
            timestamp: Date.now(),
            fee: 100000
        }
    ])(
        "Issue Ivalid Token by \n[$describe]",
        ({
            publicKey,
            describe,
            name,
            timestamp,
            fee
        }) => {
            expect(() => {
                lunesjs.issueNFTFactory({
                    senderPublicKey: publicKey,
                    description: describe,
                    name: name,
                    timestamp: timestamp,
                    fee: fee
                })
            }).toThrow()
        }
    )

    it("Signature of Issue NFT", () => {
        const tx = createTx(sender.publicKey)
        const sign_tx = tx.sign(sender.privateKey)

        const response = lunesjs.crypto.validateSignature(
            sign_tx.senderPublicKey,
            sign_tx.message,
            sign_tx.signature
        )

        expect(response).toEqual(true)
    })

    it("Broadcast of Issue Token", async () => {
        const sender = lunesjs.walletFactory({ chain: 0 })
        const tx = createTx(sender.publicKey)

        tx.sign(sender.privateKey)
        const x = await tx.broadcast()

        expect(x.isSuccess).toEqual(false)
    })
})
