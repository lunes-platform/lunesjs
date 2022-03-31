import { IBlock, IBlockError } from "./block.types"
import axios from "axios"

const BASEURL = "https://lunesnode.lunes.io/blocks/"

/*
 * This function get blockchain `height` e return a full block
 */
export async function blockByHeight(
    height: number
): Promise<IBlock | IBlockError> {
    const url = `https://lunesnode.lunes.io/blocks/at/${height}`

    //verificar o erro, número negativo, string e retonar o erro!
    //pesquisar tratamento de erros
    //se o número for negativo ou maior que o bloco atual, retorna o erro throw error - estudar try catch - reponse dentor do try, erro dentro do catch
    //promise a partir do axios

    //return await axios.get(url).then(response => response.data).catch(error => error)

    // passar o zero
    // passar numero grande
    // passar número negativo
    // -- FAZER a validação de string
    const i32Max = 2147483647

    if (height <= 0 || height >= i32Max) {
        const error: IBlockError = {
            status: `erro`,
            mensagem: `o bloco não pode ser menor ou igual a zero ou maior ou igual 2147483647 `
        }
        return error
        //throw new  (`Invalid block.`, 404 );
    } else if (typeof height === "string") {
        const error: IBlockError = {
            status: `erro`,
            mensagem: `o bloco não pode receber tipo string `
        }
        return error
    } else {
        return new Promise(async (resolve, reject) => {
            const response = await axios.get(url)
            if (response.status === 200) {
                resolve(response.data)
            } else {
                //reject("deu pau")
                reject(response.data)
            }
        })
    } //

    // return response.data
    // The requested resource could not be found but may be available again in the future.

    //erro 404
}

/*
 * This function get a blockchain height
 */
export async function blockHeight(): Promise<any> {
    const response = await axios.get(`https://lunesnode.lunes.io/blocks/height`)
    //return response.data;
    return response.data
}

/*
* Average delay in milliseconds between last blockNum blocks starting from block with signature
    signature = signature block
    blockNum = 1 to 9
*/

export async function blockAverageDelay(
    signature: string,
    blockNum: number
): Promise<any> {
    const response = await axios.get(
        `https://lunesnode.lunes.io/blocks/delay/${signature}/${blockNum}`
    )
    return response.data
}

/*
 * Get block at specified heights
 */
//GET /blocks/seq/{from}/{to}
export async function blockSeq(from: number, to: number): Promise<IBlock> {
    const response = await axios.get(
        `https://lunesnode.lunes.io/blocks/seq/${from}/${to}`
    )
    return response.data
}

/*
 * Get last block data
 */
export async function blockLast(): Promise<any> {
    const response = await axios.get(`https://lunesnode.lunes.io/blocks/last`)
    return response.data
}

/*
 * Get children of specified block
 */
export async function blockChild(signature: string): Promise<IBlock> {
    const response = await axios.get(
        `https://lunesnode.lunes.io/blocks/child/${signature}`
    )
    return response.data
}

/*
 * Get height of a block by its Base58-encoded signature
 */
export async function blockHeightEncoded(signature: string): Promise<any> {
    const response = await axios.get(
        `https://lunesnode.lunes.io/blocks/height/${signature}`
    )
    return response.data
}

/*
 * Get block at specified height without transactions payload
 */
export async function blockAtHeaderOnly(height: number): Promise<IBlock> {
    const response = await axios.get(
        `https://lunesnode.lunes.io/blocks/headers/at/${height}`
    )
    return response.data
}

/*
 * Get block without transactions payload at specified heights
 */
export async function blockSeqHeaderOnly(
    from: number,
    to: number
): Promise<IBlock> {
    const response = await axios.get(
        `https://lunesnode.lunes.io/blocks/headers/seq/${from}/${to}`
    )
    return response.data
}

/*
 * Get last block data without transactions payload
 */
export async function blockLastHeaderOnly(): Promise<IBlock> {
    const response = await axios.get(
        `https://lunesnode.lunes.io/blocks/headers/last`
    )
    return response.data
}

/*
 * Get block by a specified Base58-encoded signature
 */
export async function blockSignature(signature: string): Promise<IBlock> {
    const response = await axios.get(
        `https://lunesnode.lunes.io/blocks/signature/${signature}`
    )
    return response.data
}

/*
 * Get genesis block data
 */
export async function blockFirst(): Promise<IBlock> {
    const response = await axios.get(`https://lunesnode.lunes.io/blocks/first`)
    return response.data
}

/*
 * Get list of blocks generated by specified address
 */
export async function blockAddress(
    address: string,
    from: number,
    to: number
): Promise<any> {
    const response = await axios.get(
        `https://lunesnode.lunes.io/blocks/address/${address}/${from}/${to}`
    )
    return response.data
}
