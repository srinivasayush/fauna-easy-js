export interface FaunaDocument<T> {
    ref: any
    ts: number
    data: T
}
