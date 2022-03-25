import { IBlock } from "./block.types"
import axios from "axios"

/*
* This function get blockchain `height` e return a full block
*/
export async function blockByHeight(height: number):Promise<IBlock>  {

        const response = await axios.get(`https://lunesnode.lunes.io/blocks/at/${height}`);
        return response.data;

}

/*
* This function get a blockchain height
*/
export async function blockHeight():Promise<any> {

        const response = await axios.get(`https://lunesnode.lunes.io/blocks/height`);
        //return response.data;
        return response.data;

}

/*
* Average delay in milliseconds between last blockNum blocks starting from block with signature
    signature = signature block
    blockNum = 1 to 9
*/

export async function blockAverageDelay(signature: string, blockNum: number):Promise<any> {
        const response = await axios.get(`https://lunesnode.lunes.io/blocks/delay/${signature}/${blockNum}`);
        return response.data;
}

/*
* Get block at specified heights
*/
//GET /blocks/seq/{from}/{to}
export async function blockSeq(from: number , to: number):Promise<IBlock> {
    const response = await axios.get(`https://lunesnode.lunes.io/blocks/seq/${from}/${to}`);
    return response.data;
}


/*
* Get last block data
*/
export async function blockLast():Promise<any> {
    const response = await axios.get(`https://lunesnode.lunes.io/blocks/last`);
    return response.data;
}

/*
* Get children of specified block
*/
export async function blockChild(signature: string):Promise<IBlock> {
    const response = await axios.get(`https://lunesnode.lunes.io/blocks/child/${signature}`);
    return response.data;
}


/*
* Get height of a block by its Base58-encoded signature
*/
export async function blockHeightEncoded(signature: string):Promise<any> {
    const response = await axios.get(`https://lunesnode.lunes.io/blocks/height/${signature}`);
    return response.data;
}


/*
* Get block at specified height without transactions payload
*/
export async function blockAtHeaderOnly(height: number):Promise<IBlock> {
    const response = await axios.get(`https://lunesnode.lunes.io/blocks/headers/at/${height}`);
    return response.data;
}


