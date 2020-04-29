import React from 'react';
import BaseMapView from './BaseMapView';

export default function PublicMapView() {
    return (
        <BaseMapView mapAttribute={{ lng: 5, lat: 34, zoom: 2 }} mapMode="streets-v11" />
    )
}
