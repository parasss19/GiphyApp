import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import AppLayout from "./layout/AppLayout";

import HomePage from './pages/HomePage';
import FavouritePage from './pages/FavouritePage';
import SearchPage from './pages/SearchPage';
import SingleGifPage from './pages/SingleGifPage';

// Lazy-loaded components
const Categories = lazy(() => import("./pages/Categories"));

import {GifProvider} from './context/GifContext';
import Loader from './components/Loader';
import { Toaster } from 'react-hot-toast';
import Landing from './components/Landing';
import PublicRoutes from './components/PublicRoutes';
import ProtectedRoutes from './components/ProtectedRoutes';


//new way of writing routes (diff than we learn in codevolution)
const router = createBrowserRouter([
  {
    //this element render on every route
    element: <AppLayout/>,   
    
    //children routes for different pages
    children: [
      {
       path: '/',
        element: (
          <ProtectedRoutes>
            <HomePage />
          </ProtectedRoutes>
        ),
      },
      {
        path: '/:category',
        element: (
          <ProtectedRoutes>
            <Suspense fallback={<Loader />}>
              <Categories />
            </Suspense>
          </ProtectedRoutes>

        )
      },
      {
        path: '/search/:query',
        element: (
          <ProtectedRoutes>
            <SearchPage/>
          </ProtectedRoutes>
        )
      },
      {
        path: '/:type/:slug',
        element:( 
          <ProtectedRoutes>
            <SingleGifPage/>
          </ProtectedRoutes>
        )
      },
      {
        path: '/favorite',
        element:(
          <ProtectedRoutes>
            <FavouritePage/>
          </ProtectedRoutes>
          )
      },
      {
        path: '/landing',
        element: (
          <PublicRoutes>
            <Landing />
          </PublicRoutes>
        )
      }
   ]
  }
])

const App = () => {
  return (
    <>
    <Toaster position="top-center" reverseOrder={false} />
    <GifProvider>
      <RouterProvider router={router}/>
    </GifProvider>
    </>
  ) 
}

export default App

