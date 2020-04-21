import axios from 'axios';

function signIn(data) {
    return axios({
        method: 'post',
        url: 'http://localhost:3001/login',
        data: data,
        headers: { 'Content-Type': 'application/json' }
    }).then(function (response) {
        // handle success
        return response;
    })
        .catch(function (error) {
            return error;
        });
}

export const loginService = {
    signIn
}