
const data = { access_token: "access_token" }

function signIn(token) {
    return new Promise(resolve => {
        resolve(data);
    });
};


export const mockLoginService = {
    signIn
};