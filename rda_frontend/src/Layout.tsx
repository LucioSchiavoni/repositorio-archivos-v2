import React from 'react'
import Navbar from './components/navbar/Navbar'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
     <div className='absolute left-0'>
        <Navbar/>
     </div>
    <div className=' dark:bg-neutral-900 min-h-screen'>
       {children}
    </div>
    </>
  )
}

export default Layout