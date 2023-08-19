import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUpcomingMovies } from "../utility/api";
import { setMovies } from "../store/reducers/moviesSlice";
import MovieCard from "./MovieCard";
import SearchBar from "./SearchBar";

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies);
  const searchResults = useSelector((state) => state.searchResults);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  // Fetch more movies when scrolling near the bottom
  const fetchMoreMovies = async () => {
    if (!loading) {
      setLoading(true);
      const nextPage = page + 1;
      const data = await fetchUpcomingMovies(nextPage);
      dispatch(setMovies([...movies, ...data])); // Update movies state
      setPage(nextPage);
      setLoading(false);
      setScrolling(false);
    }
  };

  // Initial fetch of movies when the component mounts
  useEffect(() => {
    if (!searchResults.length) {
      dispatch(setMovies([])); // Clear the movies state
      fetchUpcomingMovies(1).then((data) => {
        const sortedData = data.slice().sort((a, b) => {
          const releaseDateA = new Date(a.release_date);
          const releaseDateB = new Date(b.release_date);
          return releaseDateA - releaseDateB;
        });
        dispatch(setMovies(sortedData));
      });
    }
  }, []);

  // Handle infinite scrolling
  const handleScroll = () => {
    if (!scrolling) {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      if (scrollTop + windowHeight >= documentHeight - 300) {
        setScrolling(true);
        fetchMoreMovies();
      }
    }
  };

  // Attach and detach scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  // Sort movies by release date
//   const sortedMovies = movies.slice().sort((a, b) => {
//     const releaseDateA = new Date(a.release_date);
//     const releaseDateB = new Date(b.release_date);
//     return releaseDateA - releaseDateB;
//   });

  return (
    <>
      <SearchBar />
      <div className="flex flex-wrap justify-center">
        {/* Display search results or sorted movies */}
        {searchResults.length ? (
          searchResults.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <>
            {movies.map((movie) => (
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
