import axios from 'axios';
import { handleApiResponse } from '../../utils/networkUtils';


function getLocations(token) {
    return axios({
        method: 'get',
        url: 'http://localhost:3001/locations',
        headers: { 'Authorization': token }
    }).then(data => {
        return handleApiResponse(data)
    }, error => {
        return handleApiResponse(error)
    })
}


function addLocation(data, token) {
    return axios({
        method: 'post',
        url: 'http://localhost:3001/locations',
        data,
        headers: { 'Authorization': token }
    })
        .then(data => {
            return handleApiResponse(data);
        }, error => {
            // console.debug(error.response)
            return handleApiResponse(error);
        })
}

export const locationService = {
    getLocations,
    addLocation
}