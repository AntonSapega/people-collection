import { useDispatch } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { sessionController } from "../services/storage/sessionController";
import { removeUser } from '../store/user/reducers';

const RequireAuth = ( {children} ) => {
  const location = useLocation();
  const dispatch = useDispatch();

  if (!sessionController.getToken()) {
    dispatch(removeUser()); // Influence on Logout component (case when user is deleted manually from storage);
    return <Navigate to='/login' state={{from: location}} />
  }

  return children
}

export default RequireAuth;