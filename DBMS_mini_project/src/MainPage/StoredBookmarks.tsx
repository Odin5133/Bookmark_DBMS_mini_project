import * as React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import BookmarkTemplate from "./BookmarkTemplate";
import {
  IconArrowBigLeftFilled,
  IconArrowBigRightFilled,
} from "@tabler/icons-react";
import clsx from "clsx";

function StoredBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    try {
      const access = Cookies.get("access");
      const refresh = Cookies.get("refresh");
      if (!access || !refresh) {
        console.log("No access or refresh token");
        return;
      }
      axios
        .get(`http://127.0.0.1:8000/api/bookmarks/?page=${page}`, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setBookmarks(res.data.results);
          setIsFirstPage(res.data.previous === null);
          setIsLastPage(res.data.next === null);
        })
        .catch((err) => console.log(err));
    } catch (e) {
      console.log(e);
      return;
    }
  }, [page]);
  return (
    <div>
      {bookmarks.length === 0 ? (
        <div>No Bookmarks</div>
      ) : (
        <div className="grid w-full grid-cols-1 justify-center gap-4 sm:grid-cols-2">
          {bookmarks.map((bookmark, index) => (
            <div
              key={index}
              className={`${
                index % 2 === 0 && index === bookmarks.length - 1
                  ? "sm:col-span-2 sm:justify-self-center"
                  : ""
              }`}
            >
              <BookmarkTemplate
                url={bookmark.url}
                description={bookmark.description}
                timeStamp={bookmark.timestamp}
              />
            </div>
          ))}
        </div>
      )}
      {(!isFirstPage || !isLastPage) && (
        <div className="mt-4">
          <div className="flex w-full items-center justify-center gap-3">
            {isFirstPage ? (
              <div className="rounded-full bg-slate-800 p-2">
                <IconArrowBigLeftFilled size="20" className="text-gray-500" />
              </div>
            ) : (
              <div
                className="cursor-pointer rounded-full bg-slate-800 p-2"
                onClick={() => setPage(page - 1)}
              >
                <IconArrowBigLeftFilled size="20" className="text-purple-500" />
              </div>
            )}
            <span className="text-xl">{page}</span>
            {isLastPage ? (
              <div className="rounded-full bg-slate-800 p-2">
                <IconArrowBigRightFilled size="20" className="text-gray-500" />
              </div>
            ) : (
              <div
                className="cursor-pointer rounded-full bg-slate-800 p-2"
                onClick={() => setPage(page + 1)}
              >
                <IconArrowBigRightFilled
                  size="20"
                  className="text-purple-500"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default StoredBookmarks;
