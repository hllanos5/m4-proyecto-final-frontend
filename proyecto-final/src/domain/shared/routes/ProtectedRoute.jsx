import proptypes from 'prop-types';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { getMyInformation } from '../api/authApi';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoute({ children }) {
    const authToken = localStorage.getItem('authToken');
    const [, navigate] = useLocation();
    const { setUserData } = useContext(AuthContext);
    const { data, isError, isLoading } = useQuery({
      queryKey: ['user'],
      queryFn: () => getMyInformation(authToken),
      retry: 1,
      enabled: Boolean(authToken),
    });
  
    useEffect(() => {
      if (data && !isError && !isLoading) {
        setUserData(data);
      }
    }, [data, isError, setUserData, isLoading]);
  
    if (isLoading) {
      return <div>Cargando ...</div>;
    }
  
    if (!authToken || (isError && !data)) {
      localStorage.removeItem('authToken');
      console.clear();
      return navigate('/');
    }
  
    return children;
  }
  
  ProtectedRoute.propTypes = {
    children: proptypes.any.isRequired,
  };
  
  export default ProtectedRoute;