import '../styles/page/HomePage.css';

import NewsChart from '../components/NewsChart';
import Pagination from '../components/Pagination';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { GetTodayArticles} from '../utils/Request';
import { fetchArticles } from '../features/article/articleSlice';
import { GetAllArticles } from '../utils/Request';

const HomePage = () => {
    const dispatch = useDispatch();

    const article = useSelector((state) => state.article);
    const pagination = useSelector((state) => state.pagination);
    const [todayArticles, setTodayArticles] = useState(null)
    
    useEffect( () => {
        GetTodayArticles(5).then((res) => setTodayArticles(res.data)).catch((err) => console.log(err.message));
    }, [])

    async function DeleteButtonHandler() {
        GetTodayArticles(5).then((res) => setTodayArticles(res.data)).catch((err) => console.log(err.message));
        dispatch(fetchArticles(() => GetAllArticles(pagination.currentPage)));
    }

    return ( 
        <div className="page">
            <div className='Homepage-content'>

                <div className='aside-news'>
                    {todayArticles && <NewsChart header="Today" article={todayArticles} deleteButtonHandler={DeleteButtonHandler}/>}
                </div>

                <div className='main-news'>
                    <NewsChart header="News" article={article} deleteButtonHandler={DeleteButtonHandler} />

                    <div className='center'>
                        {(!article.error && article.articles.length !== 0) ? <Pagination /> : null}
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default HomePage;