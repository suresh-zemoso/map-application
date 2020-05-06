import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actionTypes from '../../actions/actionTypes';
import * as actions from '../../actions/loginAction';
import { loginService } from '../../services/loginService';
import { mockLoginService } from '../__mocks__/mockLoginService';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Testing login actions', () => {

    beforeEach(() => {
        jest
            .spyOn(loginService, "signIn")
            .mockImplementation(() => mockLoginService.signIn());
    });

    it('dispatch SAVE_ALL after successfuly fetching locations', () => {

        const expectedActions = [
            { type: actionTypes.AUTH_REQUEST },
            { type: actionTypes.AUTH_RECEIVE, payload: "access_token" },
        ];

        const store = mockStore({ authentication: {} })

        return store.dispatch(actions.login()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});