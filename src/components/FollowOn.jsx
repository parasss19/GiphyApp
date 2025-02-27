import React from 'react'
import { FaGithub, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

const FollowOn = () => {
  return (
    <div className='my-3 font-bold text-gray-400'>
     <span>Follow On:</span>
     <div className='flex gap-5 pt-3'>
        <a className='hover:text-gray-100' target='blank' href="https://github.com/parasss19"><FaGithub size={20}/></a>
        <a className='hover:text-gray-100' target='blank' href="https://twitter.com/Parasss1902"><FaXTwitter size={20}/></a>
        <a className='hover:text-gray-100' target='blank' href="https://www.linkedin.com/in/paras-mehta19/"><FaInstagram size={20}/></a>
      </div>
    </div>
  )
}

export default FollowOn
