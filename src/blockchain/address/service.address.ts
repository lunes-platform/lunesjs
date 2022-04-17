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
 *
 */

export async function validateAddr(address: String): Promise<any> {
    const url = `${BASEURL}validate/${address}`

    const response = await axios.get(url)
    return response.data
}

/*
 * This function check whether address {address} is valid or not
 * --- validation: {address} : string
 * 


export async function validateAddr(address:String):  Promise<any>  {
    
}
 */
