import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = { 
    articles: [],
    isLoading: false,
    hasNextPage: false,
    error: '',
 };

export const fetchArticles = createAsyncThunk('article/fetchArticles', async (asyncThunk, { rejectWithValue }) => {
    try {
        const response = await asyncThunk();
        return response.data;
    }
    catch(err) {
        return rejectWithValue(err.message);
    }
})

const articleSlice = createSlice({
    name:'article',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchArticles.fulfilled, (state, action) => {
                state.articles = action.payload.articles;
                state.isLoading = false;
                state.hasNextPage = action.payload.hasNextPage;
                state.error = '';
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.articles = [];
                state.error = action.error.message;
            })
    }
})
 
export default articleSlice;