import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { IconKey } from "@tabler/icons-react";
import { Label, TextInput, Button } from "flowbite-react";
import axios from "axios";
import signInBackground from "/signIn.jpg";
import toast from "react-hot-toast";

function Reset_Password() {
  const [password, setPassword] = useState("");
  const { uid, token } = useParams<{ uid: string; token: string }>();

  const handlePassChange = () => {
    axios
      .post(`http://127.0.0.1:8000/auth/users/reset_password_confirm/`, {
        uid: uid,
        token: token,
        new_password: password,
        re_new_password: password,
      })
      .then((res) => {
        toast.success("Password Changed Successfully");
        window.location.href = "/";
      })
      .catch((err) => {
        toast.error("Password Change Failed");
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
              Reset Password
            </h1>
          </div>
          <div className="min-w-[20rem] pt-8">
            <div className="mb-2 block">
              <label className="text-lg text-gray-400">New Password</label>
            </div>
            <TextInput
              id="new-password"
              type="password"
              value={password}
              icon={IconKey}
              placeholder="Enter new password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex w-full justify-center pt-10">
            <Button
              outline
              gradientDuoTone="purpleToBlue"
              size="lg"
              onClick={handlePassChange}
            >
              Reset Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reset_Password;
