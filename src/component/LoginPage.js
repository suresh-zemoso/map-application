import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoginBlock from './LoginBlock';
import signout from '../utility/signout';


const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        background: 'white'
    },
});


const LoginPage = (props) => {

    const classes = useStyles(props);

    useEffect(() => {
        signout()
    }, [])
    return (
        <div className={classes.root}>
            <LoginBlock />
        </div>
    );
};


export default LoginPage;