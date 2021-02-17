# Fauna-Easy
A convenient wrapper around faunadb-js that abstracts away FQL code for the database service faunadb

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install fauna-easy.

```bash
npm install fauna-easy --save
```
Also make sure to install the package [yup](https://www.npmjs.com/package/yup) for runtime object shape validation

## QuickStart

```typescript
import * as yup from 'yup'
import * as faunaEasy from 'fauna-easy'
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
    secret: 'YOUR_CLIENT_SECRET'
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

createPost()
```

## Documentation
Still under development :)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)
