import '../styles/app/App.css';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import BackToTopButton from '../components/BackToTopButton';

import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ArticlePage from '../pages/ArticlePage';
import LoginPage from '../pages/LoginPage';
import AddPage from '../pages/AddPage';
import EditPage from '../pages/EditPage';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { fetchArticles } from '../features/article/articleSlice';
import { GetAllArticles } from '../utils/Request';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArticles(GetAllArticles));
  }, [dispatch])

  return (
    <BrowserRouter>
      <div className="App">
          <Navbar />

          <Routes>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="article/:id" element={<ArticlePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="/article/add" element={ <AddPage />} />
            <Route path="/article/:id/edit" element={<EditPage />} />
          </Routes>

          <BackToTopButton />
          
          <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
