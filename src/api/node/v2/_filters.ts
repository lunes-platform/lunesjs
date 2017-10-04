import * as constants from '../../../constants';


const transactionTypes = {
    [constants.ISSUE_TX_NAME]: constants.ISSUE_TX,
    [constants.TRANSFER_TX_NAME]: constants.TRANSFER_TX,
    [constants.REISSUE_TX_NAME]: constants.REISSUE_TX,
    [constants.BURN_TX_NAME]: constants.BURN_TX,
    [constants.EXCHANGE_TX_NAME]: constants.EXCHANGE_TX,
    [constants.LEASE_TX_NAME]: constants.LEASE_TX,
    [constants.CANCEL_LEASING_TX_NAME]: constants.CANCEL_LEASING_TX,
    [constants.CREATE_ALIAS_TX_NAME]: constants.CREATE_ALIAS_TX
};


export default {

    transactionType(typeName) {
        return (item) => item.type && item.type === transactionTypes[typeName];
    },

    transactionSender(sender) {
        return (item) => item.sender && item.sender === sender;
    },

    transactionRecipient(recipient) {
        return (item) => item.recipient && item.recipient === recipient;
    }

};
