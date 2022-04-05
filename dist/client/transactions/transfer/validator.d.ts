import { WalletTypes } from "../../wallet/wallet.types";
import { ITransfer } from "./transfer.types";
declare const validator: {
    serialize: (senderPublicKey: string, assetId: string, feeAsset: string, timestamp: number, amount: number, fee: number, recipient: string) => Uint8Array;
    ready: (senderPublicKey: string, recipient: string, amount: number, chain: WalletTypes.Chain) => boolean;
    sign: (privateKey: WalletTypes.PrivateKey, tx: ITransfer) => string;
    send: (tx: ITransfer) => Promise<void>;
};
export default validator;
