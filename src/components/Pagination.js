import '../styles/Pagination.css';

import { useDispatch, useSelector } from 'react-redux';

import { store } from '../store/Store';
import { fetchArticles } from '../features/article/articleSlice';
import { incrementCurrentPage, decrementCurrentPage } from '../features/pagination/paginationSlice';
import { GetAllArticles } from '../utils/Request';
import { ScrollPageToTop } from '../utils/Page';

const Pagination = () => {
    const pagination = useSelector((state) => state.pagination);
    const article = useSelector((state) => state.article);

    const dispatch = useDispatch();

    async function NextButtonClickHandler() {
        const currentPage = store.getState().pagination.currentPage;
        await dispatch(fetchArticles(() => GetAllArticles(currentPage + 1)));

        dispatch(incrementCurrentPage())
        ScrollPageToTop();
    }
    
    async function PrevButtonClickHandler() {
        const currentPage = store.getState().pagination.currentPage;
        await dispatch(fetchArticles(() => GetAllArticles(currentPage - 1)))

        dispatch(decrementCurrentPage());
        ScrollPageToTop();
    }
    
    return ( 
       <div className='Pagination'>
            <button disabled={!(pagination.currentPage > 1)} onClick={() => PrevButtonClickHandler()} className='btn pagination-btn hvr-gray'>&lt;</button>
            <button disabled={true} className='btn pagination-btn hvr-gray'>{pagination.currentPage}</button>
            <button disabled={!article.hasNextPage} onClick={() => NextButtonClickHandler()} className='btn pagination-btn hvr-gray'>&gt;</button>
        </div>
    );
}
 
export default Pagination;