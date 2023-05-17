import { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { TOKEN, AUTH_TOKEN_HEADER } from '../axios/constants'

export const requestHandler = (request: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem(TOKEN) || sessionStorage.getItem(TOKEN)
  if (token && request.headers) {
    request.headers[AUTH_TOKEN_HEADER] = `Bearer ${token}`
  }
  return request
}

export const successResponseHandler = (response: AxiosResponse) => {
  return {
    ...response,
    data: response.data,
  }
}

export const errorResponseHandler = (error: AxiosError) => {
  return Promise.reject(error)
}
