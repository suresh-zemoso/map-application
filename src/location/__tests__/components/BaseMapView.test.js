import React from 'react';
import { mount, shallow } from 'enzyme';
import BaseMapView from '../../components/BaseMapView';
import mapboxgl from 'mapbox-gl';

let wrapper = shallow(<BaseMapView />);

// jest.mock("mapbox-gl", () => require("mapbox-gl-js-mock"));
jest.mock('mapbox-gl', () => {
    const mockMap = jest.fn(() => ({
        on: jest.fn(),
        off: jest.fn(),
        getSource: jest.fn(),
        getLayer: jest.fn(),
        addControl: jest.fn(),
        addSource: jest.fn(),
        addLayer: jest.fn(),
        addImage: jest.fn(),
        loadImage: jest.fn(),
        hasImage: jest.fn(),
        dragPan: {
            enable: jest.fn(),
            disable: jest.fn()
        },
        scrollZoom: {
            enable: jest.fn(),
            disable: jest.fn()
        },
        doubleClickZoom: {
            enable: jest.fn(),
            disable: jest.fn()
        },
        touchZoomRotate: {
            enable: jest.fn(),
            disable: jest.fn()
        },
        setStyle: jest.fn(),
        queryRenderedFeatures: jest.fn(),
        getCenter: jest.fn(),
        flyTo: jest.fn(),
        isStyleLoaded: jest.fn(),
        getBounds: jest.fn(),
        getZoom: jest.fn(),
        resize: jest.fn(),
        getStyle: jest.fn(() => ({
            layers: []
        })),
        isMoving: jest.fn(),
        isZooming: jest.fn(),
        isRotating: jest.fn(),
        removeControl: jest.fn(),
        remove: jest.fn()
    }));

    const mockPopup = jest.fn(() => ({
        setLngLat: jest.fn(() => mockPopup()),
        setDOMContent: jest.fn(() => mockPopup()),
        remove: jest.fn(() => mockPopup()),
        addTo: jest.fn(() => mockPopup()),
        setMaxWidth: jest.fn(() => mockPopup())
    }));

    const mockMarker = jest.fn(() => ({
        setLngLat: jest.fn(() => mockMarker()),
        remove: jest.fn(() => mockMarker()),
        addTo: jest.fn(() => mockMarker()),
        getElement: jest.fn(() => mockMarker()),
        on: jest.fn(),
        getLngLat: jest.fn()
    }));

    return {
        Map: mockMap,
        NavigationControl: jest.fn(),
        GeolocateControl: jest.fn(() => ({
            on: jest.fn(),
            trigger: jest.fn()
        })),
        Popup: mockPopup,
        LngLat: jest.fn((lat, lng) => ({
            lat, lng,
            wrap: jest.fn(() => ({
                lat, lng
            }))
        })),
        Marker: mockMarker,
        ScaleControl: jest.fn()
    };
});


describe('BaseMapView', () => {

    const props = {
        mapMode: "satellite-v9",
        mapAttribute: { lng: 5, lat: 34, zoom: 2 },
        handlers: [],
        buttons: []
    };

    it('should render the BaseMapView Component correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});      