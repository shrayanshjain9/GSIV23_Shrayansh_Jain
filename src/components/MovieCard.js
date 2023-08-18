import React, { useState } from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleOverview = () => {
    setExpanded(!expanded);
  };

  if(`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}` === `https://image.tmdb.org/t/p/w780/null`) {
    return null;
  }

  return (
    <div className="shadow-lg w-64 m-4 rounded-lg">
      <Link to={`/details/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w780/${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-86 object-cover"
        />
      </Link>
      <div className="p-2">
        <div className="flex justify-between">
          <h3 className="font-semibold">{movie.title}</h3>
          <p>⭐{movie.vote_average}</p>
        </div>
        {/* <p className="truncate">{movie.overview}</p> */}
        <p
          className={`mb-2 ${
            expanded ? "max-h-none" : "max-h-12 overflow-hidden"
          }`}
        >
          {movie.overview}
        </p>
        {movie.overview.length > 15 && (
          <button
            onClick={toggleOverview}
            className="text-blue-500 hover:underline font-bold"
          >
            {expanded ? "Read Less" : "..."}
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
