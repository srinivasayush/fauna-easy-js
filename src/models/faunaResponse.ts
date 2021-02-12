export interface FaunaResponse<T> {
    ref: any
    ts: number
    data: T
}
