import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionTypes from '../../actions/actionTypes';
import * as actions from '../../actions/locationAction';
import { locationService } from '../../services/locationService';
import { mockLocationService } from '../__mocks__/mockLocationService';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('getPosts actions', () => {

    beforeEach(() => {
        jest
            .spyOn(locationService, "addLocation")
            .mockImplementation(() => mockLocationService.addLocation());
        jest
            .spyOn(locationService, "getLocations")
            .mockImplementation(() => mockLocationService.getLocations());
    });

    it('dispatch SAVE_ALL after successfuly fetching locations', () => {

        const expectedActions = [
            { type: actionTypes.LOADING_LOCATIONS },
            { type: actionTypes.SAVE_ALL, payload: [] },
        ];

        const store = mockStore({ locationState: {} })

        return store.dispatch(actions.fetchLocations()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('dispatch SAVE_SUCCESS after successfuly adding location', () => {

        const expectedActions = [
            { type: actionTypes.SAVE_SUCCESS },
        ];

        const store = mockStore({ locationState: {} })

        return store.dispatch(actions.addLocation()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});