import React from 'react';
import { mount } from 'enzyme';
import LoginBlock from '../../components/LoginBlock';
import { MemoryRouter } from 'react-router-dom';

let wrapped = mount(<MemoryRouter><LoginBlock /></MemoryRouter>);

const mockDispatch = jest.fn();

jest.mock('react-redux', () => {
    const auth = { authentication: { error: true, errorMessage: 'adfkadskfajskd ' } };
    return {
        useSelector: jest.fn().mockImplementation(cb => cb(auth)),
        useDispatch: jest.fn().mockImplementation(() => mockDispatch),
    };
});

describe('LoginBlock', () => {
    const { error } = console;

    beforeEach(() => {
        console.error = jest.fn();
    });

    afterEach(() => {
        console.error = error;
    })

    it('should render the LoginBlock Component correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });

    it('should call submitForm function clicking on login button', () => {
        let loginButton = wrapped.find('button');
        loginButton.first().simulate('click');
        expect(mockDispatch).toHaveBeenCalled();
    });

});      