import { useContext } from "react"
import { GifContext } from "../context/GifContext"
import { Navigate } from "react-router-dom";


const PublicRoutes = ({children}) => {
  const {user} = useContext(GifContext);
  if (user) {
    return <Navigate to="/" replace />;
  }

  // If user is NOT authenticated, render the public route (/landing)
  return children
}

export default PublicRoutes