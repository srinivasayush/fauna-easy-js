# Fauna-Forest
A convenient wrapper around faunadb-js that abstracts away FQL code for the database service faunadb

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install chatHelper.

```bash
npm install fauna-forest
```
Also make sure to install the package [yup](https://www.npmjs.com/package/yup) for runtime object shape validation

## QuickStart

```typescript
import * as forest from 'fauna-forest'
import * as yup from 'yup'

const postSchema = yup.object().shape({
    title: yup.string().required(),
    content: yup.string().required()
})

const post = new BaseModel('posts', postSchema)

interface NewPost {
    title: string
    content: string,
}

const main = async () => {
    const faunaClient = new faunadb.Client({
        secret: 'YOUR_CLIENT_SECRET'
    })
    const forestClient = new forest.ForestClient({
        client: faunaClient,
    })

    try {
        const createdDocument = await forestClient.create<NewPost>(post, {
            title: 'Post title',
            content: 'Post content'
        })
        console.log(createdDocument.data)

    }
    catch (error) {
        console.error(error)
    }

    
}
main()
```

## Documentation
Still under development :)


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[Apache License 2.0](https://choosealicense.com/licenses/apache-2.0/)