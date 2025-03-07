import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import { GifContext } from '../context/GifContext'

import Loader from '../components/Loader'             //our loader component
const Gif = lazy(() => import("../components/Gif"));   //Lazy-load the Gif component

const FavouritePage = () => {
  const{gf, favorites} = useContext(GifContext);

  const [favoriteGifs, setFavoriteGifs] = useState([])

  useEffect(() =>{
    const fetchFavoriteGifs = async () =>{
      // console.log(favorites)
      const {data} = await gf.gifs(favorites)
      setFavoriteGifs(data)
    }
    fetchFavoriteGifs()
  },[gf])
  
  return (
      <div className='mt-8'>
        <span className='font-[poppins] text-2xl sm:text-3xl font-bold text-gray-200'>My <span className='text-teal-400'>Favorites</span></span>
        
        {favoriteGifs ? (
          <Suspense fallback={<Loader/>}>
          <div className='columns-2 md:columns-3 lg:columns-4 gap-2 mt-6'>
            {favoriteGifs.map((gif) => (
              <Gif gif={gif} key={gif.id}/>
            ))}
         </div>
         </Suspense> 
        ) : (
          <div className='flex flex-col justify-center items-center gap-3 w-full mt-4'>
            <span className='font-extrabold text-lg sm:text-2xl '>No favourites</span>
            <img src="tomJerry.gif" alt="tom and jerry" />
          </div>
        )}
      </div>
  )
}

export default FavouritePage
