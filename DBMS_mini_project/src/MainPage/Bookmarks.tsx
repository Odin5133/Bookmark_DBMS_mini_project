import * as React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import axios from "axios";
import StoredBookmarks from "./StoredBookmarks";
import CreateNewBookmark from "./CreateNewBookmark";

function Bookmarks() {
  const [displayOrCreate, setDisplayOrCreate] = useState(0); // 1 = display, 0 = create

  useEffect(() => {
    try {
      const access = Cookies.get("access");
      const refresh = Cookies.get("refresh");
      if (!access || !refresh) {
        console.log("No access or refresh token");
        return;
      }
      axios
        .post("http://127.0.0.1:8000/auth/jwt/verify/", {
          token: access,
        })
        .then((res) => console.log(res))
        .catch((err) => {
          console.log(err);
          if (err.status === 401) {
            console.log("Token Expired");
            axios
              .post("http://127.0.0.1:8000/auth/jwt/refresh/", {
                refresh: refresh,
              })
              .then((res) => {
                Cookies.set("access", res.data.access, {
                  secure: true,
                  sameSite: "Strict",
                });
                Cookies.set("refresh", res.data.refresh, {
                  secure: true,
                  sameSite: "Strict",
                });
                console.log("Token Refreshed");
              })
              .catch((err) => {
                console.log(err);
                window.location.href = "/"; // return to signin/up
              }); // return to signin/up
          } else window.location.href = "/"; // return to signin/up
        });
    } catch (e) {
      console.log(e);
      window.location.href = "/"; // return to signin/up
    }
  }, [displayOrCreate]);

  return (
    <div className="mx-6 mt-8 rounded-xl border border-gray-700 bg-black bg-opacity-10 bg-clip-padding p-4 text-white backdrop-blur-xl backdrop-filter">
      <div>
        <div className="text-text mb-2 mt-2 flex w-full items-center justify-around">
          <motion.div
            className="bg-opacity-120 absolute z-0 h-12 w-[45vw] rounded-md bg-clip-padding backdrop-blur-xl backdrop-filter"
            initial={{ x: "-50%" }}
            animate={{ x: displayOrCreate === 0 ? "-50%" : "50%" }}
            transition={{ type: "spring", stiffness: 300, damping: 29 }}
          />
          <div
            onClick={() => setDisplayOrCreate(0)}
            className="font-body z-10 flex w-[50%] cursor-pointer justify-center text-lg"
          >
            Show My Bookmarks
          </div>
          <div
            onClick={() => setDisplayOrCreate(1)}
            className="font-body z-10 flex w-[50%] cursor-pointer justify-center text-lg"
          >
            Create Bookmark
          </div>
        </div>
        <AnimatePresence mode="wait">
          {displayOrCreate === 0 ? (
            <motion.div
              key="storedBookmarks"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <StoredBookmarks />
            </motion.div>
          ) : (
            <motion.div
              key="createNewBookmark"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CreateNewBookmark />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Bookmarks;
