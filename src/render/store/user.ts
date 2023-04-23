import { defineStore } from 'pinia'

const storageKeyPrefix = import.meta.env.VITE_APP_STORAGE_KEY_PREFIX

export interface UserState {
  userinfo: {
    name: string
    age: string
  }
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({ userinfo: { name: '', age: 'male' } }),
  getters: {
    Userinfo(state) {
      return state.userinfo
    }
  },
  actions: {
    setUserinfo(name: string) {
      this.userinfo.name = name
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: storageKeyPrefix + 'User',
        storage: localStorage
      }
    ]
  }
})
