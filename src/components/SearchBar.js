import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchResults } from "../store/reducers/searchResultsSlice";
import { searchMovies } from "../utility/api";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingResults, setLoadingResults] = useState(false);

  // const handleSearch = async (e) => {
  //   // setSearchQuery(e.target.value);
  //   if (searchQuery) {
  //     const results = await searchMovies(searchQuery, 1);
  //     console.log("Search API calling", results);
  //     dispatch(setSearchResults(results));
  //   }
  // };

  const handleSearch = async () => {
    if (searchQuery) {
      setLoadingResults(true);
      let results = [];
      let nextPage = 1;

      while (true) {
        const data = await searchMovies(searchQuery, nextPage);
        if (data.length === 0) break;
        results = [...results, ...data];
        nextPage++;
      }

      dispatch(setSearchResults(results));
      setLoadingResults(false);
    }
  };

  //implementing debouncing for search results
  useEffect(() => {
    const timer = setTimeout(() => handleSearch(), 200);
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery === "") {
      console.log("inside empty string cond");
      dispatch(setSearchResults([]));
    }
  }, [searchQuery, dispatch]);

  return (
    <div className="relative w-full shadow-md">
      <div className="flex justify-between items-center border border-gray-300 overflow-hidden">
        <div className="flex w-1/2">
          <svg
            viewBox="0 0 1024 1024"
            fill="grey"
            height="2em"
            width="2em"
            style={{ position: "relative", left: "65px", top: "16px" }}
          >
            <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
          </svg>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            // onChange={(e) => handleSearch(e)}
            // onKeyUp={handleSearch}
            className="font-semibold rounded-md bg-gray-200 px-4 py-2 pl-12 m-3 ml-7 border w-full border-gray-300  focus:outline-none focus:border-gray-400 "
          />
        </div>
        <div className="flex">
          <svg
            viewBox="0 0 900.378 1000"
            fill="grey"
            height="2em"
            width="2em"
            style={{ margin: "16px", padding: "1px" }}
          >
            <path d="M888.188 514c10.667 10.667 14.333 19.667 11 27-3.333 7.333-12.333 11-27 11h-84v310c0 9.333-.333 16.333-1 21-.667 4.667-3.333 9-8 13s-12.333 6-23 6h-204V592h-204v310h-194c-18.667 0-30.333-3.333-35-10-4.668-6.667-7-16.667-7-30V552h-84c-14.667 0-23.668-3.667-27-11-3.333-7.333.333-16.333 11-27l400-402c10.667-10.667 23.333-16 38-16 14.667 0 27.333 5.333 38 16l400 402" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
