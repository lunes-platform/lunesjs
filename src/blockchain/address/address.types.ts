/*
{
    "address": "387LjpQ5fdBdcY4nRcfDU7gPYdesbc1Md4D",
    "balances": [
      {
        "assetId": "FJL6J61NFWmZksXh3KnZdbN4ZWwgkZkUswWQ1G9DLvUk",
        "balance": 13140000,
        "reissuable": true,
        "quantity": 1000000000000000,
        "issueTransaction": {
          "type": 3,
          "id": "FJL6J61NFWmZksXh3KnZdbN4ZWwgkZkUswWQ1G9DLvUk",
          "sender": "37kGaGFGgzw5E6cr5thLVsxiXHoJSMuso92",
          "senderPublicKey": "EkUV6ihoPtvXKX8q6KhkSasihjxWZcXivBuf4HpN4sRp",
          "fee": 100000000,
          "timestamp": 1529557133065,
          "signature": "5uEUY5JgQ9756RAPCHNStsFNyLGU9pp1kv3q3N2MdwUnYAyzvU7wdtG5MTsKwNmYDvkTUwHP6fjaJqH6rzuCm7NP",
          "assetId": "FJL6J61NFWmZksXh3KnZdbN4ZWwgkZkUswWQ1G9DLvUk",
          "name": "NEO Token",
          "description": "Reward Token for lunesrealnode.com Leasers",
          "quantity": 1000000000000000,
          "decimals": 8,
          "reissuable": true
        }
      }
    ]
  }
*/
interface IIssueTransaction {
    type: number
    id: string
    sender: string
    senderPublicKey: string
    fee: number
    timestamp: number
    signature: string
    assetId: string
    name: string
    description: string
    quantity: number
    decimals: number
    reissuable: boolean
}

interface IBalances {
    assetId: string
    balance: number
    reissuable: boolean
    quantity: number
    issueTransaction: Array<IIssueTransaction>
}

interface IHeader {
    address: string
}

export interface IAddress {
    header: IHeader
    body: Array<IBalances>
}

/*
 * IAddressError : error messages to Address functions
 */
export interface IAddressError {
    status: string
    message: string
}
