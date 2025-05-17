import { Navigate } from "react-router-dom";
import useAuth from "@/context/useAuth";
import PropTypes from "prop-types";
import { Fragment } from "react";
const PrivateRoute = ({ component: Component, layout: Layout = Fragment }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  const LayoutComponent = Layout || Fragment;
  return (
    <LayoutComponent>
      <Component />
    </LayoutComponent>
  );
};
PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  layout: PropTypes.elementType, 
};

export default PrivateRoute;

