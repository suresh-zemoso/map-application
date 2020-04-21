import axios from 'axios';

function getLocations(token) {
    return axios({
        method: 'get',
        url: 'http://localhost:3001/locations',
        headers: { 'Authorization': token }
    }).then(function (response) {
        // handle success
        return response;
    })
        .catch(function (error) {
            return error;
        })
}
function addLocation(data, token) {
    return axios({
        method: 'post',
        url: 'http://localhost:3001/locations',
        data,
        headers: { 'Authorization': token }
    })
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error;
        })
}

export const locationService = {
    getLocations,
    addLocation
}