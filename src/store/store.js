import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./reducers/moviesSlice";
import searchResultsReducer from "./reducers/searchResultsSlice";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    searchResults: searchResultsReducer,
  },
});

export default store;
