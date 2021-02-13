import * as yup from 'yup'
import * as forest from './index'
import faunadb from 'faunadb'
import { BaseModel } from './models/baseModel'

const post = new BaseModel('posts', yup.object().shape({
    content: yup.string().required()
}))

interface NewPost {
    title: string
    content: string,
}

const main = async () => {
    const faunaClient = new faunadb.Client({
        secret: ''
    })
    const forestClient = new forest.ForestClient({
        client: faunaClient,
    })

    try {
        const createdDocument = await forestClient.create<NewPost>(post, {
            title: 'this is my ohoho post title',
            content: 'this is my ohoho post content'
        })
    
        console.log('document created')
        console.log(createdDocument.data)
    
        const foundDocument = await forestClient.findById<NewPost>(post, (createdDocument as any).ref.id)
        console.log('Found document')
        console.log(foundDocument.data)
    
        const deletedDocument = await forestClient.delete(post, (createdDocument as any).ref.id)
        console.log('deleted document: ')
        console.log(deletedDocument.data)

        const documentReferences = await forestClient.queryByIndex('posts_by_content', ['my first post content'], {
            getData: true
        })
        console.log(documentReferences)
    }
    catch (error) {
        console.log(error)
    }

    
}
main()
