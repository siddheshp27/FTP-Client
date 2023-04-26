import React, { useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";

export default function App() {
  const url = "http://127.0.0.1:8080";

  const [page, setPage] = useState("login");
  const [currFiles, setCurrFiles] = useState({ files: [], folder: [] });
  const [info, setInfo] = useState({
    host: "",
    port: "",
    userName: "",
    password: "",
    currDir: "htdocs",
  });

  return (
    <div>
      <h1>HI</h1>
      {page === "login" ? (
        <Login
          url={url}
          setPage={setPage}
          setCurrFiles={setCurrFiles}
          info={info}
          setInfo={setInfo}
        />
      ) : (
        <Home
          url={url}
          currFiles={currFiles}
          setCurrFiles={setCurrFiles}
          info={info}
          setInfo={setInfo}
        />
      )}
    </div>
  );
}
