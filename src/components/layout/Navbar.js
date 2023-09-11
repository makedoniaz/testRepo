import '../../styles/Navbar.css';

import Search from '../Search';
import Cookies from 'js-cookie';

import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { fetchArticles } from '../../features/article/articleSlice';
import { GetAllArticles } from '../../utils/Request';

const Navbar = () => {
    const cookie = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')) : null;

    const [isResponsive, setIsResponsive] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function dropdownClickHandler() {
        setIsSearching(!isSearching);
    }

    function LogoutHandler() {
        Cookies.remove('auth');
        navigate('/');
        dispatch(fetchArticles(GetAllArticles));
    }

    return ( 
        <nav className={"Navbar" + (isResponsive ? ' responsive' : '')}>

            <NavLink to='/' className='btn nav-btn left hvr-gray actv'>Home</NavLink>
            <NavLink to='/about' className='btn nav-btn left hvr-gray actv'>About</NavLink>


            <div className='search-button left'>
                <div className="btn nav-btn hvr-gray" role='button' onClick={dropdownClickHandler}>Search</div>

                <Search className='Search' isSearching={isSearching} setIsSearching={setIsSearching} />
            </div>

            <div id='icon' className="right hidden" onClick={() => { setIsResponsive(!isResponsive); setIsSearching(false);}}>≡</div>
            
            <div className='right-buttons'>
                {cookie && cookie.login === 'admin' ? 
                <NavLink to='/article/add'  className={'btn nav-btn hvr-gray actv'}>Add Article</NavLink>
                : null}

                {cookie && cookie.isAuthenticated ? <NavLink to='/' className='btn nav-btn hvr-gray' onClick={LogoutHandler}>Log out</NavLink> 
                : <NavLink to='/login' className='btn nav-btn hvr-gray actv'>Log in</NavLink> }
            </div>

        </nav>
    );
}
 
export default Navbar;