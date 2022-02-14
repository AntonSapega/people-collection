import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TitleWithPagination from "../../layouts/TitleWithPagination/TitleWithPagination";

const People = () => {
  const navigate = useNavigate();
  const routeParams = useParams();
  const totalPages = useSelector(state => state.peoplePage.pagesAmount);

  useEffect(() => {
    if (!routeParams.page) {
      navigate('1');
    }
  }, [routeParams])

  return (
    <TitleWithPagination page={routeParams.page} totalPages={totalPages}>
      <Outlet />
    </TitleWithPagination>
  )
}

export default People;