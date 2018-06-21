import { IWavesBasicConfig, IWavesConfig } from '../interfaces';

import { TRANSACTION_TYPE, TRANSACTION_TYPE_NUMBER, TRANSACTION_TYPE_VERSION } from '@waves/waves-signature-generator';


export const WAVES = 'WAVES';

export const MAINNET_BYTE: number = 'W'.charCodeAt(0);
export const TESTNET_BYTE: number = 'T'.charCodeAt(0);

export const INITIAL_NONCE = 0;

export const ADDRESS_BYTE = 1;
export const ALIAS_BYTE = 2;

export const ISSUE_TX = TRANSACTION_TYPE_NUMBER.ISSUE;
export const TRANSFER_TX = TRANSACTION_TYPE_NUMBER.TRANSFER;
export const REISSUE_TX = TRANSACTION_TYPE_NUMBER.REISSUE;
export const BURN_TX = TRANSACTION_TYPE_NUMBER.BURN;
export const EXCHANGE_TX = TRANSACTION_TYPE_NUMBER.EXCHANGE;
export const LEASE_TX = TRANSACTION_TYPE_NUMBER.LEASE;
export const CANCEL_LEASING_TX = TRANSACTION_TYPE_NUMBER.CANCEL_LEASING;
export const CREATE_ALIAS_TX = TRANSACTION_TYPE_NUMBER.CREATE_ALIAS;
export const MASS_TRANSFER_TX = TRANSACTION_TYPE_NUMBER.MASS_TRANSFER;
export const DATA_TX = TRANSACTION_TYPE_NUMBER.DATA;
export const SET_SCRIPT_TX = TRANSACTION_TYPE_NUMBER.SET_SCRIPT;
export const SPONSORSHIP_TX = TRANSACTION_TYPE_NUMBER.SPONSORSHIP;

export const ISSUE_TX_VERSION = TRANSACTION_TYPE_VERSION.ISSUE;
export const TRANSFER_TX_VERSION = TRANSACTION_TYPE_VERSION.TRANSFER;
export const REISSUE_TX_VERSION = TRANSACTION_TYPE_VERSION.REISSUE;
export const BURN_TX_VERSION = TRANSACTION_TYPE_VERSION.BURN;
export const EXCHANGE_TX_VERSION = TRANSACTION_TYPE_VERSION.EXCHANGE;
export const LEASE_TX_VERSION = TRANSACTION_TYPE_VERSION.LEASE;
export const CANCEL_LEASING_TX_VERSION = TRANSACTION_TYPE_VERSION.CANCEL_LEASING;
export const CREATE_ALIAS_TX_VERSION = TRANSACTION_TYPE_VERSION.CREATE_ALIAS;
export const MASS_TRANSFER_TX_VERSION = TRANSACTION_TYPE_VERSION.MASS_TRANSFER;
export const DATA_TX_VERSION = TRANSACTION_TYPE_VERSION.DATA;
export const SET_SCRIPT_TX_VERSION = TRANSACTION_TYPE_VERSION.SET_SCRIPT;
export const SPONSORSHIP_TX_VERSION = TRANSACTION_TYPE_VERSION.SPONSORSHIP;

export const ISSUE_TX_NAME = TRANSACTION_TYPE.ISSUE;
export const TRANSFER_TX_NAME = TRANSACTION_TYPE.TRANSFER;
export const REISSUE_TX_NAME = TRANSACTION_TYPE.REISSUE;
export const BURN_TX_NAME = TRANSACTION_TYPE.BURN;
export const EXCHANGE_TX_NAME = TRANSACTION_TYPE.EXCHANGE;
export const LEASE_TX_NAME = TRANSACTION_TYPE.LEASE;
export const CANCEL_LEASING_TX_NAME = TRANSACTION_TYPE.CANCEL_LEASING;
export const CREATE_ALIAS_TX_NAME = TRANSACTION_TYPE.CREATE_ALIAS;
export const MASS_TRANSFER_TX_NAME = TRANSACTION_TYPE.MASS_TRANSFER;
export const DATA_TX_NAME = TRANSACTION_TYPE.DATA;
export const SET_SCRIPT_TX_NAME = TRANSACTION_TYPE.SET_SCRIPT;
export const SPONSORSHIP_TX_NAME = TRANSACTION_TYPE.SPONSORSHIP;

export const PRIVATE_KEY_LENGTH = 32;
export const PUBLIC_KEY_LENGTH = 32;

export const MINIMUM_FEE = 100000;
export const MINIMUM_ISSUE_FEE = 100000000;
export const MINIMUM_MATCHER_FEE = 300000;
export const MINIMUM_DATA_FEE_PER_KB = 100000;

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
    nodeAddress: 'https://nodes.wavesplatform.com',
    matcherAddress: 'https://matcher.wavesplatform.com'
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

export const BROADCAST_PATH = '/transactions/broadcast';
