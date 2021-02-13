import faunadb, { query as q } from 'faunadb'
import { BaseModel } from './models/baseModel'
import { FaunaDocumentResponse } from './models/faunaResponse'

type ForestClientArgs = {
    client: faunadb.Client
}

type QueryIndexOptions = {
    getData: boolean
}

class ForestClient {
    private clientArgs: ForestClientArgs
    constructor(clientArgs: ForestClientArgs) {
        this.clientArgs = clientArgs
    }

    async create<T>(baseModel: BaseModel, doc: T): Promise<FaunaDocumentResponse<T>> {
        const data = await baseModel.schema.validate(doc)
        const rawFaunaResponse: FaunaDocumentResponse<T> = await this.clientArgs.client.query(
            q.Create(
                q.Collection(baseModel.collection),
                { data },
            )
        )
        return rawFaunaResponse
    }

    async delete<T>(baseModel: BaseModel, id: string): Promise<FaunaDocumentResponse<T>> {
        const deletedDocument: FaunaDocumentResponse<T> = await this.clientArgs.client.query(
            q.Delete(
                q.Ref(
                    q.Collection(baseModel.collection),
                    id
                )
            )
        )

        return deletedDocument
    }

    async queryByIndex<T>(index: string, terms: any[], opts?: QueryIndexOptions): Promise<FaunaDocumentResponse<T>[] | [{ ref: any }]> {
        let faunaQuery = q.Paginate(
            q.Match(
                q.Index(index),
                terms.length > 1 ? terms : terms[0]
            )
        )
        if (opts) {
            if (opts.getData) {
                faunaQuery = q.Map(
                    faunaQuery,
                    q.Lambda('X', q.Get(q.Var('X')))
                )
            }
        }
        const documents = await this.clientArgs.client.query(faunaQuery)
        return documents as any
    }
    
    async findById<T>(baseModel: BaseModel, id: string): Promise<FaunaDocumentResponse<T>> {
        
        const document: FaunaDocumentResponse<T> = await this.clientArgs.client.query(
            q.Get(
                q.Ref(
                    q.Collection(baseModel.collection),
                    id
                )
            )
        )

        return document
    }
}

export { BaseModel, ForestClient, FaunaDocumentResponse }
