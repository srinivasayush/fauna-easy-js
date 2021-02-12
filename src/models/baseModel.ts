import * as yup from 'yup'

class BaseModel {
    static collection: string
    static schema: yup.ObjectSchema<any>
}

export { BaseModel }
