import { BaseModel } from './baseModel'
import { FaunaDocument } from './faunaDocument'
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
