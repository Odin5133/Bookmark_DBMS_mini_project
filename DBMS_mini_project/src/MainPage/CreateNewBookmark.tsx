import React, { useState } from "react";
import axios from "axios";
import { TextInput, Button } from "flowbite-react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

function CreateNewBookmark() {
  const [url, setUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get("access");
    if (!token) {
      alert("Authorization token not found");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/bookmarks/",
        { url },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success("Bookmark created successfully!");
      setUrl("");
    } catch (error) {
      console.error("Error creating bookmark:", error);
      toast.error("Failed to create bookmark");
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-lg rounded-lg p-8 shadow-md">
        <h2 className="mb-6 bg-gradient-to-r from-teal-500 to-violet-500 bg-clip-text text-center text-[30px] font-bold text-transparent">
          Create New Bookmark
        </h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="url"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              URL
            </label>
            <TextInput
              type="url"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <div className="flex w-full justify-center">
            <Button gradientMonochrome="purple" onClick={handleSubmit}>
              Create Bookmark
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNewBookmark;
