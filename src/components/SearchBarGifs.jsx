import React, { useState, useEffect, useRef, useContext } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FcSearch } from "react-icons/fc";
import { useNavigate, Link } from "react-router-dom";
import { GifContext } from "../context/GifContext";
import { useDebounce } from "../hooks/useDebounce";
import Loader from "./Loader";

const DEBOUNCE_MS = 350;
const MIN_QUERY_LENGTH = 2;
const DROPDOWN_LIMIT = 10;

const SearchBarGifs = () => {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");
  const [dropdownResults, setDropdownResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const { gf, filter } = useContext(GifContext);
  const debouncedQuery = useDebounce(query.trim(), DEBOUNCE_MS);

  // Fetch search results when debounced query changes
  useEffect(() => {
    if (debouncedQuery.length < MIN_QUERY_LENGTH) {
      setDropdownResults([]);
      setIsDropdownOpen(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setIsDropdownOpen(true);

    const fetchSuggestions = async () => {
      try {
        const { data } = await gf.search(debouncedQuery, {
          limit: DROPDOWN_LIMIT,
          type: filter,
          lang: "en",
          sort: "relevant",
        });
        if (!cancelled) {
          setDropdownResults(data || []);
        }
      } catch {
        if (!cancelled) setDropdownResults([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchSuggestions();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, filter, gf]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searching = () => {
    if (query.trim() === "") {
      setMessage("Please write Something...");
      return;
    }
    setMessage("");
    setIsDropdownOpen(false);
    navigate(`/search/${encodeURIComponent(query.trim())}`);
    setQuery("");
  };

  const handleResultClick = () => {
    setIsDropdownOpen(false);
    setQuery("");
  };

  const showDropdown = isDropdownOpen && query.trim().length >= MIN_QUERY_LENGTH;

  return (
    <div className="flex flex-col relative" ref={dropdownRef}>
      {/* search bar */}
      <div className="flex relative gap-2">
        <input
          type="text"
          value={query}
          placeholder="Search all the Gifs and Stickers"
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && searching()}
          onFocus={() =>
            query.trim().length >= MIN_QUERY_LENGTH && setIsDropdownOpen(true)
          }
          className="w-full py-4 pl-3 text-[13px] sm:text-xl rounded-bl rounded-tl border border-l border-gray-300 outline-none"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-20 top-4 cursor-pointer opacity-50"
            aria-label="Clear search"
          >
            <AiOutlineCloseCircle size={25} />
          </button>
        )}

        <button
          type="button"
          onClick={searching}
          className="bg-teal-200 px-2 py-1 sm:px-4 sm:py-2 rounded-tr rounded-br cursor-pointer"
          aria-label="Search"
        >
          <FcSearch className="-scale-x-100 size-6 sm:size-8" />
        </button>
      </div>

      {/* Dropdown: search results as you type */}
      {showDropdown && (
        <div className="search-dropdown-scroll absolute top-full left-0 right-0 mt-2 z-30 max-h-[70vh] overflow-y-auto rounded-xl border border-gray-600/80 bg-gray-800/95 shadow-2xl shadow-black/50 backdrop-blur-sm ring-1 ring-white/5">
          {loading ? (
            <div className="p-6 flex justify-center">
              <Loader />
            </div>
          ) : dropdownResults.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-4">
                {dropdownResults.map((gif) => (
                  <Link
                    key={gif.id}
                    to={`/${gif.type}/${gif.slug}`}
                    onClick={handleResultClick}
                    className="group block rounded-xl overflow-hidden aspect-video bg-gray-700/80 ring-1 ring-gray-600/50 transition-all duration-200 hover:ring-2 hover:ring-teal-400/80 hover:scale-[1.02] hover:shadow-lg hover:shadow-teal-500/10"
                  >
                    <img
                      src={gif?.images?.fixed_width?.url}
                      alt={gif?.title || "GIF"}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                  </Link>
                ))}
              </div>
              <div className="sticky bottom-0 border-t border-gray-600/60 bg-gray-800/90 px-4 py-3 text-center">
                <button
                  type="button"
                  onClick={searching}
                  className="rounded-lg bg-teal-500/20 px-4 py-2 text-sm font-semibold text-teal-400 transition-colors hover:bg-teal-500/30 hover:text-teal-300 cursor-pointer"
                >
                  See all results for &quot;{query.trim()}&quot;
                </button>
              </div>
            </>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-400 text-sm">No results for &quot;{debouncedQuery}&quot;</p>
              <p className="mt-1 text-gray-500 text-xs">Try a different search term</p>
            </div>
          )}
        </div>
      )}

      {message && (
        <span className="text-red-500 font-semibold w-full">{message}</span>
      )}
    </div>
  );
};

export default SearchBarGifs;
