import { Avatar, Button, Textarea } from "flowbite-react";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  IconBookmarksFilled,
  IconPuzzleFilled,
  IconExclamationCircleFilled,
} from "@tabler/icons-react";
import axios from "axios";
import Cookies from "js-cookie";
import { Parser } from "@json2csv/plainjs";

type JsonData = {
  url: string;
  description: string;
  timeStamp: string;
};

function MyStats() {
  const [name, setName] = useState("Odin5133");
  const [totBm, setTotBm] = useState(10);
  const [isExtension, setIsExtension] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/auth/users/me/", {
        headers: {
          Authorization: `Bearer ${Cookies.get("access")}`,
        },
      })
      .then((response) => {
        setName(response.data.username);
        if (response.data.email !== null || response.data.email !== "") {
          setEmail(response.data.email);
        }
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("http://127.0.0.1:8000/api/bookmarks", {
        headers: {
          Authorization: `Bearer ${Cookies.get("access")}`,
        },
      })
      .then((response) => {
        setTotBm(response.data.count);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const handleDownload = async () => {
    try {
      var urlx = "http://127.0.0.1:8000/api/bookmarks";
      var jsonData: JsonData[] = [];
      var compl: Boolean = true;
      while (compl) {
        try {
          const response = await axios.get(urlx, {
            headers: {
              Authorization: `Bearer ${Cookies.get("access")}`,
            },
          });

          jsonData = jsonData.concat(response.data.results);

          if (response.data.next === null) {
            compl = false;
          } else {
            urlx = response.data.next;
          }

          // Introduce a delay of 1 second between requests
          await new Promise((resolve) => setTimeout(resolve, 1000));
        } catch (error) {
          console.error("Error fetching data:", error);
          compl = false;
        }
      }
      const parser = new Parser();
      const csv = parser.parse(jsonData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "bookmarks.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error fetching or converting data:", error);
    }
  };

  return (
    <div className="mx-4 my-4 rounded-xl border border-gray-700 bg-black bg-opacity-10 bg-clip-padding p-4 text-white backdrop-blur-xl backdrop-filter">
      <div className="mx-4 flex flex-col">
        <div className="mb-4 flex w-full flex-col items-center justify-between sm:flex-row">
          <h1 className="bg-gradient-to-r from-teal-500 to-violet-500 bg-clip-text pb-2 text-4xl font-bold text-transparent">
            {(() => {
              const hours = new Date().getHours();
              if (hours < 12) return "Good Morning";
              if (hours < 18) return "Good Afternoon";
              return "Good Evening";
            })()}
          </h1>
          <div className="mt-2 hidden  space-y-2 sm:flex sm:space-x-2 sm:space-y-0">
            <Button color="indigo" onClick={handleDownload}>
              Download
            </Button>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-start gap-8 sm:flex-row">
          <Avatar
            img="https://avatar.iran.liara.run/public"
            rounded
            size="xl"
          />
          <div className="flex flex-col gap-4">
            <h2 className="mt-2 text-4xl sm:text-5xl">{name}</h2>
            {/* <Textarea value={name} className="" /> */}
            <div className="flex flex-col">
              <span className="font-semibold text-[#858689]">
                Email Address:
              </span>
              {email !== "" ? (
                <span className="text-lg">{email}</span>
              ) : (
                <span className="flex items-center gap-1 text-lg text-red-600">
                  <IconExclamationCircleFilled />
                  Not Provided
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-4 mt-4 flex flex-col items-center justify-between gap-4 sm:w-1/2 sm:flex-row">
        <div className="flex w-full items-center justify-start rounded-xl border border-gray-700 px-4 py-2">
          <div className="mx-2 rounded-full bg-gray-800 p-2">
            <IconBookmarksFilled size={40} />
          </div>
          <div className="flex w-full flex-col items-center gap-2">
            <span className="font-semibold text-[#858689]">
              Total Bookmarks:
            </span>
            <span className="text-center text-3xl sm:text-4xl">{totBm}</span>
          </div>
        </div>
        <div className="flex w-full items-center justify-start rounded-xl border border-gray-700 px-4 py-2">
          <div className="mx-2 rounded-full bg-gray-800 p-2">
            <IconPuzzleFilled size={40} />
          </div>
          <div className="flex w-full flex-col items-center gap-2">
            <span className="font-semibold text-[#858689]">
              Extension Enabled:
            </span>
            {isExtension ? (
              <span className="text-center text-3xl text-green-500 sm:text-4xl">
                Yes
              </span>
            ) : (
              <span className="text-center text-3xl text-red-600 sm:text-4xl">
                No
              </span>
            )}
          </div>
        </div>
        <div className="mt-2 flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0 md:hidden">
          <Button color="purple" onClick={handleDownload}>
            Download Extensions
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MyStats;
