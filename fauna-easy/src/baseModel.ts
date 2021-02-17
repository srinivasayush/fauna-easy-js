import faunadb, { query as q } from 'faunadb'
import * as yup from 'yup'

class BaseModel<T = any> {
    readonly collection: string
    readonly schema?: yup.ObjectSchema<any>
    constructor(collection: string, schema?: yup.ObjectSchema<any>) {
        this.collection = collection
        this.schema = schema
    }

    async create(doc: T, id?: string): Promise<faunadb.Expr> {
        let data
        if(this.schema) {
            data = await this.schema.validate(doc)
        }
        else {
            data = doc
        }

        return q.Create(
            id != null ? q.Ref(
                q.Collection(this.collection),
                id,
            ) : q.Collection(this.collection),
            { data },
        )
    }

    delete(id: string): faunadb.Expr {
        return q.Delete(
            q.Ref(
                q.Collection(this.collection),
                id
            )
        )
    }

    async update(doc: T, id: string): Promise<faunadb.Expr> {
        let data
        if(this.schema) {
            data = await this.schema.validate(doc)
        }
        else {
            data = doc
        }
        
        return q.Update(
            q.Ref(
                q.Collection(this.collection),
                id,
            ),
            { data },
        )
    }
    
    findById(id: string): faunadb.Expr {
        return q.Get(
            q.Ref(
                q.Collection(this.collection),
                id
            )
        )
    }
}

export { BaseModel }
