import * as yup from 'yup'

class BaseModel {
    collection: string
    schema: yup.ObjectSchema<any>
    constructor(collection: string, schema: yup.ObjectSchema<any>) {
        this.collection = collection
        this.schema = schema
    }
}

export { BaseModel }
