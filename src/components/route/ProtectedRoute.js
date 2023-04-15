import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Navigate } from "react-router-dom";

import { loadUser } from "../../actions/userActions";

import Spinner from "react-bootstrap/Spinner";

const ProtectedRoute = ({ children, isAdmin }) => {
  const dispatch = useDispatch();

  const {
    isAuthenticated = false,
    user,
    loading = true,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [isAuthenticated, loading, user, dispatch]);

  if (loading) {
    return (
      <Spinner
        className="loader"
        animation="border"
        variant="warning"
      ></Spinner>
    );
  }

  if (!loading && isAuthenticated) {
    if (isAdmin === true && user.role !== "admin") {
      return <Navigate to="/" />;
    }
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
