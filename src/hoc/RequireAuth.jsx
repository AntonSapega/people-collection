import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = ( {children} ) => {
  const location = useLocation();
  const token = sessionStorage.getItem('token');
  console.log(token)

  if (!token) {
    return <Navigate to='/login' state={{from: location}} />
  }

  return children
}

export default RequireAuth;