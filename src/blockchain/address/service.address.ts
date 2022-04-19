import { IAddress, IAddressError } from "./address.types"

import axios from "axios"

const BASEURL = "https://lunesnode.lunes.io/"

/*
/assets/{asset_id}/distribution
/assets/balance/{address}
assets/balance/{address}/{asset_id}


/leasing/active/{address}

/addresses
/addresses/alias/by-alias/{alias}
/addresses/balance/{address}
addresses/alias/by-address/{address}
/*



/*
 * This function check whether address {address} is valid or not
 * --- validation: {address} : string
 * https://lunesnode.lunes.io/addresses/validate/${address}
 */

export async function validateAddr(
    address: String
): Promise<any | IAddressError> {
    const url = `${BASEURL}addresses/validate/${address}`

    if (typeof address !== "string") {
        const error: IAddressError = {
            status: `error`,
            message: `the type of address cannot different of string`
        }
        return error
    } else {
        const response = await axios.get(url)
        //return response.data
        if (
            response.status === 404 ||
            response.status === 401 ||
            response.status === 403 ||
            response.status === 501
        ) {
            const error: IAddressError = {
                status: `error`,
                message: `system error, come back later`
            }
            return error
        } else if (response.data.valid === false) {
            const error: IAddressError = {
                status: `error`,
                message: `address invalid`
            }
            return error
        } else if (response.status === 200) {
            return response.data
        }
    }

    // const response = await axios.get(url)
    // return response.data
} 

/*
 * This function check Account's balances for all assets
 * --- validation: {address} : string
 * GET /assets/balance/{address}
 */
export async function assetBalance(address: string):  Promise<IAddress | IAddressError>  {
    const url = `${BASEURL}assets/balance/${address}`
 
    if (typeof address !== "string") {
        const error: IAddressError = {
            status: `error`,
            message: `the type of address cannot different of string`
        } 
        return error
    } else {
        const response = await axios.get(url)
       // return response.data
       if (typeof address !== "string") {
        const error: IAddressError = {
            status: `error`,
            message: `the type of address cannot different of string`
        }
        return error
    } else {
        //const response = await axios.get(url)
        //return response.data
        if (
            response.status === 404 ||
            response.status === 401 ||
            response.status === 403 ||
            response.status === 501
        ) {
            const error: IAddressError = {
                status: `error`,
                message: `system error, come back later`
            }
            return error
        } else if (response.status === 400) {
            const error: IAddressError = {
                status: `error`,
                message: `address invalid`
            }
            return error
        } else (response.status === 200) 
            return response.data
        }
        
    }
}


///////teste



//const response = await axios.get(url)
//return response.data

/*
 * This function check Account's balances for all assets
 * --- validation: {address} : string
 * GET /assets/balance/{address}

export async function assetBalance(address: String):  Promise<any>  {
    
}
 */

/*
/assets/{asset_id}/distribution
/assets/balance/{address}
assets/balance/{address}/{asset_id}
*/

/*
 * This function check whether address {address} is valid or not
 * --- validation: {address} : string
 * 


export async function validateAddr(address:String):  Promise<any>  {
    
}
 */
