import React, { useEffect } from "react";
import { useNavigate, Outlet, Route, Navigate } from "react-router-dom";

// const PrivateRouter = (Component) => {
//   const token = window.localStorage.getItem("userInfo");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!token) {
//       navigate("/login", { replace: true });
//     }
//   }, [navigate, token]);

// return token ?

// };

const PrivateRouter = (Component) => {
  const user = JSON.parse(window.localStorage.getItem("userInfo"));
  const navigate = useNavigate();

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRouter;
