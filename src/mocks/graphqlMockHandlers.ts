import { graphql } from 'msw'
import { posts as gqlPost } from './data'

const posts = [...gqlPost]
export const graphqlhandlers = [
  graphql.query('GetPosts', (req, res, ctx) => {
    return res(
      ctx.data({
        posts: [...posts],
      })
    )
  }),

  graphql.mutation('UpdatePost', (req, res, ctx) => {
    const { id, title, body } = req.variables
    const index = posts.findIndex((post) => post.id === id)
    if (index === -1) {
      return res(
        ctx.errors([
          {
            message: 'Post not found',
          },
        ])
      )
    }
    posts[index].title = title
    posts[index].body = body
    return res(ctx.data({ updatePost: posts[index] }))
  }),

  graphql.mutation('DeletePost', (req, res, ctx) => {
    const { id } = req.variables
    const index = posts.findIndex((post) => post.id === +id)
    if (index === -1) {
      return res(
        ctx.errors([
          {
            message: 'Post not found',
          },
        ])
      )
    }
    const deletedPost = posts.splice(index, index + 1)
    return res(ctx.data({ deletePost: deletedPost }))
  }),

  graphql.query('GetPostById', (req, res, ctx) => {
    const { id } = req.variables
    const post = posts.find((post) => post.id === +id)
    if (!post) {
      return res(
        ctx.errors([
          {
            message: 'Post not found',
          },
        ])
      )
    }
    return res(ctx.data({ post }))
  }),

  graphql.mutation('AddPost', (req, res, ctx) => {
    const { title, body } = req.variables
    const newPost = {
      id: posts.length + 1,
      title,
      body,
    }
    posts.push(newPost)
    return res(ctx.data({ addPost: newPost }))
  }),
]
