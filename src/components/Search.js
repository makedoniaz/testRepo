import '../styles/Search.css';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { fetchArticles } from '../features/article/articleSlice';
import { reloadCurrentPageCount } from '../features/pagination/paginationSlice';
import { GetAllArticles, GetFiltredArticles } from '../utils/Request';

const Search = ({ isSearching, setIsSearching }) => {
    const navigate = useNavigate();

    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [header, setHeader] = useState('');
    const [text, setText] = useState('');

    const dispatch = useDispatch();

    function searchClickHandler(e) {
        e.preventDefault();
        
        const article = {
            from: from,
            to: to,
            header: header,
            text: text
        };
        
        
        dispatch(fetchArticles(() => GetFiltredArticles(article)));
        dispatch(reloadCurrentPageCount())

        setIsSearching(false);

        navigate('/');
    }

    function clearClickHandler(e) {
        e.preventDefault();
        e.target.reset();

        setFrom(null);
        setTo(null);
        setHeader('');
        setText('');

        setIsSearching(false);

        dispatch(reloadCurrentPageCount())
        dispatch(fetchArticles(GetAllArticles));
    }

    return ( 
        <div className={"Search" + (isSearching ? '' : ' hidden')}>
            <div className="dropdown-content">
                <form className="dropdown-form" onSubmit={clearClickHandler}>
                        <label>From</label>
                        <input type='date' value={from ? from : ''} onChange={(e) => setFrom(e.target.value)} className='data-input' />

                        <label>To</label>
                        <input type='date' value={to ? to : ''} onChange={(e) => setTo(e.target.value)} className='data-input' />

                        <label>Header</label>
                        <input type='text' value={header} onChange={(e) => setHeader(e.target.value)} className='data-input' />

                        <label>Text</label>
                        <input type='text' value={text} onChange={(e) => setText(e.target.value)} className='data-input' />

                    <button onClick={searchClickHandler} id='dropdown-btn' className='btn func-btn hvr-red'>Search</button>
                    <button type='submit' className='btn func-btn hvr-red'>Clear</button>
                </form>
            </div>
        </div> 
    );
}
 
export default Search;