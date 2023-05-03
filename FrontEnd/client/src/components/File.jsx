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

  function copyToClipboard(text) {
    // create a temporary input element
    var tempInput = document.createElement("input");
    // set the input element's value to the text to be copied
    tempInput.value = text;
    // add the input element to the DOM
    document.body.appendChild(tempInput);
    // select the text in the input element
    tempInput.select();
    // copy the selected text to the clipboard
    document.execCommand("copy");
    // remove the input element from the DOM
    document.body.removeChild(tempInput);
  }

  function handleName(e) {
    console.log(name);
    copyToClipboard(name);
  }

  return (
    <div className="parentcontainer relative">
      <div className="container" onClick={eventHandle}>
        <div className="fileIcon">
          <img src="/file.png" className="imgsize" />
        </div>
        <div className="fileName" onClick={handleName}>
          <h6 className="fileName">{name}</h6>
        </div>
      </div>
      <button
        className="text-white items-end absolute bottom-0 right-0 bg-indigo-500 border-0 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm mt-1"
        onClick={handleName}
      >
        <img src="/logo.png" className="w-6"></img>
      </button>
    </div>
  );
}
