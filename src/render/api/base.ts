import { MessagePlugin } from 'tdesign-vue-next'
import type { Request } from '@/types'
import { useRequests } from '@/lib'
import router from '@/router'
import { removeToken } from '@/utils'

const errorHandler = (msg: string) => {
  removeToken()
  MessagePlugin.closeAll()
  MessagePlugin.error(msg)
  setTimeout(() => {
    router.push('/login')
  }, 50)
}

const baseURL = import.meta.env.VITE_API_URL

// 刷新令牌
const pureRequests = useRequests({ baseURL, errorHandler, noRefreshToken: true })
export const refreshTokenApi = (data?: Request) =>
  pureRequests.post('/user/refresh_token', { refresh_token: data?.refreshToken })

export const requests = useRequests({ baseURL, errorHandler, refreshTokenApi })
