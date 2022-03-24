import { IBlock } from "./block.types"
import axios from "axios"

/*
* This function get `height` e return a full block
*/
export async function blockByHeight(height: number):Promise<IBlock>  {
    
        const response = await axios.get(`https://lunesnode.lunes.io/blocks/at/${height}`);
        return response.data;

}



//https://lunesnode.lunes.io/blocks/at/10
//https://lunesnode.lunes.io/blocks/at/$height

// fazer o fetch
// pegar o data 
// converter ou pegar o iblock da resposta

// explicação do andré vioto 

// fazer uma requisição
