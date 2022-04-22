import { blocks } from "./blocks/service.blocks"
import axios from "axios"

export const lunesNode = axios.create({
    baseURL: "https://lunesnode.lunes.io",
    timeout: 2000
})

export const blockchain = {
    blocks
}
