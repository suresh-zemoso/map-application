import React from 'react';
import BaseMapView from '../public-map/BaseMapView';
import mapboxgl from 'mapbox-gl';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function MarkLocation(props) {

    const { id } = useParams();
    const locations = useSelector(state => state.locations);
    const mapAttribute = locations.find(location => {
        return location.id == id
    })
    function flyToLocation(map) {
        map.on('load', (e) => {
            map.flyTo({
                center: [
                    mapAttribute.lng,
                    mapAttribute.lat,
                ],
                zoom: 7,
                essential: true // this animation is considered essential with respect to prefers-reduced-motion
            });

            var marker = new mapboxgl.Marker();
            // Update the data to a new position based on the animation timestamp. The
            // divisor in the expression `timestamp / 1000` controls the animation speed.
            marker.setLngLat([
                mapAttribute.lng,
                mapAttribute.lat
            ]);

            // Ensure it's added to the map. This is safe to call if it's already added.
            marker.addTo(map);

            // Request the next frame of the animation.
            // requestAnimationFrame(animateMarker);
        });
    }



    return (
        <BaseMapView mapAttribute={{ lng: 5, lat: 34, zoom: 2 }} handlers={[flyToLocation]} />
    )
}
