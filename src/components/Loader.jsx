import React from 'react'
import {RingLoader} from "react-spinners";

const Loader = () => {
  return (
    <div className='flex items-center justify-center'>
      <RingLoader color="white" size={100} />
    </div>
  )
}

export default Loader
