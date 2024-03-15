import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SingInCard } from './components/SignInCard'
import { useState } from 'react'
import { SignUpCard } from './components/SignUpCard'

export function AuthPage() {
  const [tabValue, setTabValue] = useState<string>('signIn')

  function handleChangeTabValue(newValue: string): void {
    setTabValue(newValue)
  }

  return (
    <div className="h-[100vh] flex items-stretch">
      <div className="bg-sign-page flex-1 bg-cover"></div>

      <div className="flex flex-col items-center justify-center min-w-1/2 p-12">
        <img src="/assets/clinic-logo.png" alt="" className="text-white w-36" />

        <Tabs value={tabValue} className="w-[400xp] mt-10">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              onClick={() => handleChangeTabValue('signIn')}
              value="signIn"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              onClick={() => handleChangeTabValue('signUp')}
              value="signUp"
            >
              Cadastro
            </TabsTrigger>
          </TabsList>

          <TabsContent value="signIn">
            <div className="mt-8">
              <h1 className="text-center text-lg font-bold">Login</h1>
              <SingInCard />
            </div>
          </TabsContent>
          <TabsContent value="signUp">
            <div className="mt-8">
              <h1 className="text-center text-lg font-bold">Cadastre-se</h1>
              <SignUpCard onSignUp={handleChangeTabValue} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
