import '../styles/LoginForm.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthenticateUser } from '../utils/Authentication';

const LoginForm = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    async function LoginHandler(e) {
        e.preventDefault();

        const isAuthenticated = await AuthenticateUser(login, password);
        setIsError(!isAuthenticated);

        if (isAuthenticated)
            navigate('/')
    }

    return ( 
        <div className = "LoginForm">
            <form>
                <label>Login</label>
                <input type="text" placeholder="Your login.." value={login} onChange={(e) => setLogin(e.target.value)} className='data-input'/>

                <label>Password</label>
                <input type="password" placeholder="Your password..." value={password} onChange={(e) => setPassword(e.target.value)} className='data-input'/>

                {isError && <div className='error-msg'>Invalid login or password!</div>}

                <button onClick={(e) => LoginHandler(e)} className='btn func-btn bold max-width' style={{marginTop:'5px'}}>Submit</button>
            </form>
        </div>
    );
}

export default LoginForm;