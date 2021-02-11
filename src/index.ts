import { model } from "./model"
import * as yup from 'yup'

const main = () => {
    const Post = model('posts', yup.object().shape({}))
    interface NewPost {
        content: string
    }
    const post = new Post<NewPost>({
        content: 'my post content'
    })
    post.save()

}
main()
