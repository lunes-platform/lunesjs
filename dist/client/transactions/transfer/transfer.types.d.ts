export interface ITransfer {
    senderPublicKey: string;
    timestamp: number;
    signature: string;
    recipient: string;
    feeAsset: string;
    assetId: string;
    amount: number;
    sender: string;
    type: number;
    fee: number;
}
