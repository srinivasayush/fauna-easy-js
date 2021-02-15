import { BaseModel } from './models/baseModel'
import { FaunaDocument } from './models/faunaDocument'
import { FaunaForestStore } from './store'

interface ForestClientArgs {
    faunaSecret: string
}

const use = (clientArgs: ForestClientArgs) => {
    new FaunaForestStore({
        faunaSecret: clientArgs.faunaSecret
    })
}

export { BaseModel, use, FaunaDocument }
