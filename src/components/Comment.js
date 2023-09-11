import '../styles/Comment.css';

import moment from 'moment'

const Comment = ({ comment, isLast, currentUserLogin, deleteHandler }) => {
    const date = moment(comment.creationDate).format('YYYY-MM-DD HH:mm');

    return ( 
        <div className="Comment">
            <p className='comment-author gray'>{comment.authorLogin}</p> 
            <span className='comment-date gray'>{date}</span>

            <p className='comment-text'>{comment.text}</p>

            {(comment.authorLogin === currentUserLogin || currentUserLogin === 'admin') ? 
            <span className='btn delete-comment' role='button' onClick={() => deleteHandler(comment.id)}>Delete</span> 
            : null}

            {!isLast && <hr />}
        </div>
    );
}
 
export default Comment;