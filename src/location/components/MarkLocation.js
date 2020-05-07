import React from 'react';
import BaseMapView from '../../location/components/BaseMapView';
import mapboxgl from 'mapbox-gl';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';



const defaultProps = {

}

const propTypes = {


}
const MarkLocation = (props) => {

    const { id } = useParams();
    const locations = useSelector(state => state.locationState.locations);
    const mapAttribute = locations.find(location => {
        return location.id == id
    })


    function onLoadListener(map, e) {
        map.flyTo({
            center: [
                mapAttribute.lng,
                mapAttribute.lat,
            ],
            zoom: 7,
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });

        var marker = new mapboxgl.Marker();
        marker.setLngLat([
            mapAttribute.lng,
            mapAttribute.lat
        ]);
        // Ensure it's added to the map. This is safe to call if it's already added.
        marker.addTo(map);
    }

    const handlers =
        [{
            addEventListener: (map) => map.on('load', (e) => onLoadListener(map, e)),
            removeEventListener: (map) => map.off('load', (e) => onLoadListener(map, e))
        }]


    return (
        <BaseMapView mapAttribute={{ lng: 5, lat: 34, zoom: 2 }} handlers={handlers} />
    )
}

MarkLocation.propTypes = propTypes;
MarkLocation.defaultProps = defaultProps;

export default MarkLocation;