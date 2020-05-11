import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { mapUtility } from '../../utils/mapUtility';



const useStyles = makeStyles({
    buttonDiv: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {
        margin: " 0 5px"
    },
    buttonText: {
        fontSize: '.8rem'
    },
    mapHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1%',
    }
});

const defaultProps = {
    mapMode: "streets-v11",
    mapAttribute: { lng: 73.413827, lat: 25.676973, zoom: 2 },
    handlers: [],
    buttons: []
}

const propTypes = {
    mapMode: PropTypes.string,
    mapAttribute: PropTypes.object,
    handlers: PropTypes.array,
    buttons: PropTypes.array
}

const BaseMapView = (props) => {

    const classes = useStyles(props);
    const { mapMode, mapAttribute, handlers, buttons } = props;
    mapboxgl.accessToken = 'pk.eyJ1Ijoic3VyZXNoLXplbW9zbyIsImEiOiJjazkweng5cXowNmd0M2Zyb2I0YjllMWFoIn0.uCF7DOpC6m3gvu3n2uoQ8A';

    const [mapType, setMapType] = useState(mapMode);
    const map = useRef();

    const buttonCommonProps = (classes) => {
        return {
            classes: { root: classes.button, label: classes.buttonText },
            size: "small",
            color: "primary",
            variant: "contained"
        }
    }

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: "map",
            style: `mapbox://styles/mapbox/${mapType}`,
            center: [mapAttribute.lng, mapAttribute.lat],
            zoom: mapAttribute.zoom
        });

        //Search location using input
        map.current.addControl(
            mapUtility.getGeoCoder(mapboxgl)
        );

        // Add geolocate control to the map.
        map.current.addControl(
            mapUtility.getGeoLocateControl(mapboxgl)
        );
        handlers && handlers.forEach(handler => {
            handler.addEventListener(map.current);
        });

        // window.addEventListener('resize', map.current.resize());

        //remove all the listener when component unmount
        return () => {
            handlers && handlers.forEach(handler => {
                handler.removeEventListener(map.current);
            });
        }

    }, []);

    useEffect(() => {
        map.current.setStyle('mapbox://styles/mapbox/' + mapType);
    }, [mapType]);

    return (
        <div style={{
            height: "100%", padding: "2% 3% 1% 3%", boxSizing: "border-box"
            , display: "flex", flexDirection: "column"
        }} >
            <div className={classes.mapHeader}>
                {props.children}
                <div className={classes.buttonDiv}>
                    <Button
                        {...buttonCommonProps(classes)}
                        onClick={() => { setMapType("satellite-v9") }}>Satellite view</Button>
                    <Button
                        {...buttonCommonProps(classes)}
                        onClick={() => { setMapType("streets-v11") }}>Street view</Button>
                    {
                        buttons && buttons.map((button, index) =>
                            <Button
                                key={index}
                                {...buttonCommonProps(classes)}
                                onClick={button.onClick}
                            >{button.buttonText}</Button>
                        )}
                </div>
            </div>
            <div style={{ flexGrow: "1" }} id="map" />
        </div>
    )
}

BaseMapView.propTypes = propTypes;
BaseMapView.defaultProps = defaultProps;

export default BaseMapView;