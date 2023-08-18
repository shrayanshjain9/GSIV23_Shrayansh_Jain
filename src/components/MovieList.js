import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUpcomingMovies } from "../utility/api";
import { setMovies } from "../store/reducers/moviesSlice";
import { setSearchResults } from "../store/reducers/searchResultsSlice";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  //   console.log("Check movies", movies);
  const searchResults = useSelector((state) => state.searchResults);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMoreMovies = async () => {
    if (!loading) {
      setLoading(true);
      const data = await fetchUpcomingMovies(page + 1);
      dispatch(setMovies([...movies, ...data]));
      setPage(page + 1);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchResults.length) {
      fetchUpcomingMovies(1).then((data) => dispatch(setMovies(data)));
    }
  }, [dispatch, searchResults]);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.scrollY;

    if (scrollTop + windowHeight >= documentHeight - 300) {
      fetchMoreMovies();
      console.log("Check movies", movies);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [movies, loading]);

  const sortedMovies = movies.slice().sort((a, b) => {
    const releaseDateA = new Date(a.release_date);
    const releaseDateB = new Date(b.release_date);
    return releaseDateA - releaseDateB;
  });

  return (
    <>
      <SearchBar />
      <div className="flex flex-wrap justify-center">
        {searchResults.length ? (
          searchResults.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <>
            {sortedMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </>
        )}
        {loading && <p>Loading more movies...</p>}
      </div>
    </>
  );
};

export default MovieList;
