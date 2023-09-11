import articleSlice from "../features/article/articleSlice";
import paginationSlice from '../features/pagination/paginationSlice';

import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore( {
    reducer: {
        article : articleSlice.reducer,
        pagination: paginationSlice.reducer,
    }
});