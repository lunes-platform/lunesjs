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