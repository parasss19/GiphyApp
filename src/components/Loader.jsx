import React from 'react'
import {RingLoader} from "react-spinners";

const Loader = () => {
  return (
    <div className='flex items-center justify-center mt-14'>
      <RingLoader color="white" size={100} />
    </div>
  )
}

export default Loader
