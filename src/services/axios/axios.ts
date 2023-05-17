import axios, { AxiosRequestConfig } from 'axios'
import { ContentType } from '../../types/types'
import {
  requestHandler,
  successResponseHandler,
  errorResponseHandler,
} from './interceptors'

const getAxiosInstance = (
  config: Partial<AxiosRequestConfig> = {
    headers: { 'Content-Type': ContentType.json },
  }
) => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_PUBLIC_BASE_URL,
    headers: {
      'Content-Type': config?.headers?.contentType || ContentType.json,
    },
  })

  instance.interceptors.request.use(requestHandler)
  instance.interceptors.response.use(
    successResponseHandler,
    errorResponseHandler
  )

  return instance
}

export default getAxiosInstance()
