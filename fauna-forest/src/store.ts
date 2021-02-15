interface FaunaStoreArguments {
    faunaSecret: string
}

class FaunaForestStore {
    static instance: FaunaForestStore | null

    readonly faunaSecret: string | undefined
    constructor(storeArguments?: FaunaStoreArguments) {
        if(FaunaForestStore.instance instanceof FaunaForestStore) {
            return FaunaForestStore.instance
        }

        if(storeArguments) {
            this.faunaSecret = storeArguments.faunaSecret
        }

        Object.freeze(this)
        FaunaForestStore.instance = this
    }
}

export { FaunaForestStore }
