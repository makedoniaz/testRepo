const Article = ({article}) => {
    return ( 
        <div className="Article">
            <h1>{article.header}</h1>
            <p>{article.date}</p>
            <p>{article.text}</p>
        </div>
    );
}
 
export default Article;