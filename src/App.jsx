import React, { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import Tmbr from '@/components/Tmbr'
import Periodic from '@/components/Periodic'
import NewPass from '@/components/NewPass'

export default function App () {
  // Dark‑mode persistence
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'dark') document.documentElement.classList.add('dark')
  }, [])

  const toggleDark = () => {
    const isDark = document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  return (
    <div className='min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4'>
      <Button variant='outline' onClick={toggleDark} className='absolute top-4 right-4'>
        Mudar Tema
      </Button>

      <Tabs defaultValue='tmbr' className='max-w-md mx-auto mt-16'>
        <TabsList className='grid grid-cols-3 w-full dark:bg-gray-800'>
          <TabsTrigger value='tmbr'>TMBR</TabsTrigger>
          <TabsTrigger value='periodic'>Periódica</TabsTrigger>
          <TabsTrigger value='newpass' disabled>NewPass</TabsTrigger>
        </TabsList>

        <TabsContent value='tmbr'><Tmbr /></TabsContent>
        <TabsContent value='periodic'><Periodic /></TabsContent>
        <TabsContent value='newpass'><NewPass /></TabsContent>
      </Tabs>
    </div>
  )
}
