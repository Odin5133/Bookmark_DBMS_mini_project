import * as React from "react";
import { useState } from "react";
import { IconUserHexagon, IconKey } from "@tabler/icons-react";
import { Label, TextInput, Button } from "flowbite-react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import signInBackground from "/signIn.jpg";
import { useParams } from "react-router-dom";

interface SignInProps {
  setCurOperation: (operation: number) => void;
}

function Reset_Username() {
  const [uName, setUName] = useState("");
  //   const [uid, setUid] = useState("");
  //   const [token, setToken] = useState("");

  //   const url = window.location.href;
  //   const urlParts = url.split("/");
  //   setUid(urlParts[urlParts.length - 2]);
  //   setToken(urlParts[urlParts.length - 1]);
  const { uid, token } = useParams<{ uid: string; token: string }>();

  const handleUNChange = () => {
    axios
      .post(`http://127.0.0.1:8000/auth/users/reset_username_confirm/`, {
        uid: uid,
        token: token,
        new_username: uName,
      })
      .then((res) => {
        toast.success("Username Changed Successfully");
        window.location.href = "/";
      })
      .catch((err) => {
        toast.error("Username Change Failed");
        console.log(err);
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${signInBackground})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex min-h-screen items-center justify-center ">
        <div className="mx-4 w-full max-w-md rounded-2xl border border-gray-700 bg-black bg-opacity-10 p-8 backdrop-blur-lg backdrop-filter">
          <div className="flex w-full justify-center">
            <h1 className="bg-gradient-to-r from-teal-500 to-violet-500 bg-clip-text pb-2 text-4xl font-bold text-transparent">
              Change Username
            </h1>
          </div>
          <div className="min-w-[20rem] pt-8">
            <div className="mb-2 block">
              <label className="text-lg text-gray-400">Username</label>
            </div>
            <TextInput
              id="login-email"
              type="email"
              value={uName}
              icon={IconUserHexagon}
              placeholder="name@flowbite.com"
              required
              onChange={(e) => setUName(e.target.value)}
            />
          </div>
          <div className="flex w-full justify-center pt-10">
            <Button
              outline
              gradientDuoTone="purpleToBlue"
              size="lg"
              onClick={handleUNChange}
            >
              Change Username
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reset_Username;
