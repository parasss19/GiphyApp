import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GifContext } from '../context/GifContext'
import FilterGifs from '../components/FilterGifs'
import Gif from '../components/Gif'

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([])
  
  const {gf, filter} = useContext(GifContext)

  const {query} = useParams()  //extract 'query' from search using useParams hook , '/search/:query'

  const fetchSearchResults = async() =>{
    const {data} = await gf.search(query,{
      limit: 25,
      type:filter,   //either gifs, sticker or text
      lang: 'en',
      sort: 'relevant'
    })
    setSearchResults(data);
  }

  //whenever query or filter change fetch new gifs,stickers,text
  useEffect(() =>{
    fetchSearchResults()
  },[filter,query])


  return (
    <div className='my-4'>
      {/* first we render query we searched for */}
      <h2 className='text-5xl font-extrabold pb-3'>{query}</h2>

      {/* then we render our filter component and we pass alignleft = 'true' coz we want to render filter on leftside*/}
      <FilterGifs alignLeft = 'true' />  

      {/* Now we render the gifs based on query */}
      {searchResults.length ? (
        <div className='columns-2 md:columns-3 lg:columns-4 gap-2'>
          {searchResults.map((gif) => (
            <Gif gif = {gif} key={gif.id}/>
           ))
          }
       </div>
      ) : (
        <span>
          No Gifs found for {query}. Try searching for Stickers instead?
        </span>
        )}
    </div>
  )
}

export default SearchPage
