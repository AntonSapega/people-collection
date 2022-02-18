import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import TitlePaginationLayout from '../../layouts/TitlePaginationLayout/TitlePaginationLayout';

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
    <TitlePaginationLayout title='Colors' description='Amazing colors here' page={routeParams.page} totalPages={totalPages} />
  )
}

export default Colors;