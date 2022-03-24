import { IBlock } from "./block.types"


/*
* This function get `height` e return a full block
*/
function blockByHeight(height: number): IBlock {
    return fetch(
        "url",
        "GET"
    ).json()
}

// fazer o fetch
// pegar o data 
// converter ou pegar o iblock da resposta

// explicação do andré vioto 
