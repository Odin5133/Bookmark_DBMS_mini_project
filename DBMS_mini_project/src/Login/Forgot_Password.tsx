import * as React from "react";
import { useState } from "react";
import { IconUserHexagon, IconKey, IconMailFilled } from "@tabler/icons-react";
import { Label, TextInput, Button } from "flowbite-react";
import axios from "axios";
import Cookies from "js-cookie";
import signInBackground from "/signIn.jpg";
import toast from "react-hot-toast";

function Forgot_Password({ setCurOperation, setResetPass }) {
  const [email, setEmail] = useState("");

  const handleEmail = () => {
    axios
      .post("http://127.0.0.1:8000/auth/users/reset_password/", {
        email: email,
      })
      .then((res) => {
        toast.success("Reset Email Sent");
        setResetPass(false);
        setCurOperation(0);
      })
      .catch((err) => {
        toast.error("Reset Email Failed");
        console.log(err);
      });
  };
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="mx-4 w-full max-w-md rounded-2xl border border-gray-700 bg-black bg-opacity-10 p-8 backdrop-blur-lg backdrop-filter">
        <div className="flex w-full justify-center">
          <h1 className="bg-gradient-to-r from-teal-500 to-violet-500 bg-clip-text pb-2 text-4xl font-bold text-transparent">
            Change Password
          </h1>
        </div>
        <div className="min-w-[20rem] pt-8">
          <div className="mb-2 block">
            <label className="text-lg text-gray-400">Email</label>
          </div>
          <TextInput
            id="login-email"
            type="email"
            value={email}
            icon={IconMailFilled}
            placeholder="name@flowbite.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex w-full justify-center pt-10">
          <Button
            outline
            gradientDuoTone="purpleToBlue"
            size="lg"
            onClick={handleEmail}
          >
            Send Reset Email
          </Button>
        </div>
        <div>
          <Label
            className="flex w-full cursor-pointer justify-end pt-4 text-sm text-gray-500"
            onClick={() => {
              setResetPass(false);
              setCurOperation(0);
            }}
          >
            Go Back
          </Label>
        </div>
      </div>
    </div>
  );
}

export default Forgot_Password;
