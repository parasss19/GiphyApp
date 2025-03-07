import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import AppLayout from "./layout/AppLayout";

import HomePage from './pages/HomePage';
import FavouritePage from './pages/FavouritePage';
import SearchPage from './pages/SearchPage';
import SingleGifPage from './pages/SingleGifPage';

// Lazy-loaded components
const Categories = lazy(() => import("./pages/Categories"));

import {GifProvider} from './context/GifContext'
import Loader from './components/Loader';


//new way of writing routes (diff than we learn in codevolution)
const router = createBrowserRouter([
  {
    //this element render on every route
    element: <AppLayout/>,   
    
    //children routes for different pages
    children: [
      {
       path: '/',
       element:  <HomePage/>
      },
      {
        path: '/:category',
        element: (
        <Suspense fallback={<Loader/>}>
          <Categories/>
        </Suspense>
        )
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
        element:<FavouritePage/>
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

