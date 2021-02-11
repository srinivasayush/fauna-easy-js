import * as yup from 'yup'

class BaseModel {
    static findById() {}
}

class Model<T> extends BaseModel {
    document: any
    constructor(document: T) {
        super()
        this.document = document
    }

    async save() {
        console.log(this.document)
        return null
    }
}

const model = <T>(name: string, schema: yup.ObjectSchema<any>): typeof Model => {
    return Model
}

export { model }
