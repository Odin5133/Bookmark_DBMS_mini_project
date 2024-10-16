import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { TextInput, Modal } from "flowbite-react";
import BookmarkTemplate from "./BookmarkTemplate";
import { IconSearch, IconLogout } from "@tabler/icons-react";

const Navbar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBookmark, setSelectedBookmark] = useState(null);
  const searchRef = useRef(null);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 0) {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/bookmarks?search=${searchQuery}`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("access")}`,
            },
          },
        );
        setResults(response.data.results.slice(0, 5)); // Display at most top 5 URLs
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setResults([]);
    }
  };

  const handleLogout = () => {
    axios
      .post(
        "http://127.0.0.1:8000/auth/jwt/blacklist/",
        {
          refresh: Cookies.get("refresh"),
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access")}`,
          },
        },
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    Cookies.remove("access");
    Cookies.remove("refresh");
    window.location.href = "/";
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleResultClick = (bookmark) => {
    setSelectedBookmark(bookmark);
    setShowModal(true);
  };

  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <div className="relative sm:w-2/5" ref={searchRef}>
        <TextInput
          type="text"
          value={query}
          icon={IconSearch}
          onChange={handleSearch}
          placeholder="Search bookmarks..."
          color="gray"
          className="w-full rounded-md bg-gray-700 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {results.length > 0 && (
          <div className="absolute left-0 right-0 z-10 mt-2 rounded-md bg-white text-black shadow-lg">
            <ul>
              {results.map((bookmark, index) => (
                <li
                  key={index}
                  className="cursor-pointer border-b border-gray-200 px-4 py-2"
                  onClick={() => handleResultClick(bookmark)}
                >
                  {bookmark.url.replace(/^(https?:\/\/)?(www\.)?/, "")}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        onClick={handleLogout}
        className="ml-auto rounded-md bg-red-500 px-4 py-2 font-semibold text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
      >
        Logout
      </button>

      {showModal && selectedBookmark && (
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <div className="rounded-lg bg-[#021639] text-white">
            <Modal.Header className="bg-[#163160] text-white">
              <span className="text-white">Bookmark Details</span>
            </Modal.Header>
            <Modal.Body className="bg-[#3560a97e] text-white">
              <BookmarkTemplate
                url={selectedBookmark.url}
                description={selectedBookmark.description}
                timeStamp={selectedBookmark.timestamp}
              />
            </Modal.Body>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Navbar;
