import faunadb, { query as q } from 'faunadb'
import { BaseModel } from './models/baseModel'
import { FaunaResponse } from './models/faunaResponse'

interface ForestClientArgs {
    client: faunadb.Client
}

export class ForestClient {
    clientArgs: ForestClientArgs
    constructor(clientArgs: ForestClientArgs) {
        this.clientArgs = clientArgs
    }

    async create<T>(baseModel: typeof BaseModel, doc: T): Promise<FaunaResponse<T>> {
        const data = await baseModel.schema.validate(doc)
        const rawFaunaResponse: FaunaResponse<T> = await this.clientArgs.client.query(
            q.Create(
                q.Collection(baseModel.collection),
                { data },
            )
        )
        return rawFaunaResponse
    }

    async delete<T>(baseModel: typeof BaseModel, id: string): Promise<FaunaResponse<T>> {
        const deletedDocument: FaunaResponse<T> = await this.clientArgs.client.query(
            q.Delete(
                q.Ref(
                    q.Collection(baseModel.collection),
                    id
                )
            )
        )

        return deletedDocument
    }
    
    async findById<T>(baseModel: typeof BaseModel, id: string): Promise<FaunaResponse<T>> {
        
        const document: FaunaResponse<T> = await this.clientArgs.client.query(
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
