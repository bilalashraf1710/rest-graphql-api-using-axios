import axios, { AxiosResponse } from 'axios'
import { GRAPHQL_API, POSTS_API } from './axios/constants'

export default class NetworkManager {
  static getPosts = async (): Promise<AxiosResponse<any>> => {
    return axios.get(POSTS_API)
  }

  static addPost = async (newPost: any): Promise<AxiosResponse<any>> => {
    return axios.post(POSTS_API, newPost)
  }

  static deletePost = async (id: number): Promise<AxiosResponse<any>> => {
    return axios.delete(`${POSTS_API}/${id}`)
  }

  static updatePost = async (
    postId: number,
    updatedPost: any
  ): Promise<AxiosResponse<any>> => {
    return axios.put(`${POSTS_API}/${postId}`, updatedPost)
  }

  static graphql = async (
    query: string,
    variables?: any
  ): Promise<AxiosResponse<any>> => {
    const requestBody = {
      query,
      variables,
    }
    return axios.post(GRAPHQL_API, requestBody)
  }
}
