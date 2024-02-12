import {
  SignUpUserFormData,
  GetUserData,
  SignInUserFormData,
} from '@/utils/types'
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'
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
  signUp(userData: SignUpUserFormData): Promise<void>
  signIn(crendentials: SignInUserFormData): Promise<void>
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

  async function signUp(userData: SignUpUserFormData): Promise<void> {
    const { user }: GetUserData = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password,
    ).catch((error) => {
      throw new Error(error.message)
    })

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

  async function signIn(userData: SignInUserFormData): Promise<void> {
    await signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        setData(userCredential)
        console.log(userCredential)
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

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
      value={{ user: data, signIn, signOut, updateUser, signUp }}
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
