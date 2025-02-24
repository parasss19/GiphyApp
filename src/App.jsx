import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import AppLayout from './layout/AppLayout'
import HomePage from './pages/HomePage'
import Categories from './pages/Categories'
import SearchPage from './pages/SearchPage'
import FavouritePage from './pages/FavouritePage'
import SingleGifPage from './pages/SingleGifPage'
import {GifProvider} from './context/GifContext'


//new way of writing routes (diff than we learn in codevolution)
const router = createBrowserRouter([
  {
    //this element render on every route
    element: <AppLayout/>,   
    
    //children routes for different pages
    children: [
      {
       path: '/',
       element: <HomePage/>
      },
      {
        path: '/:category',
        element: <Categories/>
      },
      {
        path: '/search/:query',
        element: <SearchPage/>
      },
      {
        path: '/:type/:slug',
        element: <SingleGifPage/>
      },
      {
        path: '/favorite',
        element: <FavouritePage/>
      }
   ]
  }
])

const App = () => {
  return (
    <>
    <GifProvider>
      <RouterProvider router={router}/>
    </GifProvider>
    </>
  ) 
}

export default App
