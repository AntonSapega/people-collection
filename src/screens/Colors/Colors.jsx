import React from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import TitleWithPagination from '../../layouts/TitleWithPagination/TitleWithPagination';

const Colors = () => {
  const routeParams = useParams();
  const navigate = useNavigate();
  const totalPages = useSelector(state => state.colorsPage.pagesAmount);

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

export default Colors;