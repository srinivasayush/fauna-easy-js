import faunadb, { query as q } from 'faunadb'
import { BaseModel } from './model'

interface ForestClientArgs {
    client: faunadb.Client
}

export class ForestClient {
    clientArgs: ForestClientArgs
    constructor(clientArgs: ForestClientArgs) {
        this.clientArgs = clientArgs
    }

    async create<T>(baseModel: typeof BaseModel, doc: T) {
        try {
            const data = await baseModel.schema.validate(doc)
            await this.clientArgs.client.query(
                q.Create(
                    q.Collection(baseModel.collection),
                    { data },
                )
            )
        }
        catch (error) {
            throw error
        }
    }
}
