import React, { useState } from "react";
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
import Hidden from '@material-ui/core/Hidden';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import PublicIcon from '@material-ui/icons/AddLocation';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import ViewListIcon from '@material-ui/icons/ViewList';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';






const useStyles = makeStyles(theme => ({
    button: {
        width: "100%",
        height: "12vh",
        minWidth: '0'
    },
    buttonText: {
        fontSize: '.8rem'
    },
    iconButton: {
        width: "100%",
        textDecoration: "none",
        borderRadius: "0",
        boxSizing: "border-box",
        padding: '2rem 1rem'
    },
    mapContainer: {
        width: "93%",
        [theme.breakpoints.down('sm')]: {
            width: "100%",
        },
        overflowY: 'auto'
    },
    drawerPaper: {
        width: '20%',
        background: "#f0f0f0",
    }
}));

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
            icon: (props) => <LockOpenOutlinedIcon {...props} />,
            sidebar: "Login",
        },
        {
            to: "/map",
            exact: true,
            icon: (props) => <PublicIcon {...props} />,
            sidebar: "Map",
        }],
    afterLogin: [
        {
            to: "/locations/new",
            exact: true,
            sidebar: "Add Location",
            icon: (props) => <AddLocationIcon {...props} />
        },
        {
            to: "/locations",
            exact: true,
            sidebar: "View Locations",
            icon: (props) => <ViewListIcon {...props} />
        },
        {
            to: "",
            exact: true,
            sidebar: "Logout",
            icon: (props) => <ExitToAppIcon {...props} />,
            onClick: () => signout()
        }
    ]
}

const NavBar = (props) => {

    const classes = useStyles(props);
    // const state = useSelector(state => state)
    // console.debug("whole redux is", state);
    const isLogin = useSelector(state => state.authentication.isLogin);

    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const toggleDrawer = (value) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(value)
    };

    return (
        <div style={{ display: "flex", height: "100%", width: "100%" }}>
            <Hidden mdUp>
                <Drawer
                    classes={{ paper: classes.drawerPaper }}
                    anchor="left"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}

                >
                    <div
                        onMouseLeave={() => setDrawerOpen(false)}
                        style={{
                            height: '100%',
                            padding: "1rem",
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
                </Drawer>
                <div
                    onMouseEnter={() => setDrawerOpen(true)}
                    style={{
                        padding: "0",
                        width: "7%",
                        background: "#f0f0f0",
                    }}
                >
                    {!isLogin && navBarContent.beforeLogin.map((route, index) => (
                        <IconButton key={index}
                            to={route.to}
                            component={NavLink}
                            activeStyle={{
                                background: "#3f51b5",
                            }}
                            isActive={(match, location) => {
                                return route.to === location.pathname
                            }} onClick={route.onClick} className={classes.iconButton}>{route.icon()}</IconButton>

                    ))
                    }

                    {isLogin &&
                        navBarContent.afterLogin.map((route, index) => (
                            <IconButton key={index}
                                to={route.to}
                                component={NavLink}
                                style={{ textDecoration: "none" }}
                                activeStyle={{
                                    background: "#3f51b5",
                                    color: "white"
                                }}
                                isActive={(match, location) => {
                                    return route.to === location.pathname
                                }} onClick={route.onClick} className={classes.iconButton}>{route.icon()}</IconButton>

                        ))
                    }
                </div>
            </Hidden>
            <Hidden smDown>
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
                            }} onClick={route.onClick}
                            classes={{ root: classes.button, label: classes.buttonText }}                            >{route.sidebar}</Button>
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
                                }} onClick={route.onClick} classes={{ root: classes.button, label: classes.buttonText }}>{route.sidebar}</Button>
                        ))
                    }
                </div>
            </Hidden>
            <div className={classes.mapContainer}>
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
        </div >
    );
}

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;

export default NavBar;