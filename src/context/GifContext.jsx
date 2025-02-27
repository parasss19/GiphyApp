import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useState } from "react";

const GifContext = createContext();     

//we use GifProvider in app.jsx to wrap entire routes of our appln
const GifProvider = ({children}) => {
    const [gifs, setGifs] = useState([])           //gifs state contains all the gifs
    const [filter, setFilter] = useState('gifs')   //filter state used to track on which filter we are either gifs, sticker,text
    const [favorites, setFavorite] = useState([])  //favourites state contains all fav gifs

    const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY)    

    return(
     <>
     <GifContext.Provider value={{gf, gifs, setGifs, filter, setFilter, favorites}}>     {/* The inner braces define that object with key value like gf:gf, gifs:gifs, etc., using the ES6 shorthand for object properties. */}
        {children} 
     </GifContext.Provider>
     </>
    )
}
export { GifProvider, GifContext} 