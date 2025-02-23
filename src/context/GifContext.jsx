import { createContext } from "react";

const GifContext = createContext()
const GifProvider = ({children}) => {
    return(
        <>
        <GifContext.Provider> {children} </GifContext.Provider>
        </>
    )
}

export default GifProvider