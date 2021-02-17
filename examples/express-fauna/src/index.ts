import express from 'express'
import faunadb from 'faunadb'
import { ValidationError } from 'yup'
import { Post } from './models/post'

const app = express()
app.use(express.json())

app.get('/posts/:id', async (req, res) => {
    const { id } = req.params
    const faunaClient = new faunadb.Client({
        secret: process.env.FAUNA_SECRET!
    })

    const retrievedDocument = await faunaClient.query(
        Post.findById(id),
    )
    res.status(200).json({ ...retrievedDocument })
})

app.post('/posts', async (req, res) => {
    const post = req.body
    const faunaClient = new faunadb.Client({
        secret: process.env.FAUNA_SECRET!
    })
    
    try {
        const createQuery = await Post.create(post)
        const createdDocument = await faunaClient.query(
            createQuery,
        )
        res.status(200).json({ ...createdDocument })
    }
    catch (error) {
        if(error instanceof ValidationError) {
            res.status(400).json(error)
        }
    }
})

app.delete('/posts/:id', async (req, res) => {
    const { id } = req.params
    const faunaClient = new faunadb.Client({
        secret: process.env.FAUNA_SECRET!
    })

    const deletedDocument = await faunaClient.query(
        Post.delete(id),
    )
    res.status(200).json({ ...deletedDocument })
})

const port = process.env.PORT! || 3000

app.listen(port, () => {
    console.log(`api on port ${port} 🚀`)
})
