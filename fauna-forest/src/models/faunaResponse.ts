export type FaunaDocumentResponse<T> = {
    ref: any
    ts: number
    data: T
}
