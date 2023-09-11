import '../styles/NewsChart.css';

import ArticlePreview from '../components/ArticlePreview';

const NewsChart = ({ header, article, deleteButtonHandler}) => {   
    let actualId = 1;
    const amountOfArticles = article.articles.length;

    return (

        <div className = 'default-container'>
                <h2 className='chart-header'>{header}</h2>
                
                <hr />

                {!article.error && (
                    article.articles.map((article, key) => (
                        <ArticlePreview article = {article} isLast = {actualId++ === amountOfArticles}
                         deleteButtonHandler={deleteButtonHandler} key = {key}/>
                    ))
                )}
                {!article.isLoading && article.error ? <div className='msg'>Error: {article.error}</div> : null}
                {(!article.isLoading && !article.error && article.articles.length === 0) ? <div className='msg'>Not found...</div> : null}
        </div>
    );
}
 
export default NewsChart;