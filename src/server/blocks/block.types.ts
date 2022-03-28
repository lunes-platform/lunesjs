interface ITransaction {
    type: number
    id: string
}

interface IHeader {
    version: number
}

export interface IBlock {
    header: IHeader
    transactions: Array<ITransaction>
}
