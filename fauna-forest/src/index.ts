import faunadb, { query as q } from 'faunadb'
import { BaseModel } from './models/baseModel'
import { FaunaDocument } from './models/faunaDocument'

interface ForestClientArgs {
    client: faunadb.Client
}

interface QueryIndexOptions {
    getData: boolean
}

class ForestClient {
    private clientArgs: ForestClientArgs
    constructor(clientArgs: ForestClientArgs) {
        this.clientArgs = clientArgs
    }

    async create<T>(baseModel: BaseModel, doc: T, id?: string): Promise<FaunaDocument<T>> {
        const data = await baseModel.schema.validate(doc)
        const createdDocument: FaunaDocument<T> = await this.clientArgs.client.query(
            q.Create(
                id != null ? q.Ref(
                    q.Collection(baseModel.collection),
                    id,
                ) : q.Collection(baseModel.collection),
                { data },
            )
        )
        return createdDocument
    }

    async delete<T>(baseModel: BaseModel, id: string): Promise<FaunaDocument<T>> {
        const deletedDocument: FaunaDocument<T> = await this.clientArgs.client.query(
            q.Delete(
                q.Ref(
                    q.Collection(baseModel.collection),
                    id
                )
            )
        )

        return deletedDocument
    }

    async update<T>(baseModel: BaseModel, doc: T, id: string): Promise<FaunaDocument<T>> {
        const data = await baseModel.schema.validate(doc)

        const updatedDocument: FaunaDocument<T> = await this.clientArgs.client.query(
            q.Update(
                q.Ref(
                    q.Collection(baseModel.collection),
                    id,
                ),
                { data },
            )
        )
        return updatedDocument
    }

    async queryByIndex<T>(index: string, terms: any[], opts?: QueryIndexOptions): Promise<FaunaDocument<T>[] | [{ ref: any }]> {
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
    
    async findById<T>(baseModel: BaseModel, id: string): Promise<FaunaDocument<T>> {
        
        const document: FaunaDocument<T> = await this.clientArgs.client.query(
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

export { BaseModel, ForestClient, FaunaDocument }
