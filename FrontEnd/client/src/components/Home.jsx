import React from "react";
import File from "./File";
import axios from "axios";
import Folder from "./Folder";

export default function Home({
  currFiles: { files, folders },
  setCurrFiles,
  info,
  setInfo,
  url,
}) {
  const folder = folders.map((name) => (
    <Folder
      name={name}
      info={info}
      setInfo={setInfo}
      url={url}
      setCurrFiles={setCurrFiles}
    />
  ));
  const file = files.map((name) => <File name={name} info={info} url={url} />);
  console.log(files, folders);

  function fileSubmitHandle(e) {
    e.preventDefault();
    const filePath = prompt("Enter Path of the File");
    console.log(e);
    const data = { ...info, filePath: filePath };
    console.log(data);
    axios
      .post(`${url}/upload`, JSON.stringify(data), {
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

  function eventHandle(e) {
    const newPath = info.currDir.substring(0, info.currDir.lastIndexOf("/"));
    console.log(newPath.length);
    if (newPath.length > 0) {
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
  }

  function createNewFolder(e) {
    const folderName = prompt("Enter Name of the Folder");
    console.log(String(folderName));
    const data = { ...info, folderName: folderName };
    axios
      .post(`${url}/makedirectory`, JSON.stringify(data), {
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

  function handleDelete() {
    const folderName = prompt(
      "Enter Name of the Folder/File that is to be deleted"
    );
    if (folderName) {
      console.log(String(folderName));

      folders.forEach((folder) => {
        if (folder == folderName) {
          console.log("yee");
          const data = { ...info, folderName: folderName };
          axios
            .post(`${url}/removedirectory`, JSON.stringify(data), {
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
      });
      files.forEach((file) => {
        if (file == folderName) {
          console.log("yeeyee");
          const data = { ...info, folderName: folderName };
          axios
            .post(`${url}/removefile`, JSON.stringify(data), {
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
      });
    }
  }

  console.log(info);
  return (
    <div>
      <h1>logged in</h1>
      <button onClick={createNewFolder}>New Folder</button>
      <button onClick={fileSubmitHandle}>Upload File</button>
      <button onClick={handleDelete}>Delete</button>
      <div className="directoryConatiner">
        <div className="parentcontainer">
          <div className="container" onClick={eventHandle}>
            <div className="fileIcon">
              <img src="prev.png" className="imgsize1" />
            </div>
            <div className="fileName">
              <h6 className="fileName">Prev</h6>
            </div>
          </div>
        </div>
        {folder}
        {file}
      </div>
    </div>
  );
}
