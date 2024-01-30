import { Label } from '@radix-ui/react-label'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'

export function App() {
  return (
    <div className="h-[100vh] flex items-stretch">
      <div className="bg-sign-page flex-1 bg-cover"></div>

      <div className="flex flex-col items-center justify-center w-1/3 max-w-[700] p-6">
        <form action="" className="w-96 flex flex-col gap-3">
          <Label>E-mail</Label>
          <Input type="email" id="email" placeholder="E-mail" />

          <Label className="">Senha</Label>
          <Input type="password" id="password" placeholder="Senha" />

          <Button className="mt-6" variant="outline">
            Teste
          </Button>
        </form>
      </div>
    </div>
  )
}
