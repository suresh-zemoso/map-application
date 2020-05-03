import React, { useState, useRef } from 'react';
import BaseMapView from '../../location/components/BaseMapView';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from "react-redux";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { addLocation } from '../../location/actions/locationAction';
import mapboxgl from 'mapbox-gl';
import PropTypes from 'prop-types';




const useStyles = makeStyles({
    sidebarStyle: {
        position: 'absolute',
        backgroundColor: '#404040',
        color: '#ffffff',
        zIndex: '1!important',
        padding: '6px',
        fontWeight: 'bold'
    },
    marker: {
        background: `url(${require("./mapbox-icon.svg")})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '45px 45px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        cursor: 'pointer'
    },
    snackbar: {
        left: '63% !important'
    }
});


const defaultProps = {

}

const propTypes = {


}
const LoginMapView = (props) => {

    const [mapAttribute, setMapAttribute] = useState({ lng: 73.413827, lat: 25.676973, zoom: 2 });
    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [messageInfo, setMessageInfo] = useState(undefined)
    const queueRef = useRef([])

    const accessToken = useSelector(state => state.authentication.accessToken);
    const saveError = useSelector(state => state.locationState.saveError);

    const dispatch = useDispatch();

    const classes = useStyles(props);

    function formatMessage(lat, lng) {
        return `Location with Latitude ${lat} and Longitude ${lng} Added`
    }

    function processQueue() {
        if (queueRef.current.length > 0) {
            setMessageInfo(queueRef.current.shift());
            setSnackbarOpen(true);
        }
    };

    function openSnackbar(message) {
        queueRef.current.push({
            message,
            key: new Date().getTime(),
        });

        if (isSnackbarOpen) {
            setSnackbarOpen(false);
        } else {
            processQueue();
        }
    };

    function handleClose(event, reason) {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    function handleExited() {
        processQueue();
    };

    function mousemoveListener(map, e) {
        setMapAttribute({
            lng: e.lngLat.lng.toFixed(6),
            lat: e.lngLat.lat.toFixed(6),
            zoom: map.getZoom().toFixed(2)
        });
    }

    function onClickListener(map, e) {
        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = classes.marker;
        console.debug("Lat lang value", e.lngLat.lat, e.lngLat.lng)
        // make a marker for each feature and add to the map
        const location = {
            lng: e.lngLat.lng.toFixed(6),
            lat: e.lngLat.lat.toFixed(6)
        }

        dispatch(addLocation(location, accessToken))
            .then(data => {
                openSnackbar(formatMessage(location.lat, location.lng));
                new mapboxgl.Marker(el)
                    .setLngLat([e.lngLat.lng, e.lngLat.lat])
                    .addTo(map);
            },
                error => {
                    openSnackbar("Error in adding location");
                    console.log(error)
                })
    }

    const handlers = [{
        addEventListener: (map) => map.on('mousemove', (e) => mousemoveListener(map, e)),
        removeEventListener: (map) => map.off('mousemove', (e) => mousemoveListener(map, e))
    },
    {
        addEventListener: (map) => map.on('click', (e) => onClickListener(map, e)),
        removeEventListener: (map) => map.off('click', (e) => onClickListener(map, e))
    }
    ]


    return (
        <div>
            <BaseMapView
                handlers={handlers}
                mapAttribute={{
                    lng: mapAttribute.lng,
                    lat: mapAttribute.lat,
                    zoom: mapAttribute.zoom
                }}
                mapMode="streets-v11"
            >
                <div className={classes.sidebarStyle}>
                    <div>Longitude: {mapAttribute.lng} | Latitude: {mapAttribute.lat}</div>
                </div>
            </BaseMapView >
            <Snackbar
                key={messageInfo ? messageInfo.key : undefined}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={isSnackbarOpen}
                onExited={handleExited}
                classes={{ anchorOriginTopCenter: classes.snackbar }}
                // message={messageInfo ? messageInfo.message : undefined}
                // autoHideDuration={3000}
                onClose={handleClose} >
                <Alert severity={saveError ? "error" : "success"}>
                    {messageInfo ? messageInfo.message : undefined}
                </Alert>
            </Snackbar>
        </div>
    )
}

LoginMapView.propTypes = propTypes;
LoginMapView.defaultProps = defaultProps;

export default LoginMapView;