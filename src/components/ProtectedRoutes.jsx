import { useContext } from 'react';
import { GifContext } from '../context/GifContext'
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
  const {user} = useContext(GifContext);
  if (!user) {
    return <Navigate to="/landing" replace />;
  }

  return children;
}

export default ProtectedRoutes