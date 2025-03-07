import React, { lazy, Suspense, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GifContext } from '../context/GifContext';

import Loader from '../components/Loader';             //our loader component
const Gif = lazy(() => import("../components/Gif"));   //Lazy-load the Gif component

import FollowOn from '../components/FollowOn';
import { HiChevronDown, HiChevronUp, HiOutlineExternalLink } from 'react-icons/hi';
import FavDownShare from '../components/FavDownShare';


const Type = ['gif', 'sticker', 'text'];

const SingleGifPage = () => {
  //when click on any content(gif,sticker,text), url look like: http://localhost:5173/type/slug
  //we extract /:type/:slug using useParams() hook
  //we want gif Id which is present at the last in slug 

  const {gf} = useContext(GifContext)
  const {type, slug} = useParams()

  const [singleGif, setSingleGif] = useState({})
  const [relatedGifs, setRelatedGifs] = useState([])
  const [readMore, setReadMore] = useState(false)

  useEffect(() => {
    if(!Type.includes(type)){
      throw new Error("Invalid Content Type")
    }
    const fetchSingleGif = async () => {
      //url look like : http://localhost:5173/gif/good-gm-gn-7HUhoMwO8Ul0t56QKx   here type = gif and slug = good-gm-gn-7HUhoMwO8Ul0t56QKx
      const typeId = slug.split("-");         //typeId: ['good', 'gm', 'gn', '7HUhoMwO8Ul0t56QKx']
      //console.log(typeId)   
      const {data} = await gf.gif(typeId[typeId.length-1])   //gf.gif(7HUhoMwO8Ul0t56QKx)
      //console.log(data)
      setSingleGif(data)
    }  

    const fetchRelatedGif = async () => {
      const relatedTypeId = slug.split("-");        
      const {data: related} = await gf.related(relatedTypeId[relatedTypeId.length-1], {
        limit: 15,
      })  
      setRelatedGifs(related)
    } 
    
    fetchSingleGif()
    fetchRelatedGif()
  },[gf,slug])  //whenever user click on related gifs then slug changed and we want to show that related gif so we re-render whenever slug changed in url


  return (
    <div className='grid grid-cols-4 my-4 gap-4'>
      
      {/* Left Bar of author details only visible on screen bigger than sm */}
      <div className='hidden sm:block'>

        {/* gif desc,name */}
        <div className='hidden sm:block'>
          {singleGif.user ? (
            <div>
              <div className='flex flex-col gap-2 min-[830px]:flex-row'>
                {/*Img of gif owner */}
                <img 
                  src={singleGif?.user?.avatar_url} 
                  alt={singleGif?.user?.display_name}
                  className='h-14 w-14'
                />
                {/* Name of gif owner */}
                <div>
                  <div className='font-bold'>{singleGif?.user?.display_name}</div>
                  <div className='text-gray-400'>{singleGif?.user?.username}</div>
                </div>
              </div>
               
              {/* Read more */}
              {singleGif?.user?.description && (
                <>
                {/* description */}
                <p className='mt-4 text-sm text-gray-300'>
                  <div>
                    {readMore 
                      ? singleGif?.user?.description               //when we click Read more btn then it toggle readMore=true so we render full descp
                      : singleGif?.user?.description.slice(0,60)  //initially readMore=false so we render only 100 char
                    }
                  </div>
                </p>  
                {/* read more toggle button */}
                <div>
                  <button onClick={() => setReadMore(!readMore)} className = "text-gray-400 font-bold cursor-pointer" >
                    {readMore
                      ? <span className='flex gap-1 items-center'>Read Less<HiChevronUp size={20}/></span>
                      : <span className='flex gap-1 items-center'>Read More<HiChevronDown size={20}/></span>
                    }
                  </button>
                </div>
               </>
              )}

            </div>
            ) : ( <p className='text-gray-400'>No user Found</p> )
          }
        </div>
        
        {/* Socials*/}
        <FollowOn/>

        {/* Hr Line */}
        <div className='w-full bg-gray-700 h-0.5 my-4'></div>

        {/* Source for some gifs not every gifs have source*/}
        {singleGif.source ? (
           <div>
            <span className='text-gray-400'>Source</span>
            <div className='flex items-center text-sm gap-1 font-bold'>
              <HiOutlineExternalLink size={25}/>
              <a href={singleGif.source} target='blank' className='truncate'> {singleGif.source} </a>
            </div>
           </div>
          ) : (
            <span className='text-gray-400'>No source available</span>
          )
        }
      </div>



      {/* Right-side - it take all 4 cols for screen size < sm and take 3 cols for screen size >= sm*/}
      <div className='col-span-4 sm:col-span-3'>
        
        <div className='flex gap-6 mb-5'>
          {/*gif*/}
          <div className='w-full sm:w-3/4'>
            <div className='font-bold font-[poppins] text-gray-200 truncate mb-4'>{singleGif.title}</div>
            <Gif gif={singleGif}/>
            
          
            {/*Mobile UI - for screen size < sm */}
            <div className='flex flex-col sm:hidden'>
             
             <div className='min-[500px]:flex min-[500px]:justify-between'>
               {singleGif.user ? (
                <div className='flex gap-2 items-center'>
                  {/* gif owner image */}
                  <img 
                    src={singleGif?.user?.avatar_url} 
                    alt={singleGif?.user?.display_name}
                    className='h-14'
                  />
                  {/* Name of gif owner */}
                  <div>
                    <div className='font-bold'>{singleGif?.user?.display_name}</div>
                    <div className='text-gray-400'>{singleGif?.user?.username}</div>
                  </div> 
                </div>
                 ) : ( <p className='text-gray-400'>No user Found</p> )
                }
                
                {/*fav,share,download*/}
                <FavDownShare singleGif={singleGif} flexprop="flex gap-2" textsize="text-lg" gap="gap-1" iconSize="20" />
              </div>

              {/* Socials */}
              <FollowOn/>
            </div>
            {/*Mobile UI end*/}
          </div>

          {/*fav,share,download*/}
          <div className='hidden sm:block mt-4'>
            <FavDownShare singleGif={singleGif} flexprop="flex flex-col gap-6" textsize="text-xl" gap="gap-2" iconSize="30"/>
          </div>

        </div>
       
        {/* related gifs */}
        <span className='font-bold text-3xl font-[poppins]'>Related Gifs❤️</span>
        
        <Suspense fallback={<Loader/>}>
          <div className='mt-5 columns-2 md:columns-3 gap-2'>
           {relatedGifs.length > 0 ? (
            relatedGifs.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id}/>
            ))
            ) : (
             <p>No related Gifs found</p>
            )}
          </div>
        </Suspense>
         
      </div>

    </div>
  )
}

export default SingleGifPage
