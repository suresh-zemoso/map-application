import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { saveAll } from '../actions/actions';
import { locationService } from '../services/locationService';
import LocationTable from './LocationTable';



export default function LocationList() {

    const [locationList, setlocationList] = useState([]);
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.authentication.accessToken);

    useEffect(() => {
        locationService.getLocations(accessToken)
            .then(response => {
                const locations = response.data;
                setlocationList(locations);
                //save data in redux
                dispatch(saveAll(locations));
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <LocationTable
            locationList={locationList}
            setlocationList={setlocationList}
        />
    )
}
