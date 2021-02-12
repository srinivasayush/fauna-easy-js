import * as yup from 'yup'
import * as forest from './index'
import faunadb from 'faunadb'
import { BaseModel } from './models/baseModel'


import util from 'util'
import { create } from 'yup/lib/Reference'

class Post extends BaseModel {
    static collection = 'posts'
    static schema = yup.object().shape({
        content: yup.string().required(),
    })
}

interface NewPost {
    content: string
}

const main = async () => {
    const faunaClient = new faunadb.Client({
        secret: ''
    })
    const forestClient = new forest.ForestClient({
        client: faunaClient,
    })

    const createdDocument = await forestClient.create<NewPost>(Post, {
        content: 'my ohoho post'
    })
    console.log('document created')
    console.log(createdDocument.data)

    const foundDocument = await forestClient.findById<NewPost>(Post, (createdDocument as any).ref.id)
    console.log('Found document')
    console.log(foundDocument.data)

    const deletedDocument = await forestClient.delete(Post, (createdDocument as any).ref.id)
    console.log('deleted document: ')
    console.log(deletedDocument.data)

    
}
main()
