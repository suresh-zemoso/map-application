import React, { useState } from 'react';
import BaseMapView from '../public-map/BaseMapView';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector } from "react-redux";
import { locationService } from '../../services/locationService';





const useStyles = makeStyles({
    sidebarStyle: {
        position: 'absolute',
        backgroundColor: '#404040',
        color: '#ffffff',
        zIndex: '1!important',
        padding: '6px',
        fontWeight: 'bold'
    }
});

export default function LoginMapView(props) {

    const [mapAttribute, setMapAttribute] = useState({ lng: 73.413827, lat: 25.676973, zoom: 2 });
    const [open, setOpen] = React.useState(false);

    const accessToken = useSelector(state => state.authentication.accessToken);
    const classes = useStyles(props);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function addMapOnclick(map) {
        map.on('click', (e) => {
            setMapAttribute({
                lng: e.lngLat.lng.toFixed(6),
                lat: e.lngLat.lat.toFixed(6),
                zoom: map.getZoom().toFixed(2)
            });
        });
    }
    function addLocation(mapAttribute) {
        const data = {
            lng: mapAttribute.lng,
            lat: mapAttribute.lat
        }
        locationService.addLocation(data, accessToken)
            .then(response => {

            })
            .catch(error => {
                console.log(error);
            })
        handleClose();
    }
    return (
        <>
            <BaseMapView
                handlers={[addMapOnclick]}
                mapAttribute={{
                    lng: mapAttribute.lng,
                    lat: mapAttribute.lat,
                    zoom: mapAttribute.zoom
                }}
                mapMode="streets-v11"
                buttons={[{ buttonText: "Add Location", onClick: () => handleClickOpen() }]}
            >
                <div className={classes.sidebarStyle}>
                    <div>Longitude: {mapAttribute.lng} | Latitude: {mapAttribute.lat}</div>
                </div>
            </BaseMapView >
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Save Location"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to save location with Longitude {mapAttribute.lng} and Latitude {mapAttribute.lat} ?
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={() => addLocation(mapAttribute)} color="primary" autoFocus>
                        Confirm
          </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
