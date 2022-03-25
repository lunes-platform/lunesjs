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
    nxtConsensus: Array<INxtConsensus>
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
    header: IHeader
    body: Array<ITransaction>
}
