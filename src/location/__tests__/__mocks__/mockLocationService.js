
const locations = [];

function getLocations(token) {
    return new Promise(resolve => {
        resolve(locations);
    });
};

function addLocation(data, token) {
    return new Promise(resolve => {
        resolve({});
    });
};

export const mockLocationService = {
    addLocation,
    getLocations
};