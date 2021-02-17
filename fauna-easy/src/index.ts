import { BaseModel } from './baseModel'
import * as yup from 'yup'

const model = <T = any>(collection: string, schema: yup.ObjectSchema<any>) => new BaseModel<T>(collection, schema)

export { model }
