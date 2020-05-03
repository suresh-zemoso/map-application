import React from 'react';
import { mount, shallow } from 'enzyme';
import LoginPage from '../../components/LoginPage';

let wrapped = shallow(<LoginPage />);

describe('LoginPage', () => {

    it('should render the LoginPage Component correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });

});      