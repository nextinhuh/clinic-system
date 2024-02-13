import { userSchema } from '@/utils/schemas'
import {
  SignUpUserFormData,
  GetUserData,
  SignInUserFormData,
  UpdateInUserFormData,
  UserData,
} from '@/utils/types'
import {
  getAuth,
  signOut as signOutFirebase,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { doc, getFirestore, setDoc } from 'firebase/firestore'
import { createContext, useState, useContext, ReactNode } from 'react'

interface AuthContextData {
  user: UserData
  signUp(userData: SignUpUserFormData): Promise<void>
  signIn(crendentials: SignInUserFormData): Promise<void>
  signOut(): void
  updateUser(user: UpdateInUserFormData): void
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const auth = getAuth()
  const db = getFirestore()
  const [data, setData] = useState<UserData>(() => {
    const user = localStorage.getItem('@ClinicSystem:user')

    if (user) {
      return JSON.parse(user)
    }

    return {} as UserData
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
  }

  async function signIn(userData: SignInUserFormData): Promise<void> {
    await signInWithEmailAndPassword(auth, userData.email, userData.password)
      .then((userCredential) => {
        const userData = userSchema.parse(userCredential.user)
        setData(userData)
        localStorage.setItem('@ClinicSystem:user', JSON.stringify(userData))
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  async function signOut() {
    signOutFirebase(auth)
      .then(() => {
        localStorage.removeItem('@ClinicSystem:user')
        setData({} as UserData)
      })
      .catch((error) => {
        throw new Error(error.message)
      })
  }

  function updateUser(userUpdated: UpdateInUserFormData) {
    if (auth.currentUser) {
      updateProfile(auth.currentUser, {
        displayName: userUpdated.name,
        photoURL: userUpdated.photoURL,
      })
        .then(async () => {
          await setDoc(doc(db, 'users', String(auth.currentUser?.uid)), {
            name: userUpdated.name,
            photoURL: userUpdated.photoURL,
          })
            .then(() => {
              localStorage.setItem(
                '@ClinicSystem:user',
                JSON.stringify(userUpdated),
              )
            })
            .catch((error) => {
              throw new Error(error.message)
            })
        })
        .catch((error) => {
          throw new Error(error.message)
        })
    }
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
