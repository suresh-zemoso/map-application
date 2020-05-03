import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import useInput from '../../auth/hooks/useInput';
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../auth/actions/loginAction';
import { withRouter } from 'react-router';
import Alert from '@material-ui/lab/Alert';
import PropTypes from 'prop-types';


const useStyles = makeStyles({
    root: {
        position: 'absolute',
        top: '15%',
        display: ' flex',
        justifyContent: 'center',
        width: '60%',
        height: '40%',
    },
    buttonRoot: {
        width: '100%',
        margin: '3%',
        height: '56px'
    },
    inputField: {
        width: '100%',
        margin: '3%',
    },
    alert: {
        margin: '3%',
        width: '100%',
        boxSizing: 'border-box'
    }

});

const defaultProps = {

}

const propTypes = {


}

const LoginBlock = (props) => {

    const classes = useStyles(props);
    const username = useInput("");
    const password = useInput("");

    const dispatch = useDispatch();
    const authentication = useSelector(state => state.authentication)
    console.warn('Auth', authentication);
    function submitForm() {
        const credentials = {
            username: username.value,
            password: password.value,
        }
        dispatch(login(credentials))
            .then(() => { props.history.push("/locations") },
                (error) => {
                    console.warn(error);
                });
    }

    return (
        <div className={classes.root}>
            <div className={classes.form}>
                {authentication.error && <Alert className={classes.alert} severity="error">{authentication.errorMessage}</Alert>}
                <TextField
                    id="username-00"
                    label="Username"
                    variant="outlined"
                    required
                    classes={{ root: classes.inputField }}
                    {...username}
                />
                <TextField
                    id="password--00"
                    label="Password"
                    type="password"
                    variant="outlined"
                    required
                    classes={{ root: classes.inputField }}
                    {...password}
                />
                <Button
                    id="login-button"
                    classes={{ root: classes.buttonRoot }}
                    disabled={(username.value == "" || password.value == "") ? true : false}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={submitForm}>
                    Sign In
                </Button>
            </div>
        </div >
    )
}

LoginBlock.propTypes = propTypes;
LoginBlock.defaultProps = defaultProps;

export default withRouter(LoginBlock);
