import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { HiDotsVertical, HiMenuAlt3  } from 'react-icons/hi';
import { GifContext } from '../context/GifContext';


const Header = () => {
  const [categories, setCategories] = useState([])
  const [showCategories, setShowCategories] = useState(false);

  const {gf, gifs, filter, favorites} = useContext(GifContext)


  //Fetching gif categories
  const fetchGifCategories = async () =>{
    const {data} = await gf.categories()
    setCategories(data)
  }
  //call fetchGifCategories inside useEffect and pass empty dependency so it run only once when comp mount
  useEffect(() =>{
    fetchGifCategories()
  },[])


  return (
    <>
    {/* Navbar */}
    <nav>
        
        <div className='relative flex gap-2 justify-between items-center mb-2'>
          {/* Logo */}
          <Link to= '/' className='flex gap-2'> 
            <img src="/logo.svg" alt="giphy-logo" className='w-8' />
            <h1 className='text-5xl font-bold curson-pointer'>Giphy</h1>
          </Link>
          
          {/* Different Navigation/Categories */}
          <div className='flex gap-2 items-center text-md font-bold'>
            {
              //here we only want to show 5 navigation/category in header so we slice(0,5) categories and rest inside 3 dots icon
              categories?.slice(0,5).map((category) => (
                  <Link 
                   key={category.name}
                   to={`/${category.name_encoded}`} 
                   className = 'px-4 py-1 hover:gradienteffect border-b-4 hidden lg:block'
                  >
                  {category.name}
                 </Link>
                )
              )
            }

            {/* three dots  */}
            <button onClick={() => setShowCategories((showCategories) => !showCategories)}>
              <HiDotsVertical 
                size={35} 
                className = 'py-1 hover:gradienteffect border-b-4 hidden lg:block'
              />  
            </button>


            {/* Favourite gifs */}
            <div className='bg-gray-700 h-9 py-1 px-2 rounded cursor-pointer'>
              <Link to="/favorite">Favorite GIFs</Link>
            </div>

            {/* Mobile View */}
            {/* Hamburger for small screen */}
            <button>
             <HiMenuAlt3 size={30} className="text-sky-400 block lg:hidden" />
            </button>
          </div>

          {/* when click on 3 dots then categories open */}
          {showCategories && (
            <div className='absolute right-0 top-16 px-6 pt-6 pb-9 w-full gradienteffect z-20'> 
              <span className='text-3xl font-extrabold'>Categories</span>
              <hr className='bg-gray-100 opacity-50 my-4'/>
              <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                {
                  categories?.map((category) => (
                    <Link
                     key={category.name}
                     to={`/${category.name_encoded}`} 
                     className='font-bold'
                    >
                     {category.name}
                   </Link>
                  ))
                }
              </div>
            </div>
          )}
        </div>



      {/* Gif Search Bar */}


    </nav>
    </>
  )
}

export default Header
