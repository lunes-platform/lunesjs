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

/*{
    "status": "error",
    "details": "No block for this height"
  }
  */

export interface IBlockError {
    status: string
    mensagem: string
}

/*
 export class IError extends Error{

    public readonly status: string;
    public readonly code: number;

    constructor  ( status:string, code:number) {
        super();
        
        this.status = status;
        this.code = code;
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this);
    }

 }
*/

//    super(description);
//Object.setPrototypeOf(this, new.target.prototype);
//Error.captureStackTrace(this);
