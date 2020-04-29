import React from "react";
import {
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import LoginPage from "../../auth/components/LoginPage";
import PublicMapView from "../../location/components/PublicMapView";
import LoginMapView from "../../location/components/LoginMapView";
import LocationList from "../../location/components/LocationList";
import { ProtectedRoute } from "../../core/components/ProtectedRoute";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import signout from "../../utils/signout"
import MarkLocation from "../../location/components/MarkLocation";
import PropTypes from 'prop-types';




const useStyles = makeStyles({
    button: {
        width: "100%",
        height: "12vh"
    }
});

const defaultProps = {

}

const propTypes = {


}


const routes = [
    {
        path: "/",
        exact: true,
        main: () => <LoginPage />
    },
    {
        path: "/map",
        exact: true,
        main: () => <PublicMapView />
    }
];

const protectedRoutes = [
    {
        path: "/locations/new",
        exact: true,
        main: () => <LoginMapView />
    },
    {
        path: "/locations",
        exact: true,
        main: () => <LocationList />
    },
    {
        path: "/locations/:id",
        exact: true,
        main: () => <MarkLocation />
    }
]

const navBarContent = {
    beforeLogin: [
        {
            to: "/",
            exact: true,
            sidebar: "Login",
        },
        {
            to: "/map",
            exact: true,
            sidebar: "Map",
        }],
    afterLogin: [
        {
            to: "/locations/new",
            exact: true,
            sidebar: "Add Location",
        },
        {
            to: "/locations",
            exact: true,
            sidebar: "View Locations",
        },
        {
            to: "",
            exact: true,
            sidebar: "Logout",
            onClick: () => signout()
        }
    ]
}

const NavBar = (props) => {

    const classes = useStyles(props);
    // const state = useSelector(state => state)
    // console.debug("whole redux is", state);
    const isLogin = useSelector(state => state.authentication.isLogin);

    return (
        <div style={{ display: "flex", height: "100%", width: "100%" }}>
            <div
                style={{
                    padding: "10px",
                    width: "20%",
                    background: "#f0f0f0",
                }}
            >
                {!isLogin && navBarContent.beforeLogin.map((route, index) => (
                    <Button component={NavLink}
                        key={index}
                        to={route.to}
                        style={{ textDecoration: "none" }}
                        activeStyle={{
                            background: "#3f51b5",
                            color: "white"
                        }}
                        isActive={(match, location) => {
                            return route.to === location.pathname
                        }} onClick={route.onClick} className={classes.button}>{route.sidebar}</Button>
                ))}
                {isLogin &&
                    navBarContent.afterLogin.map((route, index) => (
                        <Button
                            key={index}
                            to={route.to}
                            component={NavLink}
                            style={{ textDecoration: "none" }}
                            activeStyle={{
                                background: "#3f51b5",
                                color: "white"
                            }}
                            isActive={(match, location) => {
                                return route.to === location.pathname
                            }} onClick={route.onClick} className={classes.button}>{route.sidebar}</Button>
                    ))
                }
            </div>

            <div style={{ width: "80%", overflowY: 'auto' }}>
                <Switch>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            component={route.main}
                        />
                    ))}
                    {protectedRoutes.map((route, index) => (
                        <ProtectedRoute
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            isLogin={isLogin}
                            component={route.main}
                        />
                    ))}
                </Switch>
            </div>
        </div>
    );
}

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

export default NavBar;