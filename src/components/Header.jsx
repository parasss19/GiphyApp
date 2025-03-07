import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import { HiDotsVertical, HiMenuAlt3  } from 'react-icons/hi';
import { GifContext } from '../context/GifContext';
import SearchBarGifs from './SearchBarGifs';


const Header = () => {
  const [categories, setCategories] = useState([])
  const [showCategories, setShowCategories] = useState(false);

  const {gf} = useContext(GifContext)

  const location = useLocation(); //Detects route changes to close drop down of categories automatically whenever route change

  //Fetching gif categories - whenever our route change(detect using useLocation()) then useEffect re-render and also close categories by setShowCategories(false);
  useEffect(() =>{
    const fetchGifCategories = async () =>{
      const {data} = await gf.categories()
      //console.log(data);
      setCategories(data)
    }
    fetchGifCategories()

    setShowCategories(false);
  },[location.pathname])


  return (
    <>
    {/* Navbar */}
    <nav>
      
      <div className='relative flex gap-2 justify-between items-center mb-2'>
          {/* 1 Logo */}
          <Link to= '/' className='flex gap-2'> 
            <img src="/logo.svg" alt="giphy-logo" className='w-8' />
            <h1 className='text-[38px] font-extrabold curson-pointer'>STICKY</h1>
          </Link>
          
          {/* 2 Different Navigation/Categories */}
          <div className='flex gap-2 items-center text-md font-bold'>
            
            {/* Top 5 categories we render in header */}
            {
              //we slice(0,5) categories and rest inside 3 dots icon
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
            <button onClick={() => setShowCategories(!showCategories)}>
              <HiDotsVertical 
                size={35} 
                className = 'py-1 hover:gradienteffect border-b-4 hidden lg:block'
              />  
            </button>


            {/* Favourite gifs */}
            <div className="text-sm bg-gray-700 px-2 py-2 cursor-pointer rounded sm:text-lg sm:px-4">
              <Link to="/favorite">Favorite GIFs</Link>
            </div>

            {/* Mobile View */}
            {/* Hamburger for small screen */}
            <button onClick={() => setShowCategories(!showCategories)} >
             <HiMenuAlt3 size={30} className="text-sky-400 block lg:hidden" />
            </button>
            {/* Mobile View end */}
          </div>

          {/* 3 when click on 3 dots then categories open */}
          {showCategories && (
            <div className='absolute right-0 top-15 px-6 pt-6 pb-9 w-full gradienteffect z-20'> 
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


      {/* 4 Gif Search Bar */}
      <SearchBarGifs/>
      

    </nav>
    </>
  )
}

export default Header
