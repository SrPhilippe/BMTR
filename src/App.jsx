import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export default function TriaxxPasswordApp() {
  const today = new Date()
  const [day, setDay] = useState(String(today.getDate()))
  const [month, setMonth] = useState(String(today.getMonth() + 1))
  const [password, setPassword] = useState('')

  const monthRef = useRef(null)

  function calculatePassword(d, m) {
    return 169 * d - 13 * m + 351
  }

  useEffect(() => {
    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    // Set initial password
    const currentPassword = calculatePassword(today.getDate(), today.getMonth() + 1)
    setPassword(currentPassword)
  }, [])

  const handleCalculate = () => {
    const parsedDay = parseInt(day, 10)
    const parsedMonth = parseInt(month, 10)
    if (!isNaN(parsedDay) && !isNaN(parsedMonth)) {
      const pwd = calculatePassword(parsedDay, parsedMonth)
      setPassword(pwd)
    }
  }

  const toggleDarkMode = () => {
    const isDark = document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4'>
      <Button
        variant='outline'
        onClick={toggleDarkMode}
        className='absolute top-4 right-4'
      >
        Toggle Theme
      </Button>

      <Card className='w-full max-w-md shadow-xl rounded-2xl bg-white dark:bg-gray-800'>
        <CardContent className='p-6 space-y-6'>
          <h1 className='text-2xl font-bold text-center'>Password Generator</h1>
          <div className='space-y-4'>
            <div className='flex justify-between gap-4'>
              <div className='flex flex-col items-center w-1/2 gap-1'>
                <Label htmlFor='day'>Day</Label>
                <Input
                  id='day'
                  type='text'
                  inputMode='numeric'
                  pattern='[0-9]*'
                  maxLength={2}
                  className='text-center text-xl tracking-widest'
                  value={day}
                  onChange={e => {
                    let value = e.target.value.replace(/\D/g, '').slice(0, 2)
                    if (value !== '') {
                      const numeric = Math.min(parseInt(value, 10), 31)
                      value = String(numeric)
                    }
                    setDay(value)
                    if (value.length === 2) {
                      monthRef.current?.focus()
                    }
                  }}
                />
              </div>
              <div className='flex flex-col items-center w-1/2 gap-1'>
                <Label htmlFor='month'>Month</Label>
                <Input
                  id='month'
                  type='text'
                  inputMode='numeric'
                  pattern='[0-9]*'
                  maxLength={2}
                  className='text-center text-xl tracking-widest'
                  value={month}
                  onChange={e => {
                    let value = e.target.value.replace(/\D/g, '').slice(0, 2)
                    if (value !== '') {
                      const numeric = Math.min(parseInt(value, 10), 12)
                      value = String(numeric)
                    }
                    setMonth(value)
                  }}
                  ref={monthRef}
                />
              </div>
            </div>

            <Button
              className='w-full cursor-pointer bg-sky-800 hover:bg-sky-900 dark:bg-sky-600 dark:hover:bg-sky-700 text-lg py-6'
              onClick={handleCalculate}
            >
              Generate
            </Button>

            {password && (
              <div className='text-center text-xl font-semibold'>
                Password: <span className='text-green-600 dark:text-green-400'>{password}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
