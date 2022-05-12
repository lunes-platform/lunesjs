import axios from "axios"

type Lunes = {
    isSuccess: boolean
    response: object
}

export default async function broadcast<T>(
    node: string,
    tx: T
): Promise<Lunes> {
    return new Promise(async (resolve) => {
        axios
            .post(`${node}/transactions/broadcast`, tx)
            .then((res) => {
                resolve({
                    isSuccess: true,
                    response: { ...res.data }
                })
            })
            .catch((erro) => {
                resolve({
                    isSuccess: false,
                    response: {
                        codeError: erro.response.data.error,
                        message: erro.response.data.message
                    }
                })
            })
    })
}
