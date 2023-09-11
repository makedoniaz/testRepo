import '../styles/CommentSection.css';

import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { GetCommentsByArticleId, PostComment, DeleteComment } from '../utils/Request';

import Comment from './Comment';
import Cookies from 'js-cookie';

const CommentSection = ({articleId}) => {
    const cookie = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')) : null;

    const maxCommentSymbols = 3000;

    const [comments, setComments] = useState(null);
    const [isInvalid, setIsInvalid] = useState(false);
    let [inputText, setInputText] = useState('');

    let actualId = 1;


    async function PostCommentHandler() {
        setIsInvalid(inputText === '' || inputText.length > maxCommentSymbols);

        if (inputText === '' || inputText.length > maxCommentSymbols)
            return;

        try {
            await PostComment(cookie.userId, articleId, inputText);
            setInputText('');
            FetchComments(articleId);
        }
        catch(err) {
            console.log(err);
        }
    }

    async function DeleteCommentHandler(id) {
        try {
            await DeleteComment(id);
            FetchComments(articleId);
        }
        catch(err) {
            console.log(err);
        }
    }

    async function FetchComments(articleId) {
        try {
            const res = await GetCommentsByArticleId(articleId);
            setComments(res.data)
        }
        catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        FetchComments(articleId);
    }, [articleId])

    return ( 
        <div className='default-container comment-section'>
            <h2 className='gray'>{comments ? comments.length : 0} {comments && comments.length === 1 ? 'Comment' : 'Comments'}</h2>
            <hr />


            {comments && comments.length !== 0 ? comments.map((comment) =>
             (
                <Comment comment={comment} isLast={actualId++ === comments.length} 
                currentUserLogin={cookie ? cookie.login : null} deleteHandler={DeleteCommentHandler} key={comment.id} />
             )) : null
            }

            {cookie && cookie.isAuthenticated ? 
                <div>
                    <textarea className='comment-textarea' placeholder='Add a comment...' value={inputText} onChange={(e) => setInputText(e.target.value)} />
                    {isInvalid && <div className='error-msg max-width'>Invalid comment!</div>}
                    <button className='btn func-btn hvr-gray dark-gray comment-add' onClick={PostCommentHandler}>Post</button>
                </div>
                : <div className='filler-div'><NavLink to='/login' className='comment-msg gray'>Login to post comments...</NavLink></div>
            }

        </div>
    );
}
 
export default CommentSection;