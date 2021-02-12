import * as yup from 'yup'
import * as forest from './index'
import faunadb from 'faunadb'
import { BaseModel } from './model'

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

    await forestClient.create<NewPost>(Post, {
        content: 'my new post'
    }).catch(console.log)
    console.log('document created')
    
}
main()
