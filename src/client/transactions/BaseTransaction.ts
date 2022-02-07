export interface BaseTransaction {
    transaction(): object
    sign(): object
    ready(): boolean
    send(): object
}
