import { IBlock } from "./block.types"

/*
 * This function get `height` e return a full block
 */
function blockByHeight(height: number): IBlock {
    return fetch("url", "GET").json()
}
