import lunesjs from "../../../src/index"

describe("Test Issue Token", () => {
    const sender = lunesjs.walletFactory({
        privateKey: "8YMbX5BCQdazwgdVfeUpKuoUJrmYpMyGVAGAsNaHVj1u"
    })

    const createTx = (
        publicKey: string,
        quant: number,
        decimals: number,
        reisssue: boolean
    ) => {
        return lunesjs.issueTokenFactory({
            senderPublicKey: publicKey,
            description: "My new Test Token",
            name: "TokenTest",
            quantity: quant,
            decimals: decimals,
            reissuable: reisssue,
            timestamp: 1649980377489
        })
    }

    it("Issue Token", () => {
        const tx = createTx(sender.publicKey, 1000, 2, true)
        expect(tx.transaction()).toEqual({
            senderPublicKey: "2ti1GM7F7J78J347fqSWSVocueDV3RSCFkLSKqmhk35Z",
            description: "My new Test Token",
            name: "TokenTest",
            timestamp: 1649980377489,
            signature: "",
            decimals: 2,
            reissuable: 1,
            quantity: Math.floor(1000 * 10e7),
            fee: 100000,
            type: 3
        })
    })
    test.each([
        {
            publicKey: sender.publicKey,
            describe: "123",
            quant: 1000,
            decimals: 8,
            reisssue: true,
            name: "NAME ERRO LEGHT 1",
            timestamp: Date.now(),
            fee: 100000
        },
        {
            publicKey: sender.publicKey,
            describe: "DECIMALS SHOULD BE LESS THAN 8",
            quant: 1000,
            decimals: 10,
            reisssue: true,
            name: "NAME RIGHT",
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
            quant: 1000,
            decimals: 8,
            reisssue: true,
            name: "NAME RIGTH",
            timestamp: Date.now(),
            fee: 100000
        }
    ])(
        "Issue Ivalid Token by \n[$describe]",
        ({
            publicKey,
            describe,
            quant,
            decimals,
            reisssue,
            name,
            timestamp,
            fee
        }) => {
            expect(() => {
                lunesjs.issueTokenFactory({
                    senderPublicKey: publicKey,
                    description: describe,
                    name: name,
                    quantity: quant,
                    decimals: decimals,
                    reissuable: reisssue,
                    timestamp: timestamp,
                    fee: fee
                })
            }).toThrow()
        }
    )

    it("Signature of Issue Token", () => {
        const tx = createTx(sender.publicKey, 1000, 2, true)
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
        const tx = createTx(sender.publicKey, 1000, 2, true)

        tx.sign(sender.privateKey)
        const x = await tx.broadcast()

        expect(x.isSuccess).toEqual(false)
    })
})
