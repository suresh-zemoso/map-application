import React from 'react';
import { mount, shallow } from 'enzyme';
import LocationList from '../../components/LocationList';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

const mockStore = configureMockStore([thunk]);
const store = mockStore({
    locationState: {
        locations: [], loading: false,
        fetchError: false, errorMessage: 'error in loading locations'
    }
});
let wrapped = shallow(<Provider store={store}><LocationList /></Provider>);

// const mockDispatch = jest.fn();

// jest.mock('react-redux', () => {
//     const state = {
//         locationState: {
//             locations: [], loading: false,
//             fetchError: false, errorMessage: 'error in loading locations'
//         }
//     };
//     return {
//         useSelector: jest.fn().mockImplementation(cb => cb(state)),
//         useDispatch: jest.fn().mockImplementation(() => mockDispatch),
//     };
// });

describe('LocationList', () => {

    it('should render the LocationList Component correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });

});      