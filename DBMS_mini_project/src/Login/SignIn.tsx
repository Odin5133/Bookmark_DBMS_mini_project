import * as React from "react";
import { useState } from "react";
import { IconUserHexagon, IconKey } from "@tabler/icons-react";
import { Label, TextInput, Button } from "flowbite-react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

interface SignInProps {
  setCurOperation: (operation: number) => void;
  setResetPass: (operation: Boolean) => void;
  setResetUN: (operation: Boolean) => void;
}

function SignIn({ setCurOperation, setResetPass, setResetUN }: SignInProps) {
  const [uName, setUName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/auth/jwt/create", {
        username: uName,
        password: password,
      })
      .then((response) => {
        console.log(response);
        Cookies.set("access", response.data.access, {
          secure: true,
          sameSite: "Strict",
        });
        Cookies.set("refresh", response.data.refresh, {
          secure: true,
          sameSite: "Strict",
        });
        toast.success("User Logged In Successfully");
        window.location.href = "/main";
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 401) {
          toast.error(error.response.data.detail);
        } else {
          console.log(error);
          toast.error("User Login Failed");
        }
      });
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="mx-4 w-full max-w-md rounded-2xl border border-gray-700 bg-black bg-opacity-10 p-8 backdrop-blur-lg backdrop-filter">
        <div className="flex w-full justify-center">
          <h1 className="bg-gradient-to-r from-teal-500 to-violet-500 bg-clip-text pb-2 text-4xl font-bold text-transparent">
            Sign In
          </h1>
        </div>
        <div className="min-w-[20rem] pt-8">
          <div className="mb-2 block">
            <label className="text-lg text-gray-400">Email</label>
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
        <div className="pt-5">
          <div className="mb-2 block">
            <label className="text-lg text-gray-400">Password</label>
          </div>
          <TextInput
            id="password1"
            icon={IconKey}
            value={password}
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex w-full justify-center pt-10">
          <Button
            outline
            gradientDuoTone="purpleToBlue"
            size="lg"
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </div>
        <div>
          <div className="flex flex-col items-end space-y-2 pt-4">
            <Label
              className="cursor-pointer text-sm text-gray-500 duration-300 hover:text-gray-300"
              onClick={() => setCurOperation(1)}
            >
              Don't have an account?
            </Label>
            <Label
              className="cursor-pointer text-sm text-gray-500 duration-300 hover:text-gray-300"
              onClick={() => {
                setResetUN(true);
                setCurOperation(-1);
              }}
            >
              Reset Username
            </Label>
            <Label
              className="cursor-pointer text-sm text-gray-500 duration-300 hover:text-gray-300"
              onClick={() => {
                setResetPass(true);
                setCurOperation(-1);
              }}
            >
              Reset Password
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
