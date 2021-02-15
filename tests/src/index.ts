import * as yup from 'yup'
import * as forest from '../../fauna-forest'

const postSchema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required()
})

const Post = new forest.BaseModel('posts', postSchema)


interface NewPost {
    title: string
    content: string,
}

const main = async () => {
    forest.use({
        faunaSecret: 'YOUR_CLIENT_SECRET',
    })

    try {
        const createdDocument = await Post.create<NewPost>({
            title: 'this is my ohoho post title',
            content: 'this is my ohoho post content'
        })
    
        console.log('document created')
        console.log(createdDocument.data)
    
        // const foundDocument = await forestClient.findById<NewPost>(post, (createdDocument as any).ref.id)
        // console.log('Found document')
        // console.log(foundDocument.data)
    
        // const deletedDocument = await forestClient.delete(post, (createdDocument as any).ref.id)
        // console.log('deleted document: ')
        // console.log(deletedDocument.data)

        // const documentReferences = await forestClient.queryByIndex('posts_by_content', ['my first post content'], {
        //     getData: true
        // })
        // console.log(documentReferences)

        // const updatedDocument = await forestClient.update<NewPost>(post, {
        //     title: 'updated title',
        //     content: 'updated content'
        // }, '290384136264221185')

        // console.log(updatedDocument)
    }
    catch (error) {
        console.log(error)
    }

    return null
}
main()
