import { GiphyFetch } from "@giphy/js-fetch-api";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

const GifContext = createContext();     

//we use GifProvider in app.jsx to wrap entire routes of our appln
const GifProvider = ({children}) => {
    //when we refresh our page even we are singup/login it again logged out the user so to prevent this we send our cookies 
    axios.defaults.withCredentials = true;

    const [gifs, setGifs] = useState([])           //gifs state contains all the gifs
    const [filter, setFilter] = useState('gifs')   //filter state used to track on which filter we are either gifs, sticker,text
    const [favorites, setFavorites] = useState([])  //favourites state contains all fav gifs
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(false);

    const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY)  
    const backendURL = import.meta.env.VITE_BACKEND_URL

    //fetch user authentication status
    const getUser = async () => {
       try {
        const {data} = await axios.get(`${backendURL}/api/auth/me`,{ withCredentials: true,}) 
        if(data.success){
          setUser(data.user);
        } 
       } 
       catch (error) {
        setUser(null);
        console.log(error.message);
      } 
    } 

    //fetch user when component mount
    useEffect(() =>{
      getUser();
    },[])

    //fetch all favorites id from local storage only when user is authenticated
    useEffect(() => {
      if (user) {
        const favsFromStorage = JSON.parse(localStorage.getItem("favGifs")) || []   //favourite arry contain ids of gif/sticker/text
        setFavorites(favsFromStorage)
      }
    }, [user]) // run when user is updated

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
     <GifContext.Provider value={{gf, gifs, setGifs, filter, setFilter, favorites, addToFavorites, user, setUser, backendURL, loading, setLoading}}>     {/* The inner braces define that object with key value like gf:gf, gifs:gifs, etc., using the ES6 shorthand for object properties. */}
        {children} 
     </GifContext.Provider>
     </>
    )
}
export { GifProvider, GifContext} 