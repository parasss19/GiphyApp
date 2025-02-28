import React, { useContext, useEffect, useState } from 'react'
import { GifContext } from '../context/GifContext'
import Gif from '../components/Gif';

const FavouritePage = () => {
  const{gf, favorites} = useContext(GifContext);

  const [favoriteGifs, setFavoriteGifs] = useState([])

  useEffect(() =>{
    const fetchFavoriteGifs = async () =>{
      const {data} = await gf.gifs(favorites)
      setFavoriteGifs(data)
    }
    fetchFavoriteGifs()
  },[])
  
  return (
      <div className='mt-8'>
        <span className='font-[poppins] text-2xl sm:text-3xl font-bold text-gray-200'>My <span className='text-teal-400'>Favorites</span></span>
      
        {favoriteGifs.length > 0 ? (
          <div className='columns-2 md:columns-3 lg:columns-4 gap-2 mt-6'>
            {
              favoriteGifs.map((gif) => (
                <Gif gif={gif} key={gif.id}/>
              ))
            }
         </div> 
        ) : (
          <div className='flex flex-col justify-center items-center gap-3 w-full mt-4'>
            <span className='font-extrabold text-lg sm:text-2xl '>No favourites</span>
            <img src="tomJerry.gif " alt="tom and jerry" />
          </div>
        )}
      </div>
  )
}

export default FavouritePage
