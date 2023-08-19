import React, { useState } from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  // State to manage whether the movie overview is expanded
  const [expanded, setExpanded] = useState(false);

  // Toggle function for expanding/collapsing movie overview
  const toggleOverview = () => {
    setExpanded(!expanded);
  };

  // Check if backdrop_path is null, and if so, don't render the card
  if (movie.backdrop_path === null) {
    return null;
  }

  return (
    <div className="shadow-lg w-64 m-4 rounded-lg">
      {/* Link to the movie details page */}
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
        {/* Movie overview with toggle based on 'expanded' state */}
        <p
          className={`mb-2 ${
            expanded ? "max-h-none" : "max-h-12 overflow-hidden"
          }`}
        >
          {movie.overview}
        </p>
        {/* Display 'Read Less' button when overview length is greater than 15 characters */}
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
