import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../../auth/isAuthenticated";

//HOC: Pattern High Order Component
const PrivateRoute = ({component: Component, ...rest }) => {

    return(
    <Route 
        {...rest}
        component={props => (
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect 
                    to={'/iniciar-sesion'}
                />
            ) 
        )}
    />
    )
};

export default PrivateRoute;