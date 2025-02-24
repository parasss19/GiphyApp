import React, { useContext } from 'react'
import { GifContext } from '../context/GifContext'
import { HiMiniArrowTrendingUp } from 'react-icons/hi2'

//dumy data for styling filter component
const filters = [
    {
      title: "GIFs",
      value: "gifs",
      background:"bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500",
    },
    {
      title: "Stickers",
      value: "stickers",
      background: "bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500",
    },
    {
      title: "Text",
      value: "text",
      background: "bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500",
    },
];


const FilterGifs = ({alignLeft = false, showTrendingIcon = false}) => {
  const {filter, setFilter} = useContext(GifContext)

  return (
    <div className={`flex my-3 gap-3 ${showTrendingIcon ? "justify-between flex-col sm:flex-row sm:items-center" : alignLeft ? "" : "justify-end" }`}>
      
      {/* Trending icon */}
      {showTrendingIcon && (
        <div className='flex gap-2 items-center'>
            <HiMiniArrowTrendingUp  size={25} className='text-teal-400'/>
            <span className='font-semibold text-gray-300 text-[20px]'>Trending</span>
        </div>
       )}
     
      {/* Filter */}
      <div className='flex gap-2 rounded-full bg-gray-800'>
        {filters.map((f) =>(
            <span 
              onClick={() => setFilter(f.value)}
              key={f.title}
              className={`${filter === f.value ? f.background : "" } font-semibold px-4 py-2 w-1/3 rounded-full text-center cursor-pointer`}
            >
             {f.title}
            </span>
        ))}
      </div>

    </div>
  )
}
  
export default FilterGifs
