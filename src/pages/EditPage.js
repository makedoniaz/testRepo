import '../styles/page/EditPage.css';

import Cookies from 'js-cookie';

import ArticleForm from '../components/ArticleForm';

import { GetArticle, UpdateArticle } from '../utils/Request';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { ScrollPageToTop } from '../utils/Page'

const EditPage = () => {
    const cookie = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')) : null;

    const navigate = useNavigate();
    const {id} = useParams();

    const [article, setArticle] = useState(null);

    useEffect(() => {
        if (!cookie || !(cookie.login === 'admin')) {
            navigate('/');
            return;
        }

        ScrollPageToTop();
        GetArticle(id).then(res => setArticle(res.data)).catch(err => console.log(err));
    }, [id, cookie, navigate])

    async function EditArticle(header, text) {
        const updatedArticle = {
            id: article.id,
            header: header,
            text: text,
        };

        await UpdateArticle(updatedArticle);
    }

    return ( 
        <div className="page">
           {article && (cookie && cookie.login === 'admin') ?
           <ArticleForm initialHeader={article.header} initialText={article.text} asyncThunk={EditArticle} />
            : null}
        </div>
    );
}

export default EditPage;