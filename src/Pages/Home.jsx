import React from "react";
import Table from "../Component/Table";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Navigate } from "react-router-dom";
const Home = () => {
  return (
    <div>
      <Table />
      <SignedOut>
        <h1 className="text-4xl md:leading-snug font-bold my-2">
          Welcome to your own Personal Finance Traker
        </h1>
      </SignedOut>
      <SignedIn>
        <Navigate to="/dashbord" />
      </SignedIn>
    </div>
  );
};

export default Home;
