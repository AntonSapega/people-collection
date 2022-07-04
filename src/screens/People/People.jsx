// import React, { useEffect } from "react";
// import { Outlet, useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import TitlePaginationLayout from "../../layouts/TitlePaginationLayout/TitlePaginationLayout";

// const People = () => {
//   const navigate = useNavigate();
//   const routeParams = useParams();
//   const totalPages = useSelector(state => state.peoplePage.pagesAmount);

//   useEffect(() => {
//     if (!routeParams.page) {
//       navigate('1');
//     }
//   }, [routeParams])

//   return (
//     <TitlePaginationLayout title='People' description='Remarkable people' page={routeParams.page} totalPages={totalPages}>
//       <input type="text" placeholder="try to find something" />
//       <Outlet />
//     </TitlePaginationLayout>
//   )
// }

// export default People;




import React, { useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TitlePaginationLayout from "../../layouts/TitlePaginationLayout/TitlePaginationLayout";

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
    <TitlePaginationLayout title='People' description='Remarkable people' page={routeParams.page} totalPages={totalPages} />
  )
}

export default People;