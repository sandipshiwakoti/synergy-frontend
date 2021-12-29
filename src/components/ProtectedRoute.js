import { useGlobalContext } from "../customHooks/context";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, role, ...restProps }) => {
  const { isAuth, authUser } = useGlobalContext();
  return (
    <Route
      {...restProps}
      render={(props) => {
        if (isAuth && authUser.role === role) {
          return <Component {...restProps} {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
