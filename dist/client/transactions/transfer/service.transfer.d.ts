import { WalletTypes } from "../../wallet/wallet.types";
import { BaseTransaction } from "../BaseTransaction";
import { ITransfer } from "./transfer.types";
declare class TransferToken implements BaseTransaction {
    private tx;
    constructor(tx: ITransfer);
    transaction(): ITransfer;
    sign(privateKey: WalletTypes.PrivateKey): ITransfer;
    send(): Promise<void>;
}
export declare function transferTokenFactory(senderPublicKey: string, recipient: string, amount: number, chain?: WalletTypes.Chain, timestamp?: number, feeAsset?: string, assetId?: string, fee?: number): TransferToken;
export {};
