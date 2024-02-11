import { CreateUserFormData, GetUserData } from '@/utils/types'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import {
  createContext,
  useCallback,
  useState,
  useContext,
  ReactNode,
} from 'react'

interface AuthContextData {
  user: GetUserData
  registerNewUser(userData: CreateUserFormData): Promise<void>
  signIn(crendentials: GetUserData): Promise<void>
  signOut(): void
  updateUser(user: GetUserData): void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = getAuth()
  const db = getFirestore()

  const [data, setData] = useState<GetUserData>(() => {
    const token = localStorage.getItem('@ClincSystem:token')
    const user = localStorage.getItem('@ClincSystem:user')

    if (token && user) {
      // api.defaults.headers.authorization = `Bearer ${token}`

      return { token, user: JSON.parse(user) }
    }

    return {} as GetUserData
  })

  async function registerNewUser(userData: CreateUserFormData): Promise<void> {
    /* const response = await api.post('sessions', {
      email,
      password,
    })

    const { token, user } = response.data

    localStorage.setItem('@GoBarber:token', token)
    localStorage.setItem('@GoBarber:user', JSON.stringify(user))

    api.defaults.headers.authorization = `Bearer ${token}`

    setData({ token, user }) */

    const { user }: GetUserData = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password,
    ).catch((error) => {
      throw new Error(error.message)
    })

    /* await addDoc(collection(db, `users`), {
      id: user.uid,
      name: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
    }).catch((error) => {
      throw new Error(error.message)
    }) */

    await setDoc(doc(db, 'users', String(user.uid)), {
      id: user.uid,
      name: user.displayName,
      photoURL: user.photoURL,
      email: user.email,
    }).catch((error) => {
      throw new Error(error.message)
    })

    localStorage.setItem('@ClinicSystem:user', JSON.stringify(user))
  }

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
    localStorage.removeItem('@ClinicSystem:token')
    localStorage.removeItem('@ClinicSystem:user')

    setData({} as GetUserData)
  }, [])

  function updateUser(user: GetUserData) {
    localStorage.setItem('@ClinicSystem:user', JSON.stringify(user))
  }

  return (
    <AuthContext.Provider
      value={{ user: data, signIn, signOut, updateUser, registerNewUser }}
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
