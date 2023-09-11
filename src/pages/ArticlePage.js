import '../styles/page/ArticlePage.css';

import Article from "../components/Article";
import CommentSection from '../components/CommentSection';

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetArticle } from '../utils/Request';

const ArticlePage = () => {
    const {id} = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        GetArticle(id).then(res => setArticle(res.data)).catch(err => console.log(err));
    }, [id])

    return (
        <div className='page'>
            <div className='m-80'>
                {article && <Article article={article}/>}
                {article && <CommentSection articleId={id}/>}
            </div>
        </div>
    );
}
 
export default ArticlePage;