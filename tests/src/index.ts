import * as yup from 'yup'
import * as faunaEasy from '../../fauna-easy'

const postSchema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required()
})

const Post = new faunaEasy.BaseModel('posts', postSchema)


interface NewPost {
    title: string
    content: string,
}

const main = async () => {
    faunaEasy.use({
        faunaSecret: 'YOUR_CLIENT_SECRET',
    })

    try {
        const createdDocument = await Post.create<NewPost>({
            title: 'this is my post title',
            content: 'this is my post content'
        })
    
        console.log('document created')
        console.log(createdDocument.data)
    
        const foundDocument = await Post.findById<NewPost>(createdDocument.ref.id)
        console.log('Found document')
        console.log(foundDocument.data)

        const updatedDocument = await Post.update<NewPost>({
            title: 'updated title',
            content: 'updated content'
        }, createdDocument.ref.id)

        console.log(updatedDocument)
    
        const deletedDocument = await Post.delete(createdDocument.ref.id)
        console.log('deleted document: ')
        console.log(deletedDocument.data)
    }
    catch (error) {
        console.log(error)
    }

    return null
}
main()
