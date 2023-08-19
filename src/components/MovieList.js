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
  const searchResults = useSelector((state) => state.searchResults);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMoreMovies = async () => {
    if (!loading) {
      setLoading(true);
      const nextPage = page + 1;
      const data = await fetchUpcomingMovies(nextPage);
      dispatch(setMovies([...movies, ...data]));
      //   dispatch(setMovies(movies.concat(data)));
      setPage(nextPage);
      setLoading(false);
    }
  };

  useEffect(() => {
    let dataAppend = [];
    if (!searchResults.length) {
      dispatch(setMovies([]));
      fetchUpcomingMovies(1).then((data) => dispatch(setMovies(data)));
      //   fetchUpcomingMovies(1).then((data) => {
      //     dataAppend = data;
      //   });
      //   fetchUpcomingMovies(2).then((data) => {
      //     dataAppend = [...dataAppend, ...data];
      //   });
      //   fetchUpcomingMovies(3).then((data) => {
      //     dataAppend = [...dataAppend, ...data];
      //   });
      //   fetchUpcomingMovies(4).then((data) => {
      //     dataAppend = [...dataAppend, ...data];
      //   });
      //   fetchUpcomingMovies(5).then((data) => {
      //     dataAppend = [...dataAppend, ...data];
      //   });
      //   fetchUpcomingMovies(6).then((data) => {
      //     dataAppend = [...dataAppend, ...data];
      //   });
      //   fetchUpcomingMovies(7).then((data) => {
      //     dataAppend = [...dataAppend, ...data];
      //     dispatch(setMovies(dataAppend));
      //   });
    }
  }, []);

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
  }, [loading]);

  //   const currentDate = new Date();

  //   const filteredMovies = movies.filter((movie) => {
  //     const releaseDate = new Date(movie.release_date);
  //     return releaseDate > currentDate;
  //   });

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
