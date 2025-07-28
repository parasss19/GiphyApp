import { CgClose } from 'react-icons/cg';
import backgroundImage from '../assets/background.png'
import { FcGoogle } from 'react-icons/fc';

const PopUpModel = ({isOpen, onClose, handleGoogleLogin}) => {

    if(!isOpen) return null;

    return (
        <div className='flex gap-2 items-center text-md font-bold'>
            <div className="fixed inset-0 backdrop-blur-md flex items-center justify-center z-50">
                <div className="rounded-xl p-8 w-[250px] h-[180px] sm:w-[450px] sm:h-[200px] relative bg-center bg-cover bg-no-repeat" style={{backgroundImage: `url(${backgroundImage})`}}>
                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-2 right-3 text-black bg-red-500 rounded-full p-2 cursor-pointer"
                >
                  <CgClose className='w-3 h-3 sm:w-5 sm:h-5'/>
                </button>
                
                <h2 className="mb-10 text-lg sm:text-2xl text-center text-yellow-300 font-bold font-[outfit] backdrop-blur-lg w-fit mx-auto px-4 py-0.5 rounded-lg">Sign In</h2>

                {/* Google Button */}
                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center  sm:w-xs mx-auto gap-2 sm:gap-3 px-4 py-2 border rounded-lg bg-black hover:bg-black/80 cursor-pointer"
                >
                  <FcGoogle className="text-xl sm:text-2xl" />
                  <span className='text-xs sm:lg'>Continue with Google</span>
                </button>
                </div>
            </div>              
        </div>
    )
}

export default PopUpModel