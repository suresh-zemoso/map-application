import React from 'react';
import { mount, shallow } from 'enzyme';
import MarkLocation from '../../components/MarkLocation';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { mapUtility } from '../../../utils/mapUtility'

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


describe('MarkLocation', () => {

    let useEffect;
    let store;
    let wrapper;

    const mockUseEffect = () => {
        useEffect.mockImplementationOnce(f => f());
    };

    beforeEach(() => {

        store = configureStore([thunk])({
            locationState: { locations: [] }
        });

        /* mocking useEffect */
        useEffect = jest.spyOn(React, "useEffect");
        mockUseEffect();

        jest.mock('react-router-dom', () => ({
            useParams: () => ({
                id: 1,
            }),
        }));
        jest.spyOn(mapUtility, "getGeoCoder").mockImplementation(() => { })

        /* shallow rendering */
        wrapper = mount(<Provider store={store}><MemoryRouter><MarkLocation /></MemoryRouter></Provider>);
    });

    const props = {
        mapMode: "satellite-v9",
        mapAttribute: { lng: 5, lat: 34, zoom: 2 },
        handlers: [],
        buttons: []
    };

    it('should render the MarkLocation Component correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});      