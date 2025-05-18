import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Periodic() {
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear() % 100

    const [value, setValue] = useState('')
    const [password, setPassword] = useState('')

    const handleChange = e => {
        let v = e.target.value.replace(/\D/g, '').slice(0, 5)
        setValue(v)

        if (v.length === 5) {
            const code = v.slice(0, 4)
            const prefix = code.slice(0, 2)
            const lastTwo = parseInt(code.slice(2), 10)
            const total = lastTwo + day + month + year
            let finalPrefix = parseInt(prefix, 10)
            let suffix = total

            if (total > 99) {
                finalPrefix += 1
                suffix = total % 100
            }
            setPassword(`${finalPrefix}${suffix.toString().padStart(2, '0')}`)
        } else setPassword('')
    }

    return (
        <Card className='shadow-xl rounded-2xl bg-white dark:bg-gray-800'>
            <CardContent className='p-6 space-y-6'>
                <h1 className='text-2xl font-bold text-center'>
                    Remover alarme de manutenção
                </h1>

                <div className='flex flex-col items-center gap-1'>
                    <Label>Últimos 5 dígitos do S/N</Label>
                    <Input
                        maxLength={5}
                        inputMode='numeric'
                        className='text-center text-xl tracking-widest'
                        value={value}
                        onChange={handleChange}
                    />
                </div>

                {password &&
                    <div className='text-center text-xl font-semibold'>
                        Senha:{' '}
                        <span className='text-green-600 dark:text-green-400'>{password}</span>
                    </div>}
            </CardContent>
        </Card>
    )
}
