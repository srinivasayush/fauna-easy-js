import * as yup from 'yup'
import * as faunaEasy from '../../fauna-easy'
import faunadb, { values as v } from 'faunadb'

const postSchema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required()
})

interface NewPost {
    title: string
    content: string,
}

const Post = faunaEasy.model<NewPost>('posts', postSchema)
const faunaClient = new faunadb.Client({
    secret: process.env.FAUNA_SECRET!
})

const createPost = async () => {
    const createQuery = await Post.create({
        title: 'this is my post title',
        content: 'this is my post content'
    }) // Will not automatically create the document in your faunadb database

    const createdDocument: v.Document<NewPost> = await faunaClient.query(
        createQuery
    ) // Will create document in faunadb database
    console.log(createdDocument)
    return null
}

const updatePost = async (id: string) => {
    const updateQuery = await Post.update({
        title: 'this is my updated post title',
        content: 'this is my updated post content'
    }, id) // Will not automatically update the document in your faunadb database

    const updatedDocument: v.Document<NewPost> = await faunaClient.query(updateQuery) // Will create document in faunadb database
    console.log(updatedDocument)
    return null
}

const findOnePost = async (id: string) => {
    const idQuery = Post.findById(id) // Will not automatically find and return the document in your faunadb database

    const document: v.Document<NewPost> = await faunaClient.query(idQuery) // Will create document in faunadb database
    console.log('found post')
    console.log(document)
    return null
}

const deletePost = async (id: string) => {
    const deleteQuery = Post.delete(id) // Will not automatically find and return the document in your faunadb database

    const deletedDocument: v.Document<NewPost> = await faunaClient.query(deleteQuery) // Will create document in faunadb database
    console.log('deleted post')
    console.log(deletedDocument)
    return null
}

const main = async () => {

    try {
        createPost().catch(console.log)
    }
    catch (error) {
        console.error(error)
    }

    return null
}
main()
