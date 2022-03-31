import { IBlockError } from "../../../src/server/blocks/block.types"
import { blockByHeight } from "../../../src/server/blocks/service.blocks"

describe("test block service - validation errors", () => {
    it("blockbyHeight - block testing error, passing -1 number", async () => {
        // const result = await blockByHeight(-1);
        // expect(result).toEqual(1);
        // expect().toEqual(error);
        // try {
        const result = await blockByHeight(-1)
        //} catch (error) {
        //   console.log(error)
        //expect(error).toEqual('s');
        // expect(error).toBeInstanceOf(error)
        // expect(error).toHaveProperty("cilada")
        //}
        expect(result).toEqual({
            mensagem:
                "o bloco não pode ser menor ou igual a zero ou maior ou igual 2147483647 ",
            status: "erro"
        })
        expect(result).toMatchObject({
            mensagem: expect.any(String)
        })
    })


    it("blockbyHeight - block testing error, passing i32Max ", async () => {
        const result = await blockByHeight(2147483648)

        expect(result).toEqual({
            mensagem:
                "o bloco não pode ser menor ou igual a zero ou maior ou igual 2147483647 ",
            status: "erro"
        })
        expect(result).toMatchObject({
            mensagem: expect.any(String)
        })
    })
})
