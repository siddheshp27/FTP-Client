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
    // <div className="login">
    //   <form onSubmit={handleSubmit} className="mx-10">
    //     <label htmlFor="username" className="text-2xl font-bold ">
    //       Username
    //     </label>
    //     <input
    //       id="username"
    //       name="username"
    //       type="text"
    //       className=" border-double border-4 border--500 "
    //     />
    //     <label htmlFor="password">Password</label>
    //     <input id="password" name="password" type="password" />
    //     <label htmlFor="ftpHostname">FTP Hostname</label>
    //     <input id="ftpHostname" name="ftpHostname" type="text" />
    //     <label htmlFor="ftpPort">FTP Port</label>
    //     <input id="ftpPort" name="ftpPort" type="number" />
    //     <button>Submit</button>
    //   </form>
    // </div>
    <>
      <section class="text-gray-600 body-font items-center -my-8">
        <div class="px-5 py-24 mx-auto flex items-center justify-center">
          {/* <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 class="title-font font-medium text-3xl text-gray-900">
              Slow-carb next level shoindcgoitch ethical authentic, poko
              scenester
            </h1>
            <p class="leading-relaxed mt-4">
              Poke slow-carb mixtape knausgaard, typewriter street art gentrify
              hammock starladder roathse. Craies vegan tousled etsy austin.
            </p>
          </div> */}
          <div class="lg:w-full md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col items-center justify-center md:ml-auto w-full mt-4 md:mt-0">
            <h2 class="text-gray-900 text-2xl font-bold title-font">Login</h2>
            <div class="relative mt-4">
              <form onSubmit={handleSubmit} className="">
                <label for="full-name" class="leading-7 text-sm text-gray-600">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />

                <div class="relative mb-4">
                  <label for="email" class="leading-7 text-sm text-gray-600">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <label for="full-name" class="leading-7 text-sm text-gray-600">
                  FTP Hostname
                </label>
                <input
                  id="ftpHostname"
                  name="ftpHostname"
                  type="text"
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                ></input>
                <label for="full-name" class="leading-7 text-sm text-gray-600">
                  FTP Port
                </label>
                <input
                  id="ftpPort"
                  name="ftpPort"
                  type="number"
                  class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                ></input>
                <button class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg mt-8">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
