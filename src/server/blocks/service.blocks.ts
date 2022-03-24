import { IBlock } from "./block.types"
import axios from "axios"

/*
* This function get `height` e return a full block
*/
export async function blockByHeight(height: number):Promise<IBlock>  {

        const response = await axios.get(`https://lunesnode.lunes.io/blocks/at/${height}`);
        return response.data;

}

export async function blockHeight():Promise<any> {

        const response = await axios.get(`https://lunesnode.lunes.io/blocks/height`);
        return response.data;

}

