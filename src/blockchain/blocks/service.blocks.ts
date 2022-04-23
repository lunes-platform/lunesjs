/**
 * Copyright (c) Lunes Platform  * 
 * Welcome to service.blocs.ts
 * @author Lunes Platform <development@lunes.io>
 * 
 * This source code is licensed under the Apache license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { mountBlock, IBlock, IBlockError, mountErr } from "./block.types"
import { lunesNode } from "../service.blockchain"

/**
 * # This function get blockchain `height` e return a full block
 * {@link byHeight}
 *
 * ## Example
 *
 * ```javascript
 * import * as lunesjs from "lunesjs"
 *
 * const block = lunesjs.blockchain.blocks.byHeight(10)
 * ```
 * @param {number} height - number of block in blockchain
 * should be greater than 0 and less than 2147483647
 * @returns Promise<IBlock | IBlockError>
 */
async function byHeight(height: number): Promise<IBlock | IBlockError> {
    const i32Max = 2147483647

    if (height <= 0 || height >= i32Max) {
        const error: IBlockError = {
            isSuccess: false,
            response: {
                codeError: -1,
                message: `the block cannot be less than or equal to zero or greater than or equal 2147483647`
            }
        }
        return error
    } else {
        lunesNode.interceptors.response.use(
            (blockchainResponse) => {
                return Promise.resolve(mountBlock(blockchainResponse))
            },
            (blockchainError) => {
                console.log(blockchainError)
                return Promise.resolve(mountErr(blockchainError))
            }
        )
        return lunesNode.get(`/blocks/at/${height}`)
    }
}


// /**
//  * # This function get a blockchain actual height
//  * {@link actualHeight} 
//  * 
//  *  ## Example
//  *
//  * ```javascript
//  * import * as lunesjs from "lunesjs"
//  *
//  * const block = lunesjs.blockchain.blocks.actualHeight()
//  * ```
//  *
//  * If server off line, return error
//  * @returns Promise<any | IBlockError> .
//  */
// export async function actualHeight(): Promise<number | IBlockError> {

//     lunesNode.interceptors.response.use(
//         (r) => {
//             return Promise.resolve(r.data.height)
//         },
//         (blockchainError) => {
//             console.log(blockchainError)
//             return Promise.resolve(mountErr(blockchainError))
//     })
//     return lunesNode.get(`/blocks/height`)
// }
/*   return new Promise(async (resolve) => {
        axios
            .get(url)
            .then((r) => {
                resolve(r.data.height)
            })
            .catch(() => {
                resolve(-1)
            })
    })
*/


/**
 * # Average delay in milliseconds between last blockNum blocks starting from block with signature
 * {@link blockAverageDelay}
 *
 * ## Example
 *
 * ```javascript
 * import * as lunesjs from "lunesjs"
 *
 * const block = lunesjs.blockchain.blocks.blockaverageDelay("dsfs112", 1)
 * ```
 * @type {signature: string, blockNum: number }
 * 
 *  --- signature = signature block - Base58-encoded signature
 *
 *  --- blockNum = 1 to 9 - Number of blocks to count delay
 * @returns Promise<IBlock | IBlockError>
 */
export async function blockAverageDelay(
    signature: string,
    blockNum: number
): Promise<number | IBlockError> {

    if (blockNum <= 0 || blockNum > 9) {
        const error: IBlockError = {
            isSuccess: false,
            response: {
                codeError: -1,
                message: `the blockNum cannot be less than or equal to zero or greater than nine`
            }
        }
        return error
    } else {
        lunesNode.interceptors.response.use(
            (r) => {
                return Promise.resolve(r.data.delay)
            },
            (blockchainError) => {
                console.log(blockchainError)
                return Promise.resolve(mountErr(blockchainError))
            }
        )
        return lunesNode.get(`/blocks/delay/${signature}/${blockNum}`)
    }
}







/**
 * # This function Get block at specified heights
 * {@link blockSeq}
 *
 * ## Example
 *
 * ```javascript
 * import * as lunesjs from "lunesjs"
 *
 * const block = lunesjs.blockchain.blocks.blockaverageDelay("dsfs112", 1)
 * ```
 * @type {from: number, to: number}
 * 
 * validation: max value (from) (to) 1 - 100 (99 difference)
 *
 * from value < to value
 * @returns Promise<any | IBlockError>
 */
export async function blockSeq(
    from: number,
    to: number
): Promise<any | IBlockError> {
    //const url = `${BASEURL}seq/${from}/${to}`
    //`https://lunesnode.lunes.io/blocks/seq/${from}/${to}`
    const Max: boolean = to - from < 100

    if (from > to || Max === false) {
        const error: IBlockError = {
            isSuccess: false,
            response: {
                codeError: -1,
                message: `Too big sequences requested OR {from} cannot be bigger than {to}, change it`
            }
        }
        return error
    } else {

        lunesNode.interceptors.response.use(
            (blockchainResponse) => {
                return Promise.resolve(mountBlock(blockchainResponse))
            },
            (blockchainError) => {
                console.log(blockchainError)
                return Promise.resolve(mountErr(blockchainError))
            }
        )
        return lunesNode.get(`/blocks/seq/${from}/${to}`)

    }
}







// /**
//  * # This function Get last block data
//  *
//  * If server off line, return error
//  *
//  * @returns Promise<IBlock | IBlockError> {@link blockLast} , no params.
//  */
// export async function blockLast(): Promise<IBlock | IBlockError> {
//     const url = `${BASEURL}last`

//     return new Promise(async (resolve) => {
//         axios
//             .get(url)
//             .then((blockchainResponse) => {
//                 resolve(mountBlock(blockchainResponse))
//             })
//             .catch((blockchainError) => {
//                 resolve(mountErr(blockchainError))
//             })
//     })
// }

// /**
//  * # This function Get children of specified block
//  *
//  * @type {signature: string}
//  * validation: string
//  *
//  * @returns Promise<IBlock | IBlockError> {@link blockChild} containing the parameter signature.
//  */
// export async function blockChild(
//     signature: string
// ): Promise<IBlock | IBlockError> {
//     const url = `${BASEURL}child/${signature}`

//     return new Promise(async (resolve) => {
//         axios
//             .get(url)
//             .then((blockchainResponse) => {
//                 resolve(mountBlock(blockchainResponse))
//             })
//             .catch((blockchainError) => {
//                 resolve(mountErr(blockchainError))
//             })
//     })
// }

// /**
//  * # This function Get height of a block by its Base58-encoded signature
//  *
//  * @type {signature: string}
//  * validation: string
//  *
//  * @returns Promise<any | IBlockError> {@link blockHeightEncoded} containing the parameter signature.
//  */
// export async function blockHeightEncoded(
//     signature: string
// ): Promise<any | IBlockError> {
//     const url = `${BASEURL}height/${signature}`
//     return new Promise(async (resolve) => {
//         axios
//             .get(url)
//             .then((response) => {
//                 resolve(response.data)
//             })
//             .catch((blockchainError) => {
//                 resolve(mountErr(blockchainError))
//             })
//     })
// }

// /**
//  * # This function Get block at specified height without transactions payload
//  *
//  * @type {height: number}
//  * validation: number
//  *
//  * @returns Promise<IBlock | IBlockError> {@link blockAtHeaderOnly} containing the parameter height.
//  */
// export async function blockAtHeaderOnly(
//     height: number
// ): Promise<IBlock | IBlockError> {
//     const url = `${BASEURL}headers/at/${height}`

//     if (typeof height === "string") {
//         const error: IBlockError = {
//             isSuccess: false,
//             response: {
//                 codeError: -1,
//                 message: `block cannot receive string type `
//             }
//         }
//         return error
//     } else {
//         return new Promise(async (resolve) => {
//             axios
//                 .get(url)
//                 .then((blockchainResponse) => {
//                     resolve(mountBlock(blockchainResponse))
//                 })
//                 .catch((blockchainError) => {
//                     resolve(mountErr(blockchainError))
//                 })
//         })
//     }
// }

// /**
//  * # This function Get block without transactions payload at specified heights
//  *
//  * @type {from: number, to: number}
//  * validation:
//  *
//  * max value (from) (to) 1 - 100 (99 difference)
//  *
//  * from value < to value
//  *
//  * @returns Promise<any | IBlockError> {@link blockSeqHeaderOnly} containing the params from and to.
//  */
// export async function blockSeqHeaderOnly(
//     from: number,
//     to: number
// ): Promise<any | IBlockError> {
//     const url = `${BASEURL}headers/seq/${from}/${to}`

//     const Max: boolean = to - from < 100

//     if (from > to || Max === false) {
//         const error: IBlockError = {
//             isSuccess: false,
//             response: {
//                 codeError: -1,
//                 message: `Too big sequences requested OR {from} cannot be bigger than {to}, change it`
//             }
//         }
//         return error
//     } else {
//         return new Promise(async (resolve) => {
//             axios
//                 .get(url)
//                 .then((r) => {
//                     resolve(r.data)
//                 })
//                 .catch((blockchainError) => {
//                     resolve(mountErr(blockchainError))
//                 })
//         })
//         // const response = await axios.get(url)
//         // return response.data
//     }
// }

// /**
//  * # Get last block data without transactions payload
//  *
//  * If server off line, return error
//  *
//  * @returns Promise<IBlock | IBlockError> {@link blockLastHeaderOnly} .
//  */
// export async function blockLastHeaderOnly(): Promise<IBlock | IBlockError> {
//     const url = `${BASEURL}headers/last`

//     return new Promise(async (resolve) => {
//         axios
//             .get(url)
//             .then((blockchainResponse) => {
//                 resolve(mountBlock(blockchainResponse))
//             })
//             .catch((blockchainError) => {
//                 resolve(mountErr(blockchainError))
//             })
//     })
// }

// /**
//  * # Get block by a specified Base58-encoded signature
//  *
//  * If server off line, return error
//  *
//  * @returns Promise<IBlock | IBlockError> {@link blockSignature} .
//  */
// export async function blockSignature(
//     signature: string
// ): Promise<IBlock | IBlockError> {
//     const url = `${BASEURL}signature/${signature}`

//     return new Promise(async (resolve) => {
//         axios
//             .get(url)
//             .then((blockchainResponse) => {
//                 resolve(mountBlock(blockchainResponse))
//             })
//             .catch((blockchainError) => {
//                 resolve(mountErr(blockchainError))
//             })
//     })
// }

// /**
//  * # Get genesis block data
//  *
//  * If server off line, return error
//  *
//  * @returns Promise<IBlock | IBlockError> {@link bblockFirst} .
//  */
// export async function blockFirst(): Promise<IBlock | IBlockError> {
//     const url = `${BASEURL}first`

//     return new Promise(async (resolve) => {
//         axios
//             .get(url)
//             .then((blockchainResponse) => {
//                 resolve(mountBlock(blockchainResponse))
//             })
//             .catch((blockchainError) => {
//                 resolve(mountErr(blockchainError))
//             })
//     })
// }

// /**
//  * # This function Get list of blocks generated by specified address
//  *
//  * @type {address: string, from: number, to: number}
//  *
//  * @returns Promise<any | IBlockError> {@link blockAddress} containing the params address, from and to.
//  */
// export async function blockAddress(
//     address: string,
//     from: number,
//     to: number
// ): Promise<any | IBlockError> {
//     const url = `${BASEURL}address/${address}/${from}/${to}`

//     const Max: boolean = to - from < 100

//     if (from > to || Max === false) {
//         const error: IBlockError = {
//             isSuccess: false,
//             response: {
//                 codeError: -1,
//                 message: `Too big sequences requested OR {from} cannot be bigger than {to}, change it`
//             }
//         }
//         return error
//     } else {
//         return new Promise(async (resolve) => {
//             axios
//                 .get(url)
//                 .then((response) => {
//                     resolve(response.data)
//                 })
//                 .catch((blockchainError) => {
//                     resolve(mountErr(blockchainError))
//                 })
//         })
//     }
// }

//export const blocks = {
//    byHeight, actualHeight
//    return new Promise(async (resolve) => {
//             axios
//                 .get(url)
//                 .then((response) => {
//                     resolve(response.data)
//                 })
//                 .catch((blockchainError) => {
//                     resolve(mountErr(blockchainError))
//                 })
//         })
//     }
// }

export const blocks = {
    byHeight, blockAverageDelay
}
