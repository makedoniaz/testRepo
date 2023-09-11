import '../styles/page/AddPage.css';

import Cookies from 'js-cookie';
import ArticleForm from '../components/ArticleForm';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { PostArticle } from '../utils/Request';

const AddPage = () => {
    const cookie = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')) : null;

    const navigate = useNavigate();
    
    useEffect(() => {
        if (!cookie || !(cookie.login === 'admin')) {
            navigate('/');
        }
    })

    async function AddArticle(header, text) {
        const newArticle = {
            header: header,
            text: text
        }

        await PostArticle(newArticle);
    }

    return (
        <div className="page">
            {cookie && (cookie.login === 'admin') ?
            <ArticleForm initialHeader={''} initialText={''} asyncThunk={AddArticle} />
            : null}
        </div>
    );
}
 
export default AddPage;