import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function TriaxxPasswordApp() {
  const today = new Date()
  const [day, setDay] = useState(today.getDate())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [password, setPassword] = useState('')

  function calculatePassword(d, m) {
    return 169 * d - 13 * m + 351
  }

  useEffect(() => {
    const currentPassword = calculatePassword(today.getDate(), today.getMonth() + 1)
    setPassword(currentPassword)
  }, [])

  const handleCalculate = () => {
    const pwd = calculatePassword(Number(day), Number(month))
    setPassword(pwd)
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <Card className='w-full max-w-md shadow-xl rounded-2xl'>
        <CardContent className='p-6 space-y-6'>
          <h1 className='text-2xl font-bold text-center'>TRIAXX Password Generator</h1>
          <div className='space-y-4'>
            <div>
              <Label htmlFor='day' className='mb-1'>
                Day
              </Label>
              <Input id='day' type='number' min='1' max='31' value={day} onChange={e => setDay(e.target.value)} />
            </div>
            <div>
              <Label htmlFor='month' className='mb-1'>
                Month
              </Label>
              <Input id='month' type='number' min='1' max='12' value={month} onChange={e => setMonth(e.target.value)} />
            </div>
            <Button className='w-full cursor-pointer' onClick={handleCalculate}>
              Generate Password
            </Button>
            {password && (
              <div className='text-center text-xl font-semibold'>
                Password: <span className='text-green-600'>{password}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
