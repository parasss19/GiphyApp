import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useEffect, useState } from "react";

const GifContext = createContext();     

//we use GifProvider in app.jsx to wrap entire routes of our appln
const GifProvider = ({children}) => {
    const [gifs, setGifs] = useState([])           //gifs state contains all the gifs
    const [filter, setFilter] = useState('gifs')   //filter state used to track on which filter we are either gifs, sticker,text
    const [favorites, setFavorites] = useState([])  //favourites state contains all fav gifs

    const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY)  


    //favourite arry contain ids of gif/sticker/text
    //fetch all favorites id from local storage
    useEffect(() =>{
      const favorites = JSON.parse(localStorage.getItem("favGifs")) || []
      setFavorites(favorites)
    },[])

    const addToFavorites = (id) =>{
      console.log(id);
        //if given gif/sticker/text already present then we remove it from favorites array
        if(favorites.includes(id)){
          const updatedFav = favorites.filter((itemId) => {
            return itemId !== id
          })
          localStorage.setItem("favGifs", JSON.stringify(updatedFav))
          setFavorites(updatedFav)
        }
        //if fav arry does not include that id then push that id into fav array
        else{
          const updatedFav = [...favorites]
          updatedFav.push(id)
          localStorage.setItem("favGifs", JSON.stringify(updatedFav))
          setFavorites(updatedFav)
        }
    }

    return(
     <>
     <GifContext.Provider value={{gf, gifs, setGifs, filter, setFilter, favorites, addToFavorites}}>     {/* The inner braces define that object with key value like gf:gf, gifs:gifs, etc., using the ES6 shorthand for object properties. */}
        {children} 
     </GifContext.Provider>
     </>
    )
}
export { GifProvider, GifContext} 