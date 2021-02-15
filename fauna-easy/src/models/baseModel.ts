import faunadb, { query as q } from 'faunadb'
import * as yup from 'yup'
import { FaunaDocument } from '..'
import { FaunaForestStore } from '../store'

class BaseModel {
    collection: string
    schema: yup.ObjectSchema<any>
    constructor(collection: string, schema: yup.ObjectSchema<any>) {
        this.collection = collection
        this.schema = schema
    }

    private getFaunaClient() {
        const store = new FaunaForestStore()
        const faunaClient = new faunadb.Client({
            secret: store.faunaSecret!
        })
        return faunaClient
    }

    async create<T>(doc: T, id?: string): Promise<FaunaDocument<T>> {
        const faunaClient = this.getFaunaClient()

        const data = await this.schema.validate(doc)
        const createdDocument: FaunaDocument<T> = await faunaClient.query(
            q.Create(
                id != null ? q.Ref(
                    q.Collection(this.collection),
                    id,
                ) : q.Collection(this.collection),
                { data },
            )
        )
        return createdDocument
    }

    async delete<T>(id: string): Promise<FaunaDocument<T>> {
        const faunaClient = this.getFaunaClient()
        const deletedDocument: FaunaDocument<T> = await faunaClient.query(
            q.Delete(
                q.Ref(
                    q.Collection(this.collection),
                    id
                )
            )
        )

        return deletedDocument
    }

    async update<T>(doc: T, id: string): Promise<FaunaDocument<T>> {
        const faunaClient = this.getFaunaClient()
        const data = await this.schema.validate(doc)

        const updatedDocument: FaunaDocument<T> = await faunaClient.query(
            q.Update(
                q.Ref(
                    q.Collection(this.collection),
                    id,
                ),
                { data },
            )
        )
        return updatedDocument
    }

    async queryByIndex<T>(index: string, terms: any[], opts?: { data: boolean }): Promise<FaunaDocument<T>[] | { data: [{ ref: any }] }> {
        const faunaClient = this.getFaunaClient()
        let faunaQuery = q.Paginate(
            q.Match(
                q.Index(index),
                terms.length > 1 ? terms : terms[0]
            )
        )
        if (opts) {
            if (opts.data) {
                faunaQuery = q.Map(
                    faunaQuery,
                    q.Lambda('X', q.Get(q.Var('X')))
                )
            }
        }
        const documents = await faunaClient.query(faunaQuery)
        return documents as any
    }
    
    async findById<T>(id: string): Promise<FaunaDocument<T>> {
        const faunaClient = this.getFaunaClient()
        const document: FaunaDocument<T> = await faunaClient.query(
            q.Get(
                q.Ref(
                    q.Collection(this.collection),
                    id
                )
            )
        )

        return document
    }
}

export { BaseModel }

