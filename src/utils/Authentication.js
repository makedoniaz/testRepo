import Cookies from 'js-cookie';

import { LoginUser } from './Request';

export async function AuthenticateUser(login, password) {
    const user = {
        login: login == null ? '' : login,
        password: password == null ? '' : password
    }

    try {
        const response = await LoginUser(user);
        const isAuthenticated = response.data.isAuthenticated;

        if (isAuthenticated) {
            const expirationTime = new Date(new Date().getTime() + 600000 * 6);
            Cookies.set('auth', JSON.stringify(response.data), { expires: expirationTime });
        }

        return isAuthenticated;
    }
    catch(err) {
        console.log(err.message);
        return false;
    }
}