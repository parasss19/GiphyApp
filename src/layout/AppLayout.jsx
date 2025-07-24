import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from '../components/Header'
import Footer from '../components/Footer'

const AppLayout = () => {
  return (
    <div className='bg-gray-950 text-white min-h-screen'>
      {/* our app container */}
      <div className='lg:max-w-5xl px-6 py-4 mx-auto'>
        <Header/>
        
        <main>
          <Outlet/>    
        </main> 

        <Footer/>
      </div>
    </div>
  )
}

export default AppLayout
