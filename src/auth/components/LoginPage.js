import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LoginBlock from './LoginBlock';
import signout from '../../utils/signout';
import PropTypes from 'prop-types';



const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        background: 'white'
    },
});

const defaultProps = {

}

const propTypes = {


}

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


LoginPage.propTypes = propTypes;
LoginPage.defaultProps = defaultProps;

export default LoginPage;