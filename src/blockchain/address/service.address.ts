import { IAddressError } from "./address.types"

import axios from "axios"


const BASEURL = "https://lunesnode.lunes.io/addresses/"

/*
 * This function get wallet accounts addresses
 * --- validation: {from} {to}
 *
 */




/*
 * This function check whether address {address} is valid or not
 * --- validation: {address} : string
 * https://lunesnode.lunes.io/addresses/validate/${address}
 */

export async function validateAddr(
    address: String
): Promise<any | IAddressError> {
    const url = `${BASEURL}validate/${address}`

    if (typeof address !== "string") {
        const error: IAddressError = {
            status: `error`,
            message: `the type of address cannot different of string`
        }
        return error
    } else   {
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
        } else if (response.data.valid === false){ 
            const error: IAddressError = {
                status: `error`,
                message: `address invalid`
            }
            return error

        } else if(response.status === 200) {return response.data}
    
    
    }

    // const response = await axios.get(url)
    // return response.data
}



/*
 * This function check whether address {address} is valid or not
 * --- validation: {address} : string
 * 


export async function validateAddr(address:String):  Promise<any>  {
    
}
 */
