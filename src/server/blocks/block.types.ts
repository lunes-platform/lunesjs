
interface INxtConsensus {
    baseTarget: number,
    generationSignature: string
}
interface ITransaction {
    type: number,
    id: string,
    sender: string,
    senderPublicKey: string,
    fee: number,
    timestamp: number,
    signature: string,
    recipient: string,
    assetId: string,
    amount: number, 
    feeAsset: string
}

interface IHeader {
    version: number
    timestamp: number,
    reference: string,
    features: Array<any>, // features: string[],
    generator: string,
    signature: string,
    blocksize: number,
    transactionCount: number,
    fee: number,
    height: number
}

export interface IBlock {
    header: IHeader,
    transactions: Array<ITransaction>,
    nxtConsensus: Array<INxtConsensus>
}




const transaction = {
    "type": 4,
    "id": "Eo79FyfgVD6pCdTPAJ6L6KcShV5WircNs16E3rT3V61U",
    "sender": "37u4wcAMHRTZQrNnEovsJchVh9UinEe9jiw",
    "senderPublicKey": "Cf68DPvtX9TaxWn5zbkcPxc277wBxZbJncXdc628RUtc",
    "fee": 100000,
    "timestamp": 1647954374597,
    "signature": "TpMN6pZN2zLcQgZQzzrEE3FynqutZ7cGPhceFUTvczdSkywRhfF71eZS84j4Htt9jC2nngQB3qzirzaWjJzUgCf",
    "recipient": "37uAgCLUyjrzNf2gReck9KmeHK7YG6NXyLW",
    "assetId": null,
    "amount": 190000000000,
    "feeAsset": null
}
const block = {
    "version": 3,
    "timestamp": 1647954354005,
    "reference": "3BueMQfvPxoVDhJHSUTLQAYJsQdfHtYZkcWZa1fZQdgYUzfvk81kffEXiB5Tf1izdLje4kyoWmsjka19XS5i32fg",
    "nxt-consensus": {
        "base-target": 48,
        "generation-signature": "BZKJ1NE2bjKLizDGTDM7n4aQxNFC1Rr5k1vEFaPg4kDA"
    },
    "features": [],
    "generator": "37nX3hdCt1GWeSsAMNFmWgbQWZZhbvBG3mX",
    "signature": "5K2Unr1yDWpzXdRM1UjDFqi9gi2vJQqh8YbCCwRuWRpgyV1zXkBdRp8uD76okrA2MgYNg3TykFSZT7QuQmiv5CXf",
    "blocksize": 379,
    "transactionCount": 1,
    "fee": 100000,
    "transactions": [
        transaction
    ],
    "height": 1885581
}

