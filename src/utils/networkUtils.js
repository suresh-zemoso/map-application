import axios from 'axios';

export function handleApiResponse(response) {


    const data = response && response.data;

    if (response.status !== 200 && response.status !== 201) {
        if (response.status === 401) {
            console.debug("Unauthorized got excecuted")
        }
        const error = (data && data.message) || response;
        return Promise.reject(error);
    }

    return data;

}

axios.interceptors.response.use((response) => {
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error.response);
});