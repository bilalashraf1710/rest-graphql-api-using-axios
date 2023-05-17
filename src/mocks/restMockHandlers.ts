import { rest } from 'msw'
import { posts as postsRest } from './data'
const posts = [...postsRest]
export const resthandlers = [
  rest.get('/posts', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(posts))
  }),
  rest.post('/posts', (req, res, ctx) => {
    const { title, body } = req.body as { title: string; body: string }
    const newPost = {
      id: posts.length + 1,
      title,
      body,
    }
    posts.push(newPost)
    return res(ctx.status(201), ctx.json(newPost))
  }),
  rest.put('/posts/:id', (req, res, ctx) => {
    const { id } = req.params
    const { title, body } = req.body as { title: string; body: string }
    const index = posts.findIndex((post) => post.id === parseInt(id as string))
    if (index === -1) {
      return res(
        ctx.status(404),
        ctx.json({
          error: 'Post not found',
        })
      )
    }
    const updatedPost = { ...posts[index], title, body }
    posts[index] = updatedPost
    return res(ctx.status(200), ctx.json(updatedPost))
  }),
  rest.delete('/posts/:id', (req, res, ctx) => {
    const { id } = req.params
    const index = posts.findIndex((post) => post.id === parseInt(id as string))
    if (index === -1) {
      return res(
        ctx.status(404),
        ctx.json({
          error: 'Post not found',
        })
      )
    }

    const deletedPost = posts.slice(index, index + 1)
    return res(ctx.status(200), ctx.json(deletedPost[0]))
  }),
]
