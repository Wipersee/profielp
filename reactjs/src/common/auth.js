import { Route, Redirect } from "react-router";

export function isAuth() {
  // function for checking if user is logged in
  return true;
}

export function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuth() === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
}

export function whichRole() {
  const role = 1;
  return role === 0 ? "Customer" : "Performer";
}
