import React from "react";
import axios from "axios";
export default function File({ url, name, info }) {
  function eventHandle(e) {
    console.log(name);
    const data = { ...info, fileName: name };
    console.log(url, data);

    axios
      .post(`${url}/download`, JSON.stringify(data), {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then((res) => {
        if (res.status) {
          console.log(res.data.downloadStatus);
          if (res.data.downloadStatus == true) {
            console.log("hi");
            alert("File has been Successfully Downloaded");
          }
          return res.data;
        }
      });
  }

  function handleName() {
    console.log("uuu");
  }

  return (
    <div className="container" onClick={eventHandle}>
      <div className="fileIcon">
        <img src="/file.png" className="imgsize" />
      </div>
      <div className="fileName" onClick={handleName}>
        <h6 className="fileName">{name}</h6>
      </div>
    </div>
  );
}
