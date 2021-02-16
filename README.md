# Fauna-Forest
A convenient wrapper around faunadb-js that abstracts away FQL code for the database service faunadb

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install fauna-easy.

```bash
npm install fauna-easy
```
Also make sure to install the package [yup](https://www.npmjs.com/package/yup) for runtime object shape validation

## QuickStart

```typescript
import * as yup from 'yup'
import * as faunaEasy from 'fauna-easy'

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
    }
    catch (error) {
        console.log(error)
    }

    return null
}
main()
```

## Documentation
Still under development :)


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)
