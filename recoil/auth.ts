import { atom, selector } from 'recoil'

export interface User {
  id: number
  email: string
}

export const userState = atom<User | null>({
  key: 'UserState',
  default: null,
})

export const isAuthenticatedState = selector({
  key: 'isAuthenticated',
  get: ({ get }) => {
    const value = get(userState)

    return !!value
  },
})