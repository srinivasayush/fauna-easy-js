import faunadb, { query as q, values as v } from 'faunadb'
import * as yup from 'yup'
import { FaunaForestStore } from './store'

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

    async create<T>(documentData: T, id?: string): Promise<v.Document<T>> {
        const faunaClient = this.getFaunaClient()

        const data = await this.schema.validate(documentData)
        const createdDocument: v.Document<T> = await faunaClient.query(
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

    async delete<T>(id: string): Promise<v.Document<T>> {
        const faunaClient = this.getFaunaClient()
        const deletedDocument: v.Document<T> = await faunaClient.query(
            q.Delete(
                q.Ref(
                    q.Collection(this.collection),
                    id
                )
            )
        )

        return deletedDocument
    }

    async update<T>(doc: T, id: string): Promise<v.Document<T>> {
        const faunaClient = this.getFaunaClient()
        const data = await this.schema.validate(doc)

        const updatedDocument: v.Document<T> = await faunaClient.query(
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
    
    async findById<T>(id: string): Promise<v.Document<T>> {
        const faunaClient = this.getFaunaClient()
        const document: v.Document<T> = await faunaClient.query(
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

