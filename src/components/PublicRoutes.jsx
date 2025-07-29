import { useContext } from "react"
import { GifContext } from "../context/GifContext"
import { Navigate } from "react-router-dom";


const PublicRoutes = ({children}) => {
  const {user, loadingUser} = useContext(GifContext);

  if (loadingUser) return <Loader />;
  
  if (user) {
    return <Navigate to="/" replace />;
  }

  // If user is NOT authenticated, render the public route (/landing)
  return children
}

export default PublicRoutes