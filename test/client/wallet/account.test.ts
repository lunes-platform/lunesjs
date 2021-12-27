import { Account } from "../../../src/client/wallet/account"

describe("Create new account with seed", () => {
    it(`Account with:
            seed -> 'club either print inner layer three detect equip inflict weird post sorry'
            nonce -> '0'
            chain -> 'mainnet'
        must return:
            hashSeed ->  '7UgjVMbGEF5oiFVXcdMC88Qpcvs1EgCVJhaY9eJGRnbqYXNj2U6uFedjpndegGo6bzLZ1t8S5RgRssPomN3f8o1tXYDpjTGZetak'`,
        () => {
            const seed = 'club either print inner layer three detect equip inflict weird post sorry'
            expect(
                new Account({ seed: seed }).hashSeed
            ).toEqual('7UgjVMbGEF5oiFVXcdMC88Qpcvs1EgCVJhaY9eJGRnbqYXNj2U6uFedjpndegGo6bzLZ1t8S5RgRssPomN3f8o1tXYDpjTGZetak')
        })
    it(`Account with:
            seed -> 'club either print inner layer three detect equip inflict weird post sorry'
            nonce -> '0'
            chain -> 'mainnet'
        must return:
            privateKey ->  '3CNVMe7zprSC58s1q2FCNg7fcmW3aghzLB42B1i6quW6'`,
        () => {
            const seed = 'club either print inner layer three detect equip inflict weird post sorry'
            expect(
                new Account({ seed: seed }).privateKey
            ).toEqual('3CNVMe7zprSC58s1q2FCNg7fcmW3aghzLB42B1i6quW6')
        })
    it(`Account with:
            seed -> 'club either print inner layer three detect equip inflict weird post sorry'
            nonce -> '0'
            chain -> 'mainnet'
        must return:
            publicKey ->  '9sfern2XVtm66ydqWDQrVaaC5G4xiopbJZzsUB8Gxfuw'`,
        () => {
            const seed = 'club either print inner layer three detect equip inflict weird post sorry'
            expect(
                new Account({ seed: seed }).publicKey
            ).toEqual('9sfern2XVtm66ydqWDQrVaaC5G4xiopbJZzsUB8Gxfuw')
        })
    it(`Account with:
            seed -> 'club either print inner layer three detect equip inflict weird post sorry'
            nonce -> '0'
            chain -> 'mainnet'
        must return:
            address ->  '37yxGvZEcZmtbeXBTHhw4wWNw255DtBFXbo'`,
        () => {
            const seed = 'club either print inner layer three detect equip inflict weird post sorry'
            expect(
                new Account({ seed: seed }).address
            ).toEqual('37yxGvZEcZmtbeXBTHhw4wWNw255DtBFXbo')
        })
})
