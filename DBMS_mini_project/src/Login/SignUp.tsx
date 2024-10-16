// import React from "react";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  IconUserHexagon,
  IconKey,
  IconKeyFilled,
  IconCircleDashedCheck,
  IconProgressX,
} from "@tabler/icons-react";
import { Label, TextInput, Button } from "flowbite-react";
import axios from "axios";
import toast from "react-hot-toast";

function SignUp({ setCurOperation }) {
  const [uName, setUName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPassSet, setNewPassSet] = useState(false);
  const [errors, setErrors] = useState({
    minValueValidation: false,
    numberValidation: false,
    capitalLetterValidation: false,
    specialCharacterValidation: false,
  });

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      setConfirmPassword("");
      setPassword("");
      return;
    }
    if (!newPassSet) {
      toast.error("Password does'nt pass password requirements");
      setConfirmPassword("");
      setPassword("");
      return;
    }
    console.log(uName, password);
    axios
      .post("http://127.0.0.1:8000/auth/users/", {
        username: uName,
        password: password,
      })
      .then((response) => {
        console.log(response);
        toast.success("User Created Successfully");
        setConfirmPassword("");
        setPassword("");
        setUName("");
        setCurOperation(0);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 400) {
          alert(error.response.data);
        }
        toast.error("User Creation Failed");
      });
  };

  const handlePasswordChange = (e: Event) => {
    e.preventDefault();
    const validatePassword = (password: string) => {
      const newErrors = {
        minValueValidation: password.length >= 8,
        numberValidation: /\d/.test(password),
        capitalLetterValidation: /[A-Z]/.test(password),
        specialCharacterValidation: /[^A-Za-z0-9]/.test(password),
      };

      setErrors(newErrors);

      const allValid = Object.values(newErrors).every((isValid) => isValid);
      setNewPassSet(allValid);
      // console.log(allValid);
    };
    validatePassword(e.target.value);
    setPassword(e.target.value);
  };

  return (
    <div>
      <div className=" rounded-2xl border border-gray-700 bg-black bg-opacity-10 bg-clip-padding px-12 py-8 font-mono backdrop-blur-lg backdrop-filter">
        <div className="flex w-full justify-center">
          <h1 className="bg-gradient-to-r from-teal-500 to-violet-500 bg-clip-text text-[45px] font-bold text-transparent">
            Sign Up
          </h1>
        </div>
        <div className="min-w-[20rem] pt-8">
          <div className="mb-1 block">
            <label className="text-lg text-gray-400">Username</label>
          </div>
          <TextInput
            id="login-email"
            type="email"
            icon={IconUserHexagon}
            placeholder="name@flowbite.com"
            required
            value={uName}
            onChange={(e) => setUName(e.target.value)}
            // Add this line
          />
        </div>
        <div className="pt-5">
          <div className="mb-1 block">
            <label className="text-lg text-gray-400">Password</label>
          </div>
          <TextInput
            id="password1"
            icon={IconKey}
            type="password"
            required
            className="w-full"
            value={password}
            onChange={handlePasswordChange}
          />
          {Object.entries(errors).map(([key, value]) => (
            <div key={key} className="my-3 flex items-center gap-1">
              {value ? (
                <IconCircleDashedCheck className="h-auto w-4  text-[#19ee20]" />
              ) : (
                <IconProgressX className="h-auto w-4 text-[#ed5959]" />
              )}
              <p
                className={`text-base ${
                  value ? "text-green-500" : "text-red-500"
                } leading-tight`}
              >
                {key === "minValueValidation" &&
                  "Password must be at least 8 Characters"}
                {key === "numberValidation" &&
                  "Password must have at least one Number"}
                {key === "capitalLetterValidation" &&
                  "Password must have at least one Capital Letter"}
                {key === "specialCharacterValidation" &&
                  "Password must have at least one Special Character"}
              </p>
            </div>
          ))}
        </div>
        <div className="pt-5">
          <div className="mb-1 block">
            <label className="text-lg text-gray-400">Repeat Password</label>
          </div>
          <TextInput
            id="confirmPassword"
            icon={IconKeyFilled}
            type="password"
            required
            className="w-full"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="flex w-full justify-center pt-10">
          <Button
            outline
            gradientDuoTone="purpleToBlue"
            size="lg"
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </div>
        <div>
          <Label
            className="flex w-full cursor-pointer justify-end pt-4 text-sm text-gray-500"
            onClick={() => setCurOperation(0)}
          >
            Already have an Account?
          </Label>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
