import { useEffect, useState } from 'react'
import classes from './style.module.css'
import NetworkManager from '../../services/network-manager'
import { IPost } from '../../mocks/data'
const Home = () => {
  const [gqlPosts, setGqlPosts] = useState<IPost[]>([])
  const [restPosts, setRestPosts] = useState<IPost[]>([])

  const getPostsWRest = async () => {
    const mockResponse = await NetworkManager.getPosts()
    setRestPosts([...mockResponse.data])
  }

  const deleteWRestOnClickHandler = async (id: number) => {
    const response = await NetworkManager.deletePost(id)
    const deletedPost = response.data
    setRestPosts([...restPosts.filter((d) => d.id !== deletedPost.id)])
  }

  const updateWRestOnClickHandler = async (id: number, postData: IPost) => {
    const response = await NetworkManager.updatePost(id, postData)
    const updatedPost = response.data
    const data = [...restPosts]
    let cc = data.filter((d) => d.id !== updatedPost.id)
    cc = [...cc, updatedPost]
    setRestPosts([...cc])
  }

  const addNewPostWRestClickHandler = async (title: string, body: string) => {
    const response = await NetworkManager.addPost({ title, body })
    const data = [...restPosts]
    data.push(response.data)
    setRestPosts([...data])
  }

  const getPostsWGql = async () => {
    const query = `
    query GetPosts{
      Post {
            id
            title
        }
    }
    `
    const mockResponse = await NetworkManager.graphql(query)
    setGqlPosts([...mockResponse.data.data.posts])
  }

  const updatePostWGql = async (
    id: number,
    title: string,
    body: string
  ): Promise<void> => {
    try {
      const mutation = `
      mutation UpdatePost($id: ID!, $title: String!, $body: String!) {
        updatePost(id: $id, title: $title, body: $body) {
          id
          title
          body
        }
      }
    `
      const variables = {
        id,
        title,
        body,
      }

      const response = await NetworkManager.graphql(mutation, variables)
      const updatedPost = response.data.data.updatePost
      const data = [...gqlPosts]
      let cc = data.filter((d) => d.id !== updatedPost.id)
      cc = [...cc, updatedPost]
      setGqlPosts([...cc])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const deletePostWGql = async (id: number): Promise<void> => {
    try {
      const mutation = `
      mutation DeletePost($id: ID!) {
        deletePost(id: $id) {
          id
          title
          body
        }
      }
    `
      const variables = {
        id,
      }
      const response = await NetworkManager.graphql(mutation, variables)
      const deletedPost = response.data.data.deletePost[0]
      setGqlPosts([...gqlPosts.filter((d) => d.id !== deletedPost.id)])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const addPostWGql = async (title: string, body: string): Promise<void> => {
    try {
      const mutation = `
        mutation AddPost($title: String!, $body: String!) {
          addPost(title: $title, body: $body) {
            id
            title
            body
          }
        }
      `
      const variables = {
        title,
        body,
      }
      const response = await NetworkManager.graphql(mutation, variables)
      const newPost = response.data.data.addPost
      setGqlPosts([...gqlPosts, newPost])
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // const getPostByIdWGql = async (id: number): Promise<void> => {
  //   try {
  //     const query = `
  //     query GetPostById($id: ID!) {
  //       getPostById(id: $id) {
  //         id
  //         title
  //         body
  //       }
  //     }
  //   `
  //     const variables = {
  //       id,
  //     }
  //     const response = await NetworkManager.graphql(query, variables)
  //     const postById = response.data.getPostById
  //   } catch (error) {
  //     console.error('Error:', error)
  //   }
  // }

  useEffect(() => {
    getPostsWGql()
    getPostsWRest()
  }, [])
  return (
    <div className={classes.root}>
      <div className={classes.postFeed}>
        <span>Graphql Api Data</span>
        {gqlPosts.map((d: any) => (
          <div className={classes.post}>
            <div>{d.title}</div>
            <div>{d.body}</div>
            <button onClick={() => deletePostWGql(d.id)}>Delete</button>
            <button
              onClick={() =>
                updatePostWGql(d.id, 'title update', 'content updated')
              }
            >
              Edit
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            addPostWGql(
              'newly added post title',
              'hey there we have added this new post'
            )
          }
        >
          Add New Post
        </button>
      </div>

      <div className={classes.postFeed}>
        <span>Rest Api Data</span>
        {restPosts.map((d: any) => (
          <div className={classes.post}>
            <div>{d.title}</div>
            <div>{d.body}</div>
            <button onClick={() => deleteWRestOnClickHandler(d.id)}>
              Delete
            </button>
            <button
              onClick={() =>
                updateWRestOnClickHandler(d.id, {
                  id: d.id,
                  title: 'rest title updated',
                  body: 'rest body content updated',
                })
              }
            >
              Edit
            </button>
          </div>
        ))}
        <button
          onClick={() =>
            addNewPostWRestClickHandler(
              'newly added post title',
              'hey there we have added this new post'
            )
          }
        >
          Add New Post
        </button>
      </div>
    </div>
  )
}

export default Home
