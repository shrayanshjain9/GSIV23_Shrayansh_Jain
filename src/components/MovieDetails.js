import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMovieDetails } from "../utility/api";
import { useDispatch } from "react-redux";
import { setMovies } from "../store/reducers/moviesSlice";

const MovieDetails = () => {
    const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(id).then((data) => setMovie(data));

    return () => {
        dispatch(setMovies([]));
    }
  }, [id]);

  const handleBack = () => {
    navigate("/");
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="relative w-full shadow-md">
        <div className="flex justify-between items-center border border-gray-300 overflow-hidden">
          <div className="flex w-1/2">
            <h1 className="font-bold m-5 text-gray-500">Movie Details</h1>
          </div>
          <div className="flex">
            <svg
              viewBox="0 0 900.378 1000"
              fill="grey"
              height="2em"
              width="2em"
              style={{ margin: "16px", padding: "1px", cursor: "pointer" }}
              onClick={handleBack}
            >
              <path d="M888.188 514c10.667 10.667 14.333 19.667 11 27-3.333 7.333-12.333 11-27 11h-84v310c0 9.333-.333 16.333-1 21-.667 4.667-3.333 9-8 13s-12.333 6-23 6h-204V592h-204v310h-194c-18.667 0-30.333-3.333-35-10-4.668-6.667-7-16.667-7-30V552h-84c-14.667 0-23.668-3.667-27-11-3.333-7.333.333-16.333 11-27l400-402c10.667-10.667 23.333-16 38-16 14.667 0 27.333 5.333 38 16l400 402" />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="m-4 w-60">
          <img
            src={`https://image.tmdb.org/t/p/w780/${movie.poster_path}`}
            alt={movie.title}
            className=""
          />
        </div>
        <div className=" m-2">
          <div className="flex text-lg">
            <h3 className="font-bold">{movie.title}</h3>
            <p className="ml-4">⭐{movie.vote_average}</p>
          </div>
          <p><span className="font-semibold">Year of Release:  </span>{movie.release_date}</p>
          <p><span className="font-semibold">Length: </span>{movie.runtime} minutes</p>
          <p className="max-w-lg"><span className="font-semibold">Description: </span>{movie.overview}</p>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
