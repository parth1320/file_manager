import React, { useState } from "react";
import { Button, Table } from "@mui/material";
import axios from "axios";
import { API_URL } from "../utils/constants";

const Admin_Table = () => {
  const [tabledata, settabledata] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`${API_URL}/request/all`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        settabledata(response.data);
        console.log(response.data);
      });
  }, []);

  const setRequestApproved = (e, id) => {
    axios
      .get(`${API_URL}/request/approved/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        alert("File Download Approved");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const setRequestRejected = (e, id) => {
    axios
      .get(`${API_URL}/request/rejected/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        alert("File Download Rejected");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteRequest = (e, id) => {
    axios
      .delete(`${API_URL}/request/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        alert("Request Deleted Successfully");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div>
        <body className="antialiased font-sans bg-gray-200">
          <div className="files-container">
            <div className="py-8">
              <div>
                <h2 className="text-2xl text-center font-semibold leading-tight">
                  Admin File Data List
                </h2>
              </div>
              <div>
                <div style={{ overflow: "auto", maxHeight: "600px" }}>
                  <table className="files-table">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          {" "}
                          id
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          {" "}
                          file name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Username
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          {" "}
                          requested date
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          {" "}
                          Report Message
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          {" "}
                          Approve
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          {" "}
                          Block
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          {" "}
                          Delete
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tabledata.map((request, index) => (
                        <tr>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                              <div className="ml-3">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {" "}
                                  {index + 1}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {request.file_name}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {request.user_name}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {new Date(
                                request.createdAt,
                              ).toLocaleDateString() +
                                " " +
                                new Date(
                                  request.createdAt,
                                ).toLocaleTimeString()}
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap"></p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {" "}
                              {
                                <Button
                                  variant="contained"
                                  onClick={(e) =>
                                    setRequestApproved(e, request._id)
                                  }
                                  color="success"
                                  disabled={
                                    request.is_approved || request.is_rejected
                                      ? true
                                      : false
                                  }
                                >
                                  Approve
                                </Button>
                              }
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {" "}
                              {
                                <Button
                                  variant="contained"
                                  onClick={(e) =>
                                    setRequestRejected(e, request._id)
                                  }
                                  color="error"
                                  disabled={
                                    request.is_approved || request.is_rejected
                                      ? true
                                      : false
                                  }
                                >
                                  Block
                                </Button>
                              }
                            </p>
                          </td>
                          <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {" "}
                              {
                                <Button
                                  variant="contained"
                                  onClick={(e) => deleteRequest(e, request._id)}
                                  color="error"
                                >
                                  Delete
                                </Button>
                              }
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>
    </>
  );
};
export default Admin_Table;
