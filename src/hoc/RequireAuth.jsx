import { useLocation, Navigate } from "react-router-dom";

const RequireAuth = ({children}) => {
  const location = useLocation();
  const auth = JSON.parse(sessionStorage.getItem('token'));

  if (!auth) {
    return <Navigate to='/login' state={{from: location}} />
  }

  return children
}

export default RequireAuth;