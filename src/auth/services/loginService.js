import axios from 'axios';
import { handleApiResponse } from '../../utils/networkUtils';


function signIn(data) {

    return axios({
        method: 'post',
        url: 'http://localhost:3001/login',
        data: data,
        headers: { 'Content-Type': 'application/json' }
    })
        .then(data => {
            return handleApiResponse(data)
        },
            error => {
                return handleApiResponse(error)
            })
}


export const loginService = {
    signIn
}