import { IAssetObject, IWavesBasicConfig, IWavesConfig } from '../interfaces';


export const WAVES = 'WAVES';
export const WAVES_PROPS: IAssetObject = {
    id: WAVES,
    name: 'Waves',
    precision: 8,
    description: ''
};

export const MAINNET_BYTE: number = 'W'.charCodeAt(0);
export const TESTNET_BYTE: number = 'T'.charCodeAt(0);

export const INITIAL_NONCE = 0;

export const ADDRESS_VERSION = 1;
export const ALIAS_VERSION = 2;

export const ISSUE_TX = 3;
export const TRANSFER_TX = 4;
export const REISSUE_TX = 5;
export const BURN_TX = 6;
export const EXCHANGE_TX = 7;
export const LEASE_TX = 8;
export const CANCEL_LEASING_TX = 9;
export const CREATE_ALIAS_TX = 10;
export const MASS_TRANSFER_TX = 11;

export const ISSUE_TX_NAME = 'issue';
export const TRANSFER_TX_NAME = 'transfer';
export const REISSUE_TX_NAME = 'reissue';
export const BURN_TX_NAME = 'burn';
export const EXCHANGE_TX_NAME = 'exchange';
export const LEASE_TX_NAME = 'lease';
export const CANCEL_LEASING_TX_NAME = 'cancelLeasing';
export const CREATE_ALIAS_TX_NAME = 'createAlias';
export const MASS_TRANSFER_TX_NAME = 'massTransfer';

export const PRIVATE_KEY_LENGTH = 32;
export const PUBLIC_KEY_LENGTH = 32;

export const MINIMUM_FEE = 100000;
export const MINIMUM_ISSUE_FEE = 100000000;
export const MINIMUM_MATCHER_FEE = 300000;

export const TRANSFER_ATTACHMENT_BYTE_LIMIT = 140;

export const DEFAULT_MIN_SEED_LENGTH = 25;

export const DEFAULT_ORDER_EXPIRATION_DAYS = 20;

export const DEFAULT_BASIC_CONFIG: IWavesBasicConfig = {
    minimumSeedLength: DEFAULT_MIN_SEED_LENGTH,
    requestOffset: 0,
    requestLimit: 100,
    logLevel: 'warning',
    timeDiff: 0
};

export const DEFAULT_MAINNET_CONFIG: IWavesConfig = {
    ...DEFAULT_BASIC_CONFIG,
    networkByte: MAINNET_BYTE,
    nodeAddress: 'https://nodes.wavesnodes.com',
    matcherAddress: 'https://nodes.wavesnodes.com/matcher'
};

export const DEFAULT_TESTNET_CONFIG: IWavesConfig = {
    ...DEFAULT_BASIC_CONFIG,
    networkByte: TESTNET_BYTE,
    nodeAddress: 'https://testnet1.wavesnodes.com',
    matcherAddress: 'https://testnet1.wavesnodes.com/matcher'
};

export const WAVES_V1_ISSUE_TX = {
    assetId: WAVES,
    decimals: 8,
    description: '',
    fee: 0,
    height: 0,
    id: WAVES,
    name: 'Waves',
    quantity: 100000000 * Math.pow(10, 8),
    reissuable: false,
    sender: WAVES,
    senderPublicKey: '',
    signature: '',
    timestamp: 1460419200000,
    type: ISSUE_TX
};
