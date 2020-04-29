import React from "react";
import { Route, Redirect } from "react-router-dom";


export const ProtectedRoute = ({
    component: Component,
    isLogin,
    ...rest
}) => {

    return (
        <Route
            {...rest}
            render={props => {
                if (isLogin) {
                    return <Component {...props} />;
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    );
                }
            }}
        />
    );
};

