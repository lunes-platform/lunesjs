import { IBlock, IBlockError } from "./block.types"
import axios from "axios"

const BASEURL = "https://lunesnode.lunes.io/blocks/"

/*
 * This function get blockchain `height` e return a full block
 * --- validation: zero number, big number and string type
 */

export async function blockByHeight(
    height: number
): Promise<IBlock | IBlockError> {
    const url = `${BASEURL}at/${height}`

    const i32Max = 2147483647

    if (height <= 0 || height >= i32Max) {
        const error: IBlockError = {
            status: `error`,
            message: `the block cannot be less than or equal to zero or greater than or equal 2147483647`
        }
        return error
    } else if (typeof height === "string") {
        const error: IBlockError = {
            status: `error`,
            message: `block cannot receive string type `
        }
        return error
    } else {
        return new Promise(async (resolve, reject) => {
            const response = await axios.get(url)
            if (response.status === 200) {
                resolve(response.data)
            } else {
                reject(response.data)
            }
        })
    }
}

/*
 * This function get a blockchain height
 */
export async function blockHeight(): Promise<any | IBlockError> {
    const url = `${BASEURL}height`

    return new Promise(async (resolve, reject) => {
        const response = await axios.get(url)
        if (
            response.status === 404 ||
            response.status === 401 ||
            response.status === 403 ||
            response.status === 501
        ) {
            const error: IBlockError = {
                status: `error`,
                message: `system error, come back later`
            }
            return error
        } else if (response.status === 200) {
            resolve(response.data)
        } else {
            reject(response.data)
        }
    })
}

/*
 * Average delay in milliseconds between last blockNum blocks starting from block with signature
 * --- signature = signature block - Base58-encoded signature
 * --- blockNum = 1 to 9 - Number of blocks to count delay
 */

export async function blockAverageDelay(
    signature: string,
    blockNum: number
): Promise<any | IBlockError> {
    const url = `${BASEURL}delay/${signature}/${blockNum}`

    if (blockNum <= 0 || blockNum > 9) {
        const error: IBlockError = {
            status: `error`,
            message: `the blockNum cannot be less than or equal to zero or greater than nine`
        }
        return error
    } else {
        //const response = await axios.get(url)
        //return response.data
        return new Promise(async (resolve, reject) => {
            const response = await axios.get(url)
            if (response.status === 200) {
                resolve(response.data)
            } else {
                reject(response.data)
            }
        })
    }
}

/*
 * Get block at specified heights
 * max value (from) (to) 1 - 100 (99 difference)
 * from value < to value
 * `https://lunesnode.lunes.io/blocks/seq/${from}/${to}`
 */

export async function blockSeq(
    from: number,
    to: number
): Promise<IBlock | IBlockError> {
    const url = `${BASEURL}seq/${from}/${to}`
    //`https://lunesnode.lunes.io/blocks/seq/${from}/${to}`
    const Max: boolean = to - from < 100

    if (from > to || Max === false) {
        const error: IBlockError = {
            status: `error`,
            message: `Too big sequences requested OR {from} cannot be bigger than {to}, change it`
        }
        return error
    } else {
        const response = await axios.get(url)
        return response.data
    }
}

/*
 * Get last block data
 */
export async function blockLast(): Promise<any | IBlockError> {
    const url = `${BASEURL}last`
    return new Promise(async (resolve, reject) => {
        const response = await axios.get(url)
        if (
            response.status === 404 ||
            response.status === 401 ||
            response.status === 403 ||
            response.status === 501
        ) {
            const error: IBlockError = {
                status: `error`,
                message: `system error, come back later`
            }
            return error
        } else if (response.status === 200) {
            resolve(response.data)
        } else {
            reject(response.data)
        }
        //`https://lunesnode.lunes.io/blocks/last
        //const response = await axios.get(url)
        //return response.data
    })
}

/*
 * Get children of specified block
 */
export async function blockChild(
    signature: string
): Promise<IBlock | IBlockError> {
    const url = `${BASEURL}child/${signature}`
    return new Promise(async (resolve, reject) => {
        const response = await axios.get(url)

        if (response.status === 404) {
            const error: IBlockError = {
                status: `error`,
                message: `block does not exist, try later`
            }
            return error
        } else if (response.status === 200) {
            resolve(response.data)
        } else {
            reject(response.data)
        }
    })
}

/*
 * Get height of a block by its Base58-encoded signature
 */
export async function blockHeightEncoded(
    signature: string
): Promise<any | IBlockError> {
    const url = `${BASEURL}height/${signature}`
    return new Promise(async (resolve, reject) => {
        const response = await axios.get(url)

        if (response.status === 404) {
            const error: IBlockError = {
                status: `error`,
                message: `block does not exist, try later`
            }
            return error
        } else if (response.status === 200) {
            resolve(response.data)
        } else {
            reject(response.data)
        }
    })
}

/*
 * Get block at specified height without transactions payload
 */
export async function blockAtHeaderOnly(
    height: number
): Promise<IBlock | IBlockError> {
    const url = `${BASEURL}headers/at/${height}`

    if (typeof height === "string") {
        const error: IBlockError = {
            status: `error`,
            message: `block cannot receive string type `
        }
        return error
    } else {
        return new Promise(async (resolve, reject) => {
            const response = await axios.get(url)

            if (response.status === 404) {
                const error: IBlockError = {
                    status: `error`,
                    message: `The requested resource could not be found but may be available again in the future, try later`
                }
                return error
            } else if (response.status === 200) {
                resolve(response.data)
            } else {
                reject(response.data)
            }
        })
    }
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
