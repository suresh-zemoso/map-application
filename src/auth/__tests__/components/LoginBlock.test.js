import React from 'react';
import { mount } from 'enzyme';
import LoginBlock from '../../components/LoginBlock';
import { MemoryRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as ReactReduxHooks from "../../hooks/reduxHooks"


describe("Login Block", () => {
    let wrapper;
    let store;

    beforeEach(() => {
        /* mocking store */
        store = configureStore([thunk])({
            authentication: { error: true, errorMessage: 'adfkadskfajskd ' }
        });

        jest
            .spyOn(ReactReduxHooks, "useSelector")
            .mockImplementation(state => store.getState());
        /* mocking useDispatch on our mock store  */
        jest
            .spyOn(ReactReduxHooks, "useDispatch")
            .mockImplementation(() => store.dispatch);

        /* shallow rendering */
        wrapper = mount(<MemoryRouter><LoginBlock store={store} /></MemoryRouter>);
    });

    it('should render the LoginBlock Component correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

    it("Click on login button should call dispatch", () => {
        let loginButton = wrapper.find(Button);
        loginButton.at(0).simulate('click');
        expect(ReactReduxHooks.useDispatch.mock.calls.length).toEqual(1);
    });
});
