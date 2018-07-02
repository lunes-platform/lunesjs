import { IHash, IKeyPair } from '../../../interfaces';

import Info from './info';
import Orderbooks from './orderbooks';


export interface IMatcherAPI {
    getMatcherKey(): Promise<any>;
    getOrderbooks(): Promise<any>;
    getOrderbook(assetOne: string, assetTwo: string): Promise<any>;
    getOrders(assetOne: string, assetTwo: string, keyPair: IKeyPair): Promise<any>;
    getAllOrders(keyPair: IKeyPair): Promise<any>;
    createOrder(data: IHash<any>, keyPair: IKeyPair): IHash<any>;
    cancelOrder(amountAssetId: string, priceAssetId: string, orderId: string, keyPair: IKeyPair): IHash<any>;
    deleteOrder(amountAssetId: string, priceAssetId: string, orderId: string, keyPair: IKeyPair): IHash<any>;
}


export const getMatcherKey = Info.getMatcherKey;
export const getOrderbooks = Orderbooks.getOrderbooks;
export const getOrderbook = Orderbooks.getOrderbook;
export const getOrders = Orderbooks.getOrders;
export const getAllOrders = Orderbooks.getAllOrders;
export const createOrder = Orderbooks.createOrder;
export const cancelOrder = Orderbooks.cancelOrder;
export const deleteOrder = Orderbooks.deleteOrder;
