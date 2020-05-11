import React from 'react';
import { mount, shallow } from 'enzyme';
import LocationTable from '../../components/LocationTable';
import { Router } from 'react-router-dom';
import TableRow from '@material-ui/core/TableRow';
import history from '../../../history';


describe('LocationTable', () => {
    let wrapper;

    beforeEach(() => {

        /* mocking useHistory */
        jest.mock('react-router-dom', () => ({
            useHistory: () => ({
                push: jest.fn(),
            }),
        }));
        // const historyMock = { push: jest.fn() };
        /* shallow rendering */
        wrapper = shallow(<Router history={history}><LocationTable /></Router>);
    });

    it('should render the LocationTable Component correctly', () => {
        expect(wrapper).toMatchSnapshot();
    });
    // it('should render the LocationTable Component correctly', () => {
    //     let tableRows = wrapper.find(TableRow);
    //     tableRows.at(0).simulate('click');
    //     expect(historyMock.push.mock.calls[0]).toEqual([(url string), (state object) ]);
    // });
});      