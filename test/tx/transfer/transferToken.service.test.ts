import lunesjs from "../../../src/index"

describe("Test Transfer Token", () => {
    const sender = lunesjs.walletFactory({
        privateKey: "8YMbX5BCQdazwgdVfeUpKuoUJrmYpMyGVAGAsNaHVj1u"
    })

    const receiver = lunesjs.walletFactory({
        privateKey: "G6E2xNBWtsRG8XBDmeTQQxZNHHUa6K9dnc9KrYtKyGwM"
    })

    const createTx = (publicKey: string, address: string, value: number) => {
        return lunesjs.transferTokenFactory({
            senderPublicKey: publicKey,
            receiverAddress: address,
            amount: value,
            timestamp: 1649980377489
        })
    }

    it("Test Create Transfer Token", () => {
        const tx = createTx(sender.publicKey, receiver.address, 1000)
        expect(tx.transaction()).toEqual({
            senderPublicKey: "2ti1GM7F7J78J347fqSWSVocueDV3RSCFkLSKqmhk35Z",
            recipient: "37xRcbn1LiT1Az4REoLhjpca93jPG1gTEwq",
            sender: "37tQRv7x2RHd32Ss2i1EFTWSTSsqkwXcaBe",
            timestamp: 1649980377489,
            signature: "",
            amount: Math.floor(1000 * 10e7),
            feeAsset: "",
            assetId: "",
            fee: 100000,
            type: 4
        })
    })
    test.each([
        {
            sender: lunesjs.walletFactory({ chain: 0 }),
            receiver: lunesjs.walletFactory({ chain: 0 }),
            amount: 0,
            timestamp: 1483228801,
            fee: 100000,
            test: "testing amount"
        },
        {
            sender: lunesjs.walletFactory({ chain: 1 }),
            receiver: lunesjs.walletFactory({ chain: 1 }),
            amount: 1,
            timestamp: 1483228799,
            fee: 100000,
            test: "testing timestamp"
        },
        {
            sender: lunesjs.walletFactory({ chain: 1 }),
            receiver: lunesjs.walletFactory({ chain: 1 }),
            amount: 1,
            timestamp: 1483228800,
            fee: 99999,
            test: "testing fee"
        },
        {
            sender: lunesjs.walletFactory({ chain: 0 }),
            receiver: lunesjs.walletFactory({ chain: 1 }),
            amount: 1,
            timestamp: 1483228800,
            fee: 100000,
            test: "testing diff address, Mainnet | Testnet"
        },
        {
            sender: lunesjs.walletFactory({ chain: 1 }),
            receiver: lunesjs.walletFactory({ chain: 0 }),
            amount: 1,
            timestamp: 1483228800,
            fee: 100000,
            test: "testing diff address, Testnet | Mainnet"
        }
    ])(
        "Test Create Ivalid Transfer Token by \n[$test]",
        ({ sender, receiver, amount, timestamp, fee }) => {
            expect(() => {
                lunesjs.transferTokenFactory({
                    senderPublicKey: sender.publicKey,
                    receiverAddress: receiver.address,
                    amount: amount,
                    timestamp: timestamp,
                    fee: fee,
                    chain: sender.chain
                })
            }).toThrow()
        }
    )

    it("Test Signature of Transfer Token", () => {
        const tx = createTx(sender.publicKey, receiver.address, 1000)
        const sign_tx = tx.sign(sender.privateKey)

        const response = lunesjs.crypto.validateSignature(
            sign_tx.senderPublicKey,
            sign_tx.message,
            sign_tx.signature
        )

        expect(response).toEqual(true)
    })

    it("Test Broadcast of Transfer Token", async () => {
        const sender = lunesjs.walletFactory({ chain: 0 })
        const receiver = lunesjs.walletFactory({ chain: 0 })
        const tx = lunesjs.transferTokenFactory({
            senderPublicKey: sender.publicKey,
            receiverAddress: receiver.address,
            amount: 1000,
            chain: sender.chain
        })

        tx.sign(sender.privateKey)
        const x = await tx.broadcast()

        expect(x.isSuccess).toEqual(false)
    })
})
