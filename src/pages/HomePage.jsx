import React, { useContext, useEffect } from 'react'
import { GifContext } from '../context/GifContext'
import Gif from '../components/Gif'

const HomePage = () => {
  const {gf, gifs, setGifs, filter} = useContext(GifContext)

  //rendering trending gifs on homepage
  const fetchTrendingGifs = async () =>{
    const {data} = await gf.trending({
      limit: 30,
      type: filter,
      rating: "g",
    })
    console.log(data)
    setGifs(data)
  }
  //we call fetchTrendingGifs func whenever filter state change and new gifs rendered on homepage
  useEffect(()=>{
    fetchTrendingGifs()
  },[filter])

  return (
    <div>
      <img src="/banner.gif" alt="banner image" className='mt-3 mb-4 rounded w-full'/>
      
      <div className='columns-2 md:columns-3 lg:columns-4 gap-2'>
        { //we are mapping each gif from gifs(state of array) and passing each gif to Gif comp as a prop
          gifs.map((gif) => (
            <Gif gif = {gif} key={gif.title}/>
          ))
        }
      </div>
      
    </div>
  )
}

export default HomePage
