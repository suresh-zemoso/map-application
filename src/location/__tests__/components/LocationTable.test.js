import React from 'react';
import { mount, shallow } from 'enzyme';
import LocationTable from '../../components/LocationTable';


describe('LocationTable', () => {
    let wrapper;

    beforeEach(() => {

        /* mocking useHistory */
        jest.mock('react-router-dom', () => ({
            useHistory: () => ({
                push: jest.fn(),
            }),
        }));

        /* shallow rendering */
        wrapper = shallow(<LocationTable />);
    });

    it('should render the LocationTable Component correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });

});      