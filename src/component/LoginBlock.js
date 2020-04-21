import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { TextField } from '@material-ui/core';
import useInput from '../hooks/useInput';
import { useDispatch } from "react-redux";
import { login } from '../actions/actions';
import { withRouter } from 'react-router';
import { loginService } from '../services/loginService';
import Alert from '@material-ui/lab/Alert';


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

const LoginBlock = (props) => {

    const classes = useStyles(props);
    const username = useInput("");
    const password = useInput("");
    const [isBadEntry, setBadEntry] = useState(false);

    const dispatch = useDispatch();

    function submitForm() {
        const data = {
            username: username.value,
            password: password.value,
        }
        loginService.signIn(data)
            .then(response => {
                response.response && response.response.status == "401" && setBadEntry(true);
                dispatch(login(response.data.access_token))
                props.history.push("/locations/new");
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className={classes.root}>
            <div className={classes.form}>
                {isBadEntry && <Alert className={classes.alert} severity="error" onClose={() => { setBadEntry(false) }}>Incorrect username or password.</Alert>}
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
                    classes={{ root: classes.buttonRoot }}
                    disabled={(username.value == "" || password.value == "") ? true : false}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={() => { submitForm() }}>
                    Sign In
                </Button>
            </div>
        </div>
    )
}


export default withRouter(LoginBlock);
