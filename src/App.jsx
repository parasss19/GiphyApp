import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import AppLayout from './layout/AppLayout'
import HomePage from './pages/HomePage'


//new way of writing routes (diff than we learn in codevolution)
const router = createBrowserRouter([
  {
    //this element render on every route
    element: <AppLayout/>,   

    children: [
      {
       path: '/',
       element: <HomePage/>
      }
      
  ]

    
  }
])

const App = () => {
  return (
    <div>
      <h3 className='bg-amber-300'>Hello world</h3>
    </div>
  )
}

export default App
