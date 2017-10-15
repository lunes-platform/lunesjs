import { IHash, IKeyPair } from '../../../interfaces';

import v1Info from './v1/info';
import v1Orderbooks from './v1/orderbooks';


export interface IMatcherAPIv1 {
    getMatcherKey(): Promise<any>;
    getOrderbooks(): Promise<any>;
    getOrderbook(assetOne: string, assetTwo: string): Promise<any>;
    // createOrder(data: IHash<any>, keyPair: IKeyPair): IHash<any>;
    // cancelOrder(data: IHash<any>, keyPair: IKeyPair): IHash<any>;
    // deleteOrder(data: IHash<any>, keyPair: IKeyPair): IHash<any>;
}

export const v1: IMatcherAPIv1 = {
    getMatcherKey: v1Info.getMatcherKey,
    getOrderbooks: v1Orderbooks.getOrderbooks,
    getOrderbook: v1Orderbooks.getOrderbook
};
