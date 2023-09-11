import '../styles/page/LoginPage.css';

import LoginForm from '../components/LoginForm'

import { useEffect } from 'react';

import { ScrollPageToTop } from '../utils/Page';

const LoginPage = () => {

    useEffect(() => {
        ScrollPageToTop(true);
    })

    return ( 
        <div className="page">
            <LoginForm />
        </div>
     );
}
 
export default LoginPage;