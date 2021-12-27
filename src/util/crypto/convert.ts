import { randomBytes } from "crypto"

const convert = {
    bytesToString: (bytes: bytes): number[] => {
        return bytes.split('').map(convert.ord)
    },
    chr: (intUnicode: number): string => {
        return String.fromCharCode(intUnicode)
    },
    urandom4: (): string => {
        return randomBytes(4).toString("ascii")
    },
    ord: (char: string): number => {
        const index = 0
        return char.charCodeAt(index)
    },
    base58: {
        b58: require('base-x')(
            '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
        ),
        to: (data?: string): string => {
            if (typeof data === "undefined") {
                return ""
            } else {
                return convert.base58.b58.encode(Buffer.from(data))
            }
        },
        from: (data?: string): string => {
            if (typeof data === "undefined") {
                return ""
            } else {
                return convert.base58.b58.decode(data).toString()
            }
        }
    }
}

export default convert