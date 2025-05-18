import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function NewPass() {
    const [sn, setSn] = useState('')
    const [L, setL] = useState('')
    const [hex, setHex] = useState(new Array(10).fill(''))
    const [password, setPassword] = useState('')
    const refs = useRef([])

    const calcPassword = () => {
        if (!(sn && L && hex.every(b => b.length === 2))) return ''
        const A = parseInt(sn, 10)
        const byte1 = parseInt(hex[1], 16)
        const byte3 = parseInt(hex[3], 16)
        const W = (byte1 << 8) | byte3
        const fL = 25600 - 9.2 * parseFloat(L)
        if (!fL) return ''
        const T = Math.round((63720 * W) / fL)
        return String(A - T)
    }

    useEffect(() => setPassword(calcPassword()), [sn, L, hex])

    const handlePaste = e => {
        e.preventDefault()
        const clean = e.clipboardData.getData('text').toUpperCase().replace(/[^A-F0-9]/g, '')
        const pairs = []
        for (let i = 0; i < clean.length; i += 2) pairs.push(clean.substring(i, i + 2))
        if (pairs.length === 10) {
            setHex(pairs)
            refs.current[9]?.focus()
        }
    }

    return (
        <Card className='shadow-xl rounded-2xl bg-white dark:bg-gray-800'>
            <CardContent className='p-6 space-y-6'>
                <h1 className='text-2xl font-bold text-center'>NewPass</h1>

                {/* SN */}
                <div className='flex flex-col gap-2'>
                    <Label>Últimos 5 dígitos do Serial</Label>
                    <Input
                        maxLength={5}
                        inputMode='numeric'
                        className='text-center text-xl tracking-widest'
                        value={sn}
                        onChange={e => setSn(e.target.value)}
                    />
                </div>

                {/* Litragem */}
                <div className='flex flex-col gap-2'>
                    <Label>Litragem</Label>
                    <Input
                        maxLength={3}
                        inputMode='numeric'
                        className='w-20 text-center text-xl tracking-widest'
                        value={L}
                        onChange={e => setL(e.target.value)}
                    />
                </div>

                {/* HEX */}
                <div className='flex flex-col gap-2'>
                    <Label>Código HEX completo</Label>

                    {[0, 1].map(row => (
                        <div key={row} className='flex justify-center gap-1 mt-2'>
                            {hex.slice(row * 5, row * 5 + 5).map((b, i) => {
                                const idx = row * 5 + i
                                return (
                                    <div key={idx} className='flex items-center'>
                                        <Input
                                            ref={el => (refs.current[idx] = el)}
                                            maxLength={2}
                                            className='w-12 text-center tracking-widest'
                                            value={hex[idx]}
                                            onPaste={handlePaste}
                                            onChange={e => {
                                                const val = e.target.value.replace(/[^A-Fa-f0-9]/g, '').toUpperCase().slice(0, 2)
                                                const arr = [...hex]
                                                arr[idx] = val
                                                setHex(arr)
                                                if (val.length === 2 && idx < 9) refs.current[idx + 1]?.focus()
                                            }}
                                        />
                                        {idx % 5 !== 4 && <span>-</span>}
                                    </div>
                                )
                            })}
                        </div>
                    ))}
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
