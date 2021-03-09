import * as yup from 'yup'
import { model } from 'fauna-easy'

const postSchema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required()
})

interface NewPost {
    title: string
    content: string,
}

const Post = model<NewPost>('posts', postSchema)

export { Post }
