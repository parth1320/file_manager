import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import fileDownload from "js-file-download";
import axios from "axios";
import { API_URL } from "../utils/constants";
import Header from "./header";
import { Button } from "@mui/material";

const FilesList = () => {
  const [filesList, setFilesList] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/getAllFiles`);
        setErrMsg("");
        setFilesList(data);
      } catch (error) {
        error.response && setErrMsg(error.response.data);
      }
    };
    getFilesList();
  }, []);

  // const downloadFile = async (id, title) => {
  //   try {
  //     await axios
  //       .get(`${API_URL}/download/${id}`, {
  //         responseType: "blob",
  //       })
  //       .then((res) => {
  //         fileDownload(res.data, title);
  //       });
  //     setErrMsg("");
  //   } catch (error) {
  //     if (error.response && error.response.data === 400) {
  //       setErrMsg("Error while downloading file. Try again later");
  //     }
  //   }
  // };

  const sendRequest = (e, file) => {
    console.log({ user: localStorage.getItem("user"), file: file });
    axios
      .post(
        `${API_URL}/request`,
        { user: localStorage.getItem("user"), file: file },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      )
      .then((res) => {
        console.log(res.data);
        alert("your request has been sent, wait for the admin response");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <Header />
      <div className="files-container">
        {errMsg && <p className="errorMsg">{errMsg}</p>}
        <table className="files-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>createdAt</th>
              {/* <th>Download file</th> */}
              <th>Request File</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {filesList.length > 0 ? (
              filesList.map(
                ({
                  _id,
                  title,
                  description,
                  avatar,
                  file_mimetype,
                  allow_user,
                  createdAt,
                }) => (
                  <tr key={_id}>
                    <td className="file-title">{title}</td>
                    <td className="file-description">{description}</td>
                    <td>{format(new Date(createdAt), "dd/MM/yyyy")}</td>
                    {/* <td>
                      {" "}
                      <Button onClick={() => downloadFile(_id, title)}>
                        Download
                      </Button>
                    </td> */}
                    <td>
                      <p>
                        {" "}
                        {
                          <Button
                            disabled={
                              allow_user.includes(localStorage.getItem("user"))
                                ? true
                                : false
                            }
                            onClick={(e) => sendRequest(e, _id)}
                            color="success"
                          >
                            send request
                          </Button>
                        }
                      </p>
                    </td>
                    <td>
                      <p>
                        {" "}
                        {allow_user.includes(localStorage.getItem("user")) ? (
                          <Button>
                            <a
                              href={`data:${file_mimetype};base64,${avatar}`}
                              disabled={
                                allow_user.includes(
                                  localStorage.getItem("user"),
                                )
                                  ? false
                                  : true
                              }
                              target="_blank"
                              download
                            >
                              Download
                            </a>
                          </Button>
                        ) : (
                          <Button disabled>Download</Button>
                        )}
                      </p>
                    </td>
                  </tr>
                ),
              )
            ) : (
              <tr>
                <td colSpan={3} style={{ fontWeight: "300" }}>
                  No files found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FilesList;
