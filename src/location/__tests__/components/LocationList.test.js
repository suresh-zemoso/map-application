import React from 'react';
import { mount, shallow } from 'enzyme';
import LocationList from '../../components/LocationList';
import * as ReactReduxHooks from '../../../hooks/reduxHooks';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';


describe('LocationList', () => {
    let wrapper;
    let useEffect;
    let store;

    const mockUseEffect = () => {
        useEffect.mockImplementationOnce(f => f());
    };

    beforeEach(() => {
        /* mocking store */
        store = configureStore([thunk])({
            locationState: {
                locations: [],
                loading: false,
                fetchError: false,
                errorMessage: 'error in fetching'
            }
        });

        /* mocking useEffect */
        useEffect = jest.spyOn(React, "useEffect");
        mockUseEffect(); // 2 times
        mockUseEffect(); //

        /* mocking useSelector on our mock store */
        jest
            .spyOn(ReactReduxHooks, "useSelector")
            .mockImplementation(state => store.getState());
        /* mocking useDispatch on our mock store  */
        jest
            .spyOn(ReactReduxHooks, "useDispatch")
            .mockImplementation(() => store.dispatch);
        /* shallow rendering */
        wrapper = shallow(<LocationList store={store} />);
    });

    it('should render the LocationList Component correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});      