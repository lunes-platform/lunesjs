interface BaseTransaction {
    transaction(): object
    ready(): boolean
    send(): object
}