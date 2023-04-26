import React, { useState } from "react";
import axios from "axios";

export default function Login({ url, setPage, setCurrFiles, info, setInfo }) {
  // const [formData, setFormData] = useState({ username: "", password: "" });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(
      e.target.username.value,
      e.target.password.value,
      e.target.ftpHostname.value,
      e.target.ftpPort.value
    );

    setInfo((info) => {
      const temp = {
        ...info,
        host: e.target.ftpHostname.value,
        port: e.target.ftpPort.value,
        userName: e.target.username.value,
        password: e.target.password.value,
      };
      return temp;
    });

    const data = {
      ...info,
      host: e.target.ftpHostname.value,
      port: e.target.ftpPort.value,
      userName: e.target.username.value,
      password: e.target.password.value,
    };
    console.log(data, info);

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
        setCurrFiles({ files, folders });
        setPage("Home");
      });
  }

  function handleFormChange(e) {
    console.log(e.target.value);
  }

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input id="username" name="username" type="text" />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" />
        <label htmlFor="ftpHostname">FTP Hostname</label>
        <input id="ftpHostname" name="ftpHostname" type="text" />
        <label htmlFor="ftpPort">FTP Port</label>
        <input id="ftpPort" name="ftpPort" type="number" />
        <button>Submit</button>
      </form>
    </div>
  );
}
