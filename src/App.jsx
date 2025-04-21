import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

export default function TriaxxApp() {
  const today = new Date()
  const day = today.getDate()
  const month = today.getMonth() + 1
    const year = today.getFullYear() % 100

  // Principal state
  const [principalDay, setPrincipalDay] = useState(String(day))
  const [principalMonth, setPrincipalMonth] = useState(String(month))
  const [principalPassword, setPrincipalPassword] = useState('')
  const monthRef = useRef(null)

  // Periódica state
  const [periodicInput, setPeriodicInput] = useState('')
  const [periodicPassword, setPeriodicPassword] = useState('')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    const defaultPassword = calculatePrincipalPassword(day, month)
    setPrincipalPassword(defaultPassword)
  }, [])

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  const calculatePrincipalPassword = (d, m) => 169 * d - 13 * m + 351

  const handlePrincipalGenerate = () => {
    const d = parseInt(principalDay, 10)
    const m = parseInt(principalMonth, 10)
    if (!isNaN(d) && !isNaN(m)) {
      setPrincipalPassword(calculatePrincipalPassword(d, m))
    }
  }

  const handlePeriodicChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 5)
    setPeriodicInput(value)

    if (value.length === 5) {
      const code = value.slice(0, 4) // discard last digit
      const prefix = code.slice(0, 2)
      const lastTwo = parseInt(code.slice(2), 10)

      const total = lastTwo + day + month + year

      let finalPrefix = parseInt(prefix, 10)
      let suffix = total

      if (total > 99) {
        finalPrefix += 1
        suffix = total % 100
      }

      setPeriodicPassword(`${finalPrefix}${suffix.toString().padStart(2, '0')}`)
    } else {
      setPeriodicPassword('')
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4'>
      <Button
        variant='outline'
        onClick={toggleDarkMode}
        className='absolute top-4 right-4'
      >
        Mudar Tema
      </Button>

      <Tabs defaultValue='principal' className='max-w-md mx-auto mt-16'>
        <TabsList className='grid grid-cols-2 w-full'>
          <TabsTrigger value='principal'>TRBM</TabsTrigger>
          <TabsTrigger value='periodic'>Periódica</TabsTrigger>
        </TabsList>

        <TabsContent value='principal'>
          <Card className='shadow-xl rounded-2xl bg-white dark:bg-gray-800'>
            <CardContent className='p-6 space-y-6'>
              <h1 className='text-2xl font-bold text-center'>Gerador de senha</h1>
              <div className='space-y-4'>
                <div className='flex justify-between gap-4'>
                  <div className='flex flex-col items-center w-1/2 gap-1'>
                    <Label htmlFor='day'>Dia</Label>
                    <Input
                      id='day'
                      type='text'
                      inputMode='numeric'
                      pattern='[0-9]*'
                      maxLength={2}
                      className='text-center text-xl tracking-widest'
                      value={principalDay}
                      onChange={e => {
                        let val = e.target.value.replace(/\D/g, '').slice(0, 2)
                        if (val !== '') {
                          const num = Math.min(parseInt(val, 10), 31)
                          val = String(num)
                        }
                        setPrincipalDay(val)
                        if (val.length === 2) {
                          monthRef.current?.focus()
                        }
                      }}
                    />
                  </div>
                  <div className='flex flex-col items-center w-1/2 gap-1'>
                    <Label htmlFor='month'>Mês</Label>
                    <Input
                      id='month'
                      type='text'
                      inputMode='numeric'
                      pattern='[0-9]*'
                      maxLength={2}
                      className='text-center text-xl tracking-widest'
                      value={principalMonth}
                      onChange={e => {
                        let val = e.target.value.replace(/\D/g, '').slice(0, 2)
                        if (val !== '') {
                          const num = Math.min(parseInt(val, 10), 12)
                          val = String(num)
                        }
                        setPrincipalMonth(val)
                      }}
                      ref={monthRef}
                    />
                  </div>
                </div>

                <Button
                  className='w-full cursor-pointer bg-sky-800 hover:bg-sky-900 dark:bg-sky-600 dark:hover:bg-sky-700 text-lg py-6'
                  onClick={handlePrincipalGenerate}
                >
                  Gerar senha
                </Button>

                {principalPassword && (
                  <div className='text-center text-xl font-semibold'>
                    Senha: <span className='text-green-600 dark:text-green-400'>{principalPassword}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value='periodic'>
          <Card className='shadow-xl rounded-2xl bg-white dark:bg-gray-800'>
            <CardContent className='p-6 space-y-6'>
              <h1 className='text-2xl font-bold text-center'>Remover Alarme manutenção periódica pendente</h1>
              <div className='space-y-4'>
                <div className='flex flex-col items-center gap-1'>
                  <Label htmlFor='periodic'>Últimos 5 dígitos do S/N</Label>
                  <Input
                    id='periodic'
                    type='text'
                    inputMode='numeric'
                    pattern='[0-9]*'
                    maxLength={5}
                    className='text-center text-xl tracking-widest'
                    value={periodicInput}
                    onChange={handlePeriodicChange}
                  />
                </div>
                {periodicPassword && (
                  <div className='text-center text-xl font-semibold'>
                    Senha: <span className='text-green-600 dark:text-green-400'>{periodicPassword}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
