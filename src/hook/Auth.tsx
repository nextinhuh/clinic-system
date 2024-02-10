import {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
} from 'react'

interface SignInCredentials {
  email: string
  password: string
}

interface User {
  id: string
  name: string
  avatar_url: string
  email: string
}

interface AuthContextData {
  user: User
  signIn(crendentials: SignInCredentials): Promise<void>
  signOut(): void
  updateUser(user: User): void
}

interface AuthState {
  token: string
  user: User
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@ClincSystem:token')
    const user = localStorage.getItem('@ClincSystem:user')

    if (token && user) {
      // api.defaults.headers.authorization = `Bearer ${token}`

      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async () => {
    /* const response = await api.post('sessions', {
      email,
      password,
    })

    const { token, user } = response.data

    localStorage.setItem('@GoBarber:token', token)
    localStorage.setItem('@GoBarber:user', JSON.stringify(user))

    api.defaults.headers.authorization = `Bearer ${token}`

    setData({ token, user }) */
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token')
    localStorage.removeItem('@GoBarber:user')

    setData({} as AuthState)
  }, [])

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@GoBarber:user', JSON.stringify(user))

      setData({
        token: data.token,
        user,
      })
    },
    [setData, data.token],
  )

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('userAuth must be used within an AuthProvider')
  }

  return context
}
