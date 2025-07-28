import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import search1 from '../assets/search1.gif'
import save from '../assets/save.gif'
import share from '../assets/share.gif'
import download from '../assets/download.gif'
import backgroundImage from '../assets/background.png'
import { useContext, useState } from 'react';
import PopUpModel from './PopUpModel';
import { GifContext } from '../context/GifContext';

const Landing = () => {

  const {backendURL} = useContext(GifContext)
  const [isOpen, setIsOpen] = useState(false);
    
  const openPopUp = () => {
    setIsOpen(true);
  }
  const closePopUp = () => {
    setIsOpen(false);
  }

  const handleGoogleLogin = () => {
    window.open(`${backendURL}/api/auth/googleAuth`, "_self");
  }

  return (
  <>
    {/* Hero section */}
    <section className="relative min-h-screen mt-5 flex flex-col justify-center items-center text-center px-6 sm:px-10" >
      {/* blur bg image */}
      <div
        className='absolute inset-0 bg-center bg-cover bg-no-repeat  brightness-50 opacity-90 -z-10  rounded-t-lg'
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
      </div>
      
      {/* Heading */}
      <motion.h1
        className="font-[rubik] text-4xl sm:text-6xl font-extrabold text-white leading-tight max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        Discover, Save & Share <span className="text-black text-4xl rounded-xl px-2 py-1 border bg-yellow-500">GIFs</span> Instantly with Sticky
      </motion.h1>

      {/* Description */}
      <motion.p
        className="font-[rubik] text-lg sm:text-xl mt-6 px-1 py-2 text-white backdrop-blur-sm bg-transparent rounded-lg max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
        Your personalized GIF companion — explore trending and category-based GIFs, favorite them, and download or share instantly. All with a sticky-smooth interface!
      </motion.p>

      {/* Button */}
      <motion.button
        onClick={() => navigate('/explore')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <button 
          onClick={openPopUp} 
          className="cursor-pointer bg-yellow-500 text-black font-semibold text-[15px] px-[24px] py-[10px] rounded-[12px] mt-8 shadow-lg active:scale-95 transition-transform duration-150">
            Get started for free
        </button>

        <PopUpModel
          isOpen={isOpen}
          onClose={closePopUp}
          handleGoogleLogin={handleGoogleLogin}
        />
      </motion.button>
    </section>

    {/* Features section*/}
    <section className="px-6 sm:px-20 py-10 bg-[#092635] rounded-b-lg">
      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto text-center mb-12 font-[outfit]">
          <h2 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-teal-500 via-orange-500 to-yellow-500 text-transparent bg-clip-text"> Features </h2>
          <p className="text-lg mt-2 text-[#FAFAFA]"> Explore what makes Sticky awesome and fun to use! </p>
        </div>
      </motion.div>

      {/* Feature 1 - search*/}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-5 gap-5 mb-16 text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-[20px] sm:text-3xl mb-3 font-mono">
            <h3 className="font-semibold mb-3 "><span className='bg-gradient-to-t from-blue-500 via-yellow-500 to-teal-500 text-transparent bg-clip-text'>Search Trending GIFs</span>🔎</h3>
            <ul>
              <li className='flex items-center gap-2 text-xl sm:text-2xl'><CheckCircle className='shrink-0'/>find trending GIFs</li>
              <li className='flex items-center gap-2 text-xl sm:text-2xl'><CheckCircle className='shrink-0'/>animated stickers</li>
              <li className='flex items-center gap-2 text-xl sm:text-2xl'><CheckCircle className='shrink-0'/>text animations in real-time</li>
            </ul>
          </div>
        </motion.div>
        
        {/* Right Image Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className='w-44 md:w-60 lg:w-68 flex items-center justify-center'>
            <img src={search1} alt="App features preview" className="" />
          </div>
        </motion.div>
      </div>

      {/* Feature 2 - save*/}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-5 gap-5 mb-16 text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-[20px] sm:text-3xl mb-3 font-mono">
            <h3 className="font-semibold mb-3"><span className='bg-gradient-to-t from-blue-500 via-yellow-500 to-teal-500 text-transparent bg-clip-text'>Save Favorites</span>💾</h3>
            <ul>
              <li className='flex items-center gap-2 text-xl sm:text-2xl'><CheckCircle className='shrink-0'/>Heart your favorite GIFs</li>
              <li className='flex items-center gap-2 text-xl sm:text-2xl'><CheckCircle className='shrink-0'/>Access Gifs anytime</li>
            </ul>
          </div>
        </motion.div>
        
        {/* Right Image Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className='w-44 md:w-60 lg:w-68 flex items-center justify-center'>
            <img src={save} alt="App features preview" className="" />
          </div>
        </motion.div>
      </div>

      {/* Feature 3 - share*/}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-5 gap-1 mb-16 text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-[20px] sm:text-3xl font-mono">
            <h3 className="font-semibold mb-3 text-center lg:text-left"><span className='bg-gradient-to-t from-blue-500 via-yellow-500 to-teal-500 text-transparent bg-clip-text'>Share with Friends</span>📤</h3>
            <ul>
              <li className='flex items-center gap-2 text-xl sm:text-2xl '><CheckCircle className='shrink-0'/>Instantly copy link of your favorite GIFs</li>
              <li className='flex items-center gap-2 text-xl sm:text-2xl'><CheckCircle className='shrink-0'/>Share it with friends and have fun🕺🏻</li>
            </ul>
          </div>
        </motion.div>
        
        {/* Right Image Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className='w-44 md:w-60 lg:w-68 flex items-center justify-center'>
            <img src={share} alt="App features preview" className="" />
          </div>
        </motion.div>
      </div>

      {/* Feature 4 - download*/}
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between px-5 gap-4 text-white">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="text-[20px] sm:text-3xl mb-3 font-mono ">
            <h3 className="font-semibold mb-3 text-center lg:text-left"><span className='bg-gradient-to-t from-blue-500 via-yellow-500 to-teal-500 text-transparent bg-clip-text'>Download GIFs </span>📥</h3>
            <ul>
              <li className='flex items-center gap-2 text-xl sm:text-2xl'><CheckCircle className='shrink-0'/>Save any GIF to your device with a tap</li>
              <li className='flex items-center gap-2 text-xl sm:text-2xl'><CheckCircle className='shrink-0'/>Perfect for reactions, memes, or just for fun!</li>
              <li className='flex items-center gap-2 text-xl sm:text-2xl'><CheckCircle className='shrink-0'/>High quality Gifs, stickers, animated text</li>
            </ul>
          </div>
        </motion.div>
        
        {/* Right Image Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className='w-44 md:w-60 lg:w-68 flex items-center justify-center'>
            <img src={download} alt="App features preview" className="" />
          </div>
        </motion.div>
      </div>
    </section>
  </>
  );
};

export default Landing;
