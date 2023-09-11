import { article, user, comment } from '../utils/Api';
import { convertDateToUTC } from './Date';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7056',
})

function GetEmptyArticle() {
    return {
        from: null,
        to: null,
        header: '',
        text: ''
    };
}

export function GetAllArticles(currentPage = 1, pageSize = 20) {
    return api.post(article.filter.url + '?pageSize=' + pageSize + '&currentPage=' + currentPage, GetEmptyArticle());
}

export function GetArticle(id) {
    return api.get(article.url + '/' + id);
}

export function GetFiltredArticles(newArticle, pageSize = 20, currentPage = 1) {
    return api.post(article.filter.url + '?pageSize=' + pageSize + '&currentPage=' + currentPage, newArticle);
}

export function PostArticle(newArticle) {
    return api.post(article.url, newArticle);
}

export function DeleteArticle(id) {
    return api.delete(article.url + '?id=' + id);
}

export function UpdateArticle(updatedArticle) {
    return api.put(article.url, updatedArticle)
}

export function LoginUser(newUser) {
    return api.post(user.login.url, newUser);
}

export function GetTodayArticles(pageSize) {

    const from = convertDateToUTC(new Date())

    const to = convertDateToUTC(new Date())
    to.setDate(to.getDate() + 1);
    to.setHours(0, 0, 0);


    const article = {
        from: from,
        to: to,
        header: '',
        text: ''
    };

    return GetFiltredArticles(article, pageSize);
}

export function GetCommentsByArticleId(articleId) {
    return api.get(comment.url + '/' + articleId);
}

export function PostComment(authorId, articleId, text) {

    const newComment = {
        text: text,
        articleId: articleId,
        authorId: authorId
    }

    return api.post(comment.url, newComment)
}

export function DeleteComment(id) {
    return api.delete(comment.url + '?id=' + id);
}