import React, { useContext, useEffect, useState } from 'react'
import { GifContext } from '../context/GifContext';
import { useParams } from 'react-router-dom';
import Gif from '../components/Gif';
import FollowOn from '../components/FollowOn';

const Categories = () => {
  const [results, setResults] = useState([]);

  const {gf} = useContext(GifContext);

  const {category} = useParams();

  const fetchCategoryResults = async () =>{
    //here the gf.gifs i used to fetch data is diff from the 'gifs' we are using in GifContext.Provider
    const {data} = await gf.gifs(category, category)
    console.log(data);
    setResults(data);
  }
  useEffect(() => {
    fetchCategoryResults();
  },[category])


  return (
    <div className='flex flex-col sm:flex-row gap-5 my-5'>
      
      {/* left side(on large screen) =  Render Single gif of selected category on */}
      <div className=''>
        {results.slice(0,1).map((gif) => (
          <Gif key={gif.id} gif={gif}  />
        ))}  

        <span>Dont&apos;t tell it to me, GIF it to me!</span>

        {/* Follow icons */}
        <FollowOn/>

        {/* horizontal line */}
        <div className='w-full bg-gray-700 h-0.5 mt-4'></div>
      </div>


      {/* right side(on large screen) = Render category name and all the gifs related to the selected category on */}
      <div>
        <h2 className='text-3xl font-extrabold'> 
          <span className='text-5xl font-extrabold text-gray-400 capitalize mr-2'>
            {/* some categories like Art & Design it render like 'Art - design' so we have to split and then join*/}
            {category.split('-').join(" & ")} 
          </span> 
          GIFs
        </h2>
        
        <h2 className='text-lg text-gray-500 hover:text-gray-50 cursor-pointer font-bold'>
          @{category}
        </h2>

        {/* gifs rendering */}
        <div className='my-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2'>
          {/* we remove one gif that is rendering already on left side */}
          {results.slice(1).map((gif) => (
            <Gif key={gif.id} gif={gif}  />
          ))}
        </div>
      </div>
       
    </div>
  )
}

export default Categories
