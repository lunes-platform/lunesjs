import { AxiosResponse } from "axios"

interface INxtConsensus {
    generationSignature: string
    baseTarget: number
}
interface ITransaction {
    senderPublicKey: string
    timestamp: number
    signature: string
    recipient: string
    feeAsset: string
    assetId: string
    amount: number
    sender: string
    type: number
    fee: number
    id: string
}

interface IHeader {
    nxtConsensus: INxtConsensus
    transactionCount: number
    features: Array<number>
    timestamp: number
    reference: string
    generator: string
    signature: string
    blocksize: number
    version: number
    height: number
    fee: number
}

export interface IBlock {
    isSuccess: boolean
    header: IHeader
    body: Array<ITransaction>
}

export interface IBlockError {
    isSuccess: boolean
    response: {
        codeError: number
        message: string
    }
}

export function mountBlock(blockchainResponse: AxiosResponse<any, any>): IBlock {
    let block: IBlock = {
        isSuccess: true,
        header: {
            nxtConsensus: {
                baseTarget: blockchainResponse.data["nxt-consensus"]["base-target"],
                generationSignature:
                blockchainResponse.data["nxt-consensus"]["generation-signature"]
            },
            transactionCount: blockchainResponse.data.transactionCount,
            features: blockchainResponse.data.features != undefined ? blockchainResponse.data.features : [],
            timestamp: blockchainResponse.data.timestamp,
            reference: blockchainResponse.data.reference,
            generator: blockchainResponse.data.generator,
            signature: blockchainResponse.data.signature,
            blocksize: blockchainResponse.data.blocksize,
            version: blockchainResponse.data.version,
            height: blockchainResponse.data.height,
            fee: blockchainResponse.data.fee
        },
        body: blockchainResponse.data.transactions
    }

    return block
}

export function mountErr(blockchainError: string): IBlockError {
    return {
        isSuccess: false,
        response: {
            codeError: 1,
            message: blockchainError
        }
    }
}
