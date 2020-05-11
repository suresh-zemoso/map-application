import React from 'react';
import { mount, shallow } from 'enzyme';
import NavBar from '../../components/NavBar';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../../../auth/components/LoginPage';
import * as ReactReduxHooks from '../../../hooks/reduxHooks';
import { mapUtility } from '../../../utils/mapUtility';
import PublicMapView from '../../../location/components/PublicMapView';
import LoginMapView from '../../../location/components/LoginMapView';
import { locationState } from '../../../location/reducers/locationReducer';


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

describe('NavBar', () => {

    let wrapper;
    let store;

    beforeEach(() => {
        /* mocking store */
        store = configureStore([thunk])({
            authentication: { isLogin: false }
        });

        jest
            .spyOn(ReactReduxHooks, "useSelector")
            .mockImplementation(state => store.getState());
    });

    it('should render the NavBar Component correctly', () => {
        wrapper = shallow(<Provider store={store} ><MemoryRouter nitialEntries={['/random']}><NavBar /></MemoryRouter></Provider>);
        expect(wrapper).toMatchSnapshot();
    });

    it('It will not render any page', () => {
        wrapper = mount(<Provider store={store}><MemoryRouter initialEntries={['/random']}><NavBar /></MemoryRouter></Provider >);
        expect(wrapper.find(LoginPage)).toHaveLength(0);
    });

    it('should render login page on / initial entry', () => {
        wrapper = mount(<Provider store={store}><MemoryRouter initialEntries={['/']}><NavBar /></MemoryRouter></Provider>);
        expect(wrapper.find(LoginPage)).toHaveLength(1);
    });
    it('should render public map page on /map initial entry', () => {
        jest.spyOn(mapUtility, "getGeoCoder").mockImplementation(() => { })
        wrapper = mount(<Provider store={store}><MemoryRouter initialEntries={['/map']}><NavBar /></MemoryRouter></Provider>);
        expect(wrapper.find(PublicMapView)).toHaveLength(1);
    });

    it('should render LoginPage when Protected route is accessed and user is not logged in',
        () => {
            wrapper = mount(<Provider store={store}><MemoryRouter initialEntries={['/locations/new']}><NavBar /></MemoryRouter></Provider>);
            expect(wrapper.find(LoginPage)).toHaveLength(1);
        });
    it('should render LoginMapView page when user is logged in and url is /add/location',
        () => {
            store = configureStore([thunk])({
                authentication: { isLogin: true },
                locationState: {
                    loading: true,
                    locations: [],
                    fetchError: false,
                    errorMessage: "Error in Fetching state",
                    saveError: false,
                }
            });
            wrapper = mount(<Provider store={store}><MemoryRouter initialEntries={['/locations/new']}><NavBar /></MemoryRouter></Provider>);
            expect(wrapper.find(LoginMapView)).toHaveLength(1);
        });

});      