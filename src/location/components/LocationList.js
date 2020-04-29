import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchLocations } from '../../location/actions/locationAction';
import LocationTable from './LocationTable';
import PropTypes from 'prop-types';



const defaultProps = {

}

const propTypes = {


}

const LocationList = (props) => {

    const { locations, loading, fetchError, errorMessage } = useSelector(state => state.locationState)
    const [locationList, setlocationList] = useState([]);

    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.authentication.accessToken);


    useEffect(() => {
        setlocationList(locations)
    }, [locations])


    useEffect(() => {
        dispatch(fetchLocations(accessToken));
    }, []);

    return (
        <>
            {loading ? <div>Fetching Locations</div> : (fetchError ?
                <div>{errorMessage}</div> :
                <LocationTable
                    locationList={locationList}
                    setlocationList={setlocationList}
                />)
            }
        </>
    )
}

LocationList.propTypes = propTypes;
LocationList.defaultProps = defaultProps;

export default LocationList;