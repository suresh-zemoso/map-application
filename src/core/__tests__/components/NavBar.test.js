import React from 'react';
import { mount, shallow } from 'enzyme';
import NavBar from '../../components/NavBar';

let wrapped = shallow(<NavBar />);

describe('NavBar', () => {

    it('should render the NavBar Component correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });

});      