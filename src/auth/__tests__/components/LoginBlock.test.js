import React from 'react';
import { mount } from 'enzyme';
import LoginBlock from '../../components/LoginBlock';

let wrapped = mount(<LoginBlock />);


describe('LoginBlock', () => {
    it('should render the LoginBlock Component correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });

    it('should call submitForm function clicking on login button', () => {
        const submitForm = jest.fn();
        let loginButton = wrapped.find('Button');
        loginButton.simulate('click');
        expect(submitForm).toHaveBeenCalledWith();
    });
});      