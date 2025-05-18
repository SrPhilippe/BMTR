import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Tmbr() {
  const today = new Date()
  const [day, setDay] = useState(String(today.getDate()))
  const [month, setMonth] = useState(String(today.getMonth() + 1))
  const [password, setPassword] = useState('')
  const monthRef = useRef(null)

  const calc = (d, m) => 169 * d - 13 * m + 351

  useEffect(() => {
    const d = parseInt(day, 10)
    const m = parseInt(month, 10)
    if (!isNaN(d) && !isNaN(m)) setPassword(calc(d, m))
    else setPassword('')
  }, [day, month])

  return (
    <Card className='shadow-xl rounded-2xl bg-white dark:bg-gray-800'>
      <CardContent className='p-6 space-y-6'>
        <h1 className='text-2xl font-bold text-center'>Gerador de senha</h1>

        <div className='flex justify-between gap-4'>
          <div className='flex flex-col items-center w-1/2 gap-1'>
            <Label htmlFor='day'>Dia</Label>
            <Input
              id='day'
              maxLength={2}
              inputMode='numeric'
              className='text-center text-xl tracking-widest'
              value={day}
              onChange={e => {
                let v = e.target.value.replace(/\D/g, '').slice(0, 2)
                if (v !== '') v = String(Math.min(parseInt(v, 10), 31))
                setDay(v)
                if (v.length === 2) monthRef.current?.focus()
              }}
            />
          </div>

          <div className='flex flex-col items-center w-1/2 gap-1'>
            <Label htmlFor='month'>Mês</Label>
            <Input
              id='month'
              maxLength={2}
              inputMode='numeric'
              className='text-center text-xl tracking-widest'
              value={month}
              onChange={e => {
                let v = e.target.value.replace(/\D/g, '').slice(0, 2)
                if (v !== '') v = String(Math.min(parseInt(v, 10), 12))
                setMonth(v)
              }}
              ref={monthRef}
            />
          </div>
        </div>

        {password && (
          <div className='text-center text-xl font-semibold'>
            Senha: <span className='text-green-600 dark:text-green-400'>{password}</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
