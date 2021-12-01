import { Account } from "./client/wallet/account.js";

const w = new Account({
    seed: "foo bar",
    network: "testnet",
    nWords: 19
})

console.log(w)