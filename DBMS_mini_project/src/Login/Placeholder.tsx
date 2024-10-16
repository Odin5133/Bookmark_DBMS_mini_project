// import * as React from "react";
import * as React from "react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import signInBackground from "/signIn.jpg";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import axios from "axios";
import Forgot_Password from "./Forgot_Password";
import Change_UN from "./Change_UN";
import Cookies from "js-cookie";

function Placeholder() {
  const [curOperation, setCurOperation] = useState(0);
  const [resetPass, setResetPass] = useState(false);
  const [resetUN, setResetUN] = useState(false);

  useEffect(() => {
    try {
      const access = Cookies.get("access");
      const refresh = Cookies.get("refresh");
      if (!access || !refresh) {
        return;
      }
      axios
        .post("http://127.0.0.1:8000/auth/jwt/verify/", {
          token: access,
        })
        .then((res) => {
          console.log(res);
          window.location.href = "/main";
        })
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
                window.location.href = "/main";
              })
              .catch((err) => console.log(err));
          } else return;
        });
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${signInBackground})`,
        height: "100vh",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex h-full w-full items-center justify-center">
        <AnimatePresence mode="wait">
          {curOperation === 1 ? (
            <motion.div
              key="signUp"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SignUp setCurOperation={setCurOperation} />
            </motion.div>
          ) : curOperation === 0 ? (
            <motion.div
              key="signIn"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SignIn
                setCurOperation={setCurOperation}
                setResetPass={setResetPass}
                setResetUN={setResetUN}
              />
            </motion.div>
          ) : resetPass ? (
            <motion.div
              key="resetPass"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Forgot_Password
                setResetPass={setResetPass}
                setCurOperation={setCurOperation}
              />
            </motion.div>
          ) : resetUN ? (
            <motion.div
              key="resetUN"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Change_UN
                setResetUN={setResetUN}
                setCurOperation={setCurOperation}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Placeholder;
