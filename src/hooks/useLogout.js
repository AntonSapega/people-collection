import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../enums/ROUTES";
import { removeUser } from '../store/user/reducers';
import { clearPeopleCollection, deletePersonMiddleware } from '../store/peopleDB/reducers';

export default function useLogout() {
  const user = useSelector(state => state.user.info);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return function () {
    dispatch(removeUser())
    dispatch(deletePersonMiddleware(user.id));
    dispatch(clearPeopleCollection());
    navigate(`${ROUTES.initial}`, {replace: true});
  }
}