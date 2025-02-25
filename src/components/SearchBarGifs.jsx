import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FcSearch } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

const SearchBarGifs = () => {
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");   //when user does not provide any query and press Enter key or searchicon
  const navigate = useNavigate();

  const searching = () => {
    //if query is empty return
    if (query.trim() === "") {
      setMessage("Please write Something...")
      return;
    }
    //if user type some query 
    setMessage("")                  //clear message if input is valid
    navigate(`/search/${query}`);   //navigate to query
    setQuery("")                    //clear the query from searchbar after navigating to searchpage
  };

  return (
  
  <div className="flex flex-col">

    {/* search bar */}
    <div className="flex relative gap-2">
      {/* Input */}
      <input
        type="text"
        value={query}
        placeholder="Search all the Gifs and Stickers"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && searching()}
        className="w-full py-4 pl-3 text-xl rounded-bl rounded-tl border border-l border-gray-300 outline-none"
      />

      {/* Cross icon remove query */}
      {query && ( 
        <button 
          onClick={() => setQuery("")}
          className="absolute right-20 top-5 cursor-pointer opacity-50"
        >
          <AiOutlineCloseCircle size={25}/>
        </button>
       )}

      {/* Search Btn */}
      <button onClick={searching}  className="bg-teal-200 px-4 py-2 rounded-tr rounded-br cursor-pointer" >
        <FcSearch size={35} className="-scale-x-100" />
      </button>
    </div>

    
    {/*Message :  show msg when user press enter or click on searchbtn without writing any query */}
    { message && <span className="text-red-500 font-semibold w-full">{message}</span> }
    
  </div>
  );
};

export default SearchBarGifs;
