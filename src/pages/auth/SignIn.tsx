import { Label } from '@radix-ui/react-label'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

export function SignIn() {
  const auth = getAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(): Promise<void> {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user

        console.log(user)

        // ...
      })
      .catch((error) => {
        console.log(error)

        // ..
      })
  }

  return (
    <div className="h-[100vh] flex items-stretch">
      <div className="bg-sign-page flex-1 bg-cover"></div>

      <div className="flex flex-col items-center justify-center min-w-1/2 p-12">
        <img src="/assets/clinic-logo.png" alt="" className="text-white w-52" />

        <form onSubmit={handleSubmit} className="w-96 flex flex-col gap-3 mt-8">
          <Label>E-mail</Label>
          <Input
            type="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <Label className="">Senha</Label>
          <Input
            type="password"
            id="password"
            placeholder="Senha"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <Button className="mt-6" variant="outline" type="submit">
            Entrar
          </Button>
        </form>
      </div>
    </div>
  )
}
