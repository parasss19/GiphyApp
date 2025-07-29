import { useContext } from 'react';
import { GifContext } from '../context/GifContext'
import { Navigate } from 'react-router-dom'
import Loader from './Loader';

const ProtectedRoutes = ({children}) => {
  const {user, loadingUser } = useContext(GifContext);
  if(loadingUser) return <Loader />;  

  if (!user) {
    return <Navigate to="/landing" replace />;
  }

  return children;
}

export default ProtectedRoutes