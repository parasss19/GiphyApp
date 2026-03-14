import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

const AppLayout = () => {
  return (
    <div className='text-white min-h-screen'>
      <div className='lg:max-w-5xl px-5 py-4 mx-auto'>
        {/* Sticky header + search bar */}
        <header className='sticky top-0 z-20 -mx-5 px-5 py-4 bg-[#0a0a0f]/95 backdrop-blur-sm'>
          <Header/>
        </header>

        <main>
          <Outlet/>
        </main>

        <Footer/>
      </div>
    </div>
  )
}

export default AppLayout
