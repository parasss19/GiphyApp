import React, { useState } from 'react'
import { HiDotsVertical, HiMenuAlt3  } from 'react-icons/hi';
import { Link } from 'react-router-dom';


const Header = () => {
  const [categories, setCategories] = useState([])
  const [showCategories, setShowCategories] = useState(false);

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
          
          {/* Different Navigation */}
          <div className='flex gap-2 items-center text-md font-bold'>
            {/* Categories are initialy hidden and block on large screen*/}
            <Link className = 'px-4 py-1 hover:gradienteffect border-b-4 hidden lg:block'>
              Reactions
            </Link>

            <Link className = 'px-4 py-1 hover:gradienteffect border-b-4 hidden lg:block'>
              Reactions
            </Link>

            <Link className = 'px-4 py-1 hover:gradienteffect border-b-4 hidden lg:block'>
              Reactions
            </Link>

            <Link className = 'px-4 py-1 hover:gradienteffect border-b-4 hidden lg:block'>
              Reactions
            </Link>

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
              <span>Categories</span>
              <hr />
              <div>
                <Link className='font-bold'>Reactions</Link>
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
