import '../styles/ArticleForm.css';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchArticles } from '../features/article/articleSlice';
import { reloadCurrentPageCount } from '../features/pagination/paginationSlice';
import { GetAllArticles } from '../utils/Request';

const ArticleForm = ({initialHeader, initialText, asyncThunk}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const stringMaxLength = 100;

    const [header, setHeader] = useState(initialHeader);
    const [text, setText] = useState(initialText);
    const [isInvalid, setIsInvalid] = useState(false);

    async function SubmitHandler(e) {
        e.preventDefault();

        const isInvalid = ValidateInput(header, text);

        if (isInvalid) {
            setIsInvalid(isInvalid);
            return;
        }

        await asyncThunk(header, text);

        dispatch(fetchArticles(GetAllArticles));
        dispatch(reloadCurrentPageCount());
        navigate('/');
    }

    function ValidateInput(header, text) {
        return (header === '' || text === '') || (header.length > stringMaxLength)
    }

    return ( 
        <div className="ArticleForm">
            <form>
                <div className="row">
                    <label>Header</label>
                    <input type="text" value={header} onChange={(e) => setHeader(e.target.value)} placeholder="Article header..." className='data-input' />

                    <label>Text</label>
                    <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Article text..." style={{height:300}} className='data-input' />
                    
                    {isInvalid && <div className='error-msg'>Invalid header or text!</div>}
                    
                    <button onClick={(e) => SubmitHandler(e)} className='right btn func-btn hvr-red bold'>Submit</button>
                </div>
            </form>
        </div>
    );
}
 
export default ArticleForm;
