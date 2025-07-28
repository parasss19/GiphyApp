import { useContext, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GifContext } from '../context/GifContext';
import SearchBarGifs from './SearchBarGifs';
import axios from 'axios';
import toast from 'react-hot-toast';
import { EllipsisVertical, HomeIcon, LogOut } from 'lucide-react';
import PopUpModel from './PopUpModel';
import logo from '../assets/logo.png'
import { CgClose } from 'react-icons/cg';
import { BsPerson } from 'react-icons/bs';

const Header = () => {
  const {gf, user, setUser, backendURL} = useContext(GifContext)
  const navigate = useNavigate();
  const location = useLocation(); //Detects route changes to close drop down of categories automatically whenever route change
  
  const [categories, setCategories] = useState([])
  const [showCategories, setShowCategories] = useState(false);
  
  //it is used for to open/close google auth model for login/signup
  const [isOpen, setIsOpen] = useState(false);   
  const openPopUp = () => {
    setIsOpen(true);
  }
  const closePopUp = () => {
    setIsOpen(false);
  }

  //it is used for open/close user menu when user authenticated
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  //used for closing usermenu when click outside
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


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

  const handleGoogleLogin = () => {
    window.open(`${backendURL}/api/auth/googleAuth`, "_self");
  }

  const logoutHandler = async () => {
    try {
      axios.defaults.withCredentials = true;
      const {data} = await axios.post(`${backendURL}/api/auth/logout`)
      if(data.success) {
        setUser(null);
        setShowUserMenu(false);
        toast.success("Logged Out");
        navigate("/landing");
      }else{
        toast.error("Something went wrong")
      }
    } 
    catch (error) {
      console.log("Logout failed:", error.message);
    }
  }


  return (
    <>
    {user
    //When user is logged-in/signed-up
    ? (
    <nav>
      <div className='relative flex gap-2 justify-between items-center mb-2'>
        {/* 1 Logo(left side) */}
        <Link to= '/' className='flex items-center gap-2'> 
          <img src={logo} alt="giphy-logo" className='w-5 sm:w-8' />
          <h1 className='text-[18px] sm:text-[38px] font-extrabold curson-pointer'>STICKY</h1>
        </Link>
          
        {/* 2 Right side  */}
        <div className='flex justify-center items-center gap-2'>
          {/* Buttons */}
          <div className='flex items-center gap-3'>
            {/*Categories btn*/}
            <button 
              onClick={() => setShowCategories(!showCategories)}
              className='hidden sm:block text-sm bg-gray-700 px-2 py-1 cursor-pointer rounded sm:text-lg am:px-2'
            >
              Categories
            </button>

            {showCategories && (
              <div className='absolute right-0 top-8 sm:top-12 px-6 pt-6 pb-9 w-full rounded-sm gradienteffect z-20'> 
                <div className='flex items-center justify-between'>
                  <span className='text-3xl font-extrabold'>Categories</span>
                  <button
                    onClick={() => setShowCategories(!showCategories)}
                    className="text-black bg-yellow-400 rounded-full p-2 cursor-pointer"
                  >
                    <CgClose className='w-3 h-3'/>
                  </button>
                </div>
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

            {/*Favourite btn*/}
            <div className="text-sm bg-gray-700 px-2 py-1 cursor-pointer rounded sm:text-lg sm:px-2">
              <Link to="/favorite">Favorite GIFs</Link>
            </div>
          </div>

          {/*User menu + avatar + logout*/}
          <div ref={menuRef} className='group text-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex justify-center items-center p-1 sm:px-4 sm:py-2  cursor-pointer'>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className='cursor-pointer w-7 h-7 sm:w-8 sm:h-8 rounded-full backdrop-blur-sm bg-white/30 p-3 flex items-center justify-center'
            >
              <span className='font-bold font-[outfit]'>{user.name[0] || <BsPerson/>}</span>
            </button>

            {/* drop down */}
            {showUserMenu && (
              <div className="absolute top-8 sm:top-12 right-0 z-10 text-black font-[outfit]">
                <ul className="w-full sm:w-[110px] flex flex-col justify-center items-center list-none px-1 py-2 text-white backdrop-blur-sm bg-black/60 rounded">
                  <li 
                    onClick={() => { 
                      navigate('/');
                      setShowUserMenu(false);
                    }}
                    
                    className="flex justify-between items-center hover:bg-white/30 rounded px-2 py-2 w-full"
                  >
                    <HomeIcon className="h-4 w-4" />
                    <span className='text-sm sm:text-lg'>Home</span> 
                  </li>
                
                  <li 
                    onClick={() => {
                      setShowCategories(!showCategories)
                      setShowUserMenu(false);
                    }}
                    className="sm:hidden flex justify-center gap-3 items-center hover:bg-white/30 rounded px-2 py-2 w-full"
                  >
                    <EllipsisVertical className='h-4 w-4'/>
                    <span className='text-sm sm:text-lg'>Categories</span> 
                  </li>
                    
                  <li 
                    onClick={logoutHandler}
                    className="flex justify-between items-center hover:bg-white/30 rounded px-2 py-2 w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    <span className='text-sm sm:text-lg'>Logout</span> 
                  </li>
                </ul>
              </div>
            )}
          </div> 

        </div>
      </div>

      {/* 3 Gif Search Bar */}
      <SearchBarGifs/>
    </nav>
    )
    
    //When user is logged out
    :(
    <nav>
      <div className='relative flex gap-2 justify-between items-center mb-2'>
          {/* 1 Logo */}
          <Link to= '/' className='flex items-center gap-2'> 
            <img src="/logo.svg" alt="giphy-logo" className='w-5 sm:w-8' />
            <h1 className='text-[18px] sm:text-[38px] font-extrabold curson-pointer'>STICKY</h1>
          </Link>
          
          {/* 2 authentication Button*/}
          <div className='flex gap-2 items-center text-md font-bold'>
            <button 
              onClick={openPopUp} 
              className='text-sm bg-gray-700 px-2 py-2 cursor-pointer rounded sm:text-lg sm:px-4 active:scale-95 transition-transform duration-150'
            >
              Get Started
            </button>

            <PopUpModel
              isOpen={isOpen}
              onClose={closePopUp}
              handleGoogleLogin={handleGoogleLogin}
            />
          </div>
      </div>
    </nav>
    )}

    </>
  )
}

export default Header
