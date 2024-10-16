import * as React from "react";
import { useState, useEffect } from "react";
import signInBackground from "/signIn.jpg";
import MyStats from "./MyStats";
import Bookmarks from "./Bookmarks";
import Navbar from "./Navbar";

function MainPage() {
  return (
    <div
      style={{
        backgroundImage: `url(${signInBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="min-h-screen bg-repeat"
    >
      <div className="h-full min-h-screen w-full ">
        <Navbar />
        <MyStats />
        <Bookmarks />
      </div>
    </div>
  );
}

export default MainPage;
