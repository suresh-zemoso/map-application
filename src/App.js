import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from './component/navbar/NavBar';
import history from './history/history';
import {
  BrowserRouter
} from "react-router-dom";


const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100vw',
  },
});

const App = (props) => {

  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <BrowserRouter history={history}>
        <NavBar />
      </BrowserRouter>
    </div>
  )
}

export default App;