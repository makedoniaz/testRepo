import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
    currentPage: 1,
};

const paginationSlice = createSlice({
    name:'pagination',
    initialState,
    reducers: {
        incrementCurrentPage(state) {
            state.currentPage = state.currentPage + 1;
        },
        decrementCurrentPage(state) {
            state.currentPage--;
        },
        reloadCurrentPageCount(state) {
            state.currentPage = 1;
        }
    },
})

export const { incrementCurrentPage, decrementCurrentPage, reloadCurrentPageCount } = paginationSlice.actions;

export default paginationSlice;
