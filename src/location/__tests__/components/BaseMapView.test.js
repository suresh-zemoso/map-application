import React from 'react';
import { mount, shallow } from 'enzyme';
import BaseMapView from '../../components/BaseMapView';

let wrapped = shallow(<BaseMapView />);

// jest.mock("mapbox-gl", () => require("mapbox-gl-js-mock"));

describe('BaseMapView', () => {

    it('should render the BaseMapView Component correctly', () => {
        expect(wrapped).toMatchSnapshot();
    });

});      