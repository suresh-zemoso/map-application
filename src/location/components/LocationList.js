import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "../../hooks/reduxHooks";
import { fetchLocations } from '../../location/actions/locationAction';
import LocationTable from './LocationTable';



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
        <div>
            {loading ? <div>Fetching Locations</div> : (fetchError ?
                <div>{errorMessage}</div> :
                <LocationTable
                    locationList={locationList}
                    setlocationList={setlocationList}
                />)
            }
        </div>
    )
}

LocationList.propTypes = propTypes;
LocationList.defaultProps = defaultProps;

export default LocationList;