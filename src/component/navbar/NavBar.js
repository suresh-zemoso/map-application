import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import LoginPage from "../login/LoginPage";
import PublicMapView from "../public-map/PublicMapView";
import LoginMapView from "../add-location/LoginMapView";
import LocationList from "../location-list/LocationList";
import { ProtectedRoute } from "../navbar/ProtectedRoute";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from "react-redux";
import signout from "../../utility/signout"
import MarkLocation from "../location-view/MarkLocation";



const useStyles = makeStyles({
    button: {
        width: "100%",
        height: "12vh"
    }
});

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

export default function NavBar(props) {

    const classes = useStyles(props);
    const isLogin = useSelector(state => state.authentication.isLogin);

    return (
        <Router>
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

                <div style={{ width: "80%" }}>
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
        </Router>
    );
}
