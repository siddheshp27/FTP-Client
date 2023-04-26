import React from "react";
import axios from "axios";

export default function Folder({ url, info, name, setCurrFiles, setInfo }) {
  function eventHandle(e) {
    console.log(name);
    const newPath = `${info.currDir}/${name}`;
    console.log(newPath);
    const data = { ...info, currDir: newPath };

    console.log(url, data);

    axios
      .post(`${url}/login`, JSON.stringify(data), {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((res) => {
        if (res.status) {
          console.log(res.data);
          return res.data;
        }
      })
      ?.then(({ files, folders }) => {
        setInfo(data);
        setCurrFiles({ files, folders });
      });
  }

  return (
    <div className="parentcontainer">
      <div className="container" onClick={eventHandle}>
        <div className="fileIcon">
          <svg viewBox="0 0 24 24" height="96px" width="96px" fill="#515457">
            <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path>
            <path d="M0 0h24v24H0z" fill="none"></path>
          </svg>
        </div>
        <div className="fileName">
          <h6 className="fileName">{name}</h6>
        </div>
      </div>
    </div>
  );
}
