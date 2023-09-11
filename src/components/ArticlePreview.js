import '../styles/ArticlePreview.css';

import Cookies from 'js-cookie';

import { NavLink } from 'react-router-dom';
import { DeleteArticle } from '../utils/Request';
import { ScrollPageToTop } from '../utils/Page'

import moment from 'moment';

const ArticlePreview = ({ article, isLast, deleteButtonHandler }) => {
    const cookie = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')) : null;

    const date = moment(article.creationDate).format('YYYY-MM-DD HH:mm');

    async function DeleteButtonHandler() {
        await DeleteArticle(article.id);
        deleteButtonHandler();
    }

    return ( 
        <div className = 'ArticlePreview'>
            <NavLink to={'/article/' + article.id} onClick={ScrollPageToTop} className='btn preview-btn'>
                <h2 className='preview-header'>{article.header}</h2>
            </NavLink>
            <p className='date'>{date}</p>

            {cookie && cookie.login === 'admin' ? <div className='functionality'>
                <span className='btn preview-btn right' role='button' onClick={DeleteButtonHandler} style={{color: '#f44336'}}>Delete</span>
                <NavLink to={'/article/' + article.id + '/edit'} style={{color: '#555'}} className='btn preview-btn'>Edit</NavLink>
            </div> : null}

            {!isLast && <hr />}
        </div>
     );
}

export default ArticlePreview;