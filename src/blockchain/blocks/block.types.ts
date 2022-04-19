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

export function mountBlock(r: AxiosResponse<any, any>): IBlock {
    let block: IBlock = {
        isSuccess: true,
        header: {
            nxtConsensus: {
                baseTarget: r.data["nxt-consensus"]["base-target"],
                generationSignature:
                    r.data["nxt-consensus"]["generation-signature"]
            },
            transactionCount: r.data.transactionCount,
            features: r.data.features != undefined ? r.data.features : [],
            timestamp: r.data.timestamp,
            reference: r.data.reference,
            generator: r.data.generator,
            signature: r.data.signature,
            blocksize: r.data.blocksize,
            version: r.data.version,
            height: r.data.height,
            fee: r.data.fee
        },
        body: r.data.transactions
    }

    return block
}

export function mountErr(e: string): IBlockError {
    return {
        isSuccess: false,
        response: {
            codeError: 1,
            message: e
        }
    }
}
