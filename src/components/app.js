import React, { useState, useRef } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import Dropzone from "react-dropzone";
import axios from "axios";
import Header from "./header";
import { API_URL } from "../utils/constants";

const App = (props) => {
  const [file, setFile] = useState(null); //state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); //state for storing preview image
  const [state, setState] = useState({
    title: "",
    description: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [isPreviewAvilable, setIsPreviewAvilable] = useState(false);
  const dropRef = useRef(); //for managing hover area

  const handleInputChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const onDrop = (files) => {
    const [uploadFile] = files;
    setFile(uploadFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadFile);
    setIsPreviewAvilable(uploadFile.name.match(/\.(jpeg|jpg|png)$/));

    dropRef.current.style.border = "2px dashed #e9ebeb";
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const { title, description } = state;
      if (title.trim() !== "" && description.trim() !== "") {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("title", title);
          formData.append("description", description);

          setErrorMsg("");
          await axios.post(
            `${API_URL}/upload/${localStorage.getItem("user")}`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "multipart/form-data",
              },
            },
          );
          props.history.push("/list");
        } else {
          setErrorMsg("Please select file to add");
        }
      } else {
        setErrorMsg("Please enter all the field value");
      }
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };

  return (
    <div className="container">
      <Header />
      <React.Fragment>
        <Form className="search-form" onSubmit={handleOnSubmit}>
          {errorMsg && <p className="errorMsg">{errorMsg}</p>}
          <Row>
            <Col>
              <Form.Group controlId="title">
                <Form.Control
                  type="text"
                  name="title"
                  value={state.title || ""}
                  placeholder="Enter Title"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="description">
                <Form.Control
                  type="text"
                  name="description"
                  value={state.description || ""}
                  placeholder="Enter description"
                  onChange={handleInputChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="upload-section">
            <Dropzone
              onDrop={onDrop}
              onDragEnter={() => {
                updateBorder("over");
              }}
              onDragLeave={() => {
                updateBorder("leave");
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps({ className: "drop-zone" })}
                  ref={dropRef}
                >
                  <input {...getInputProps()} />
                  <p>Drag and drop a file OR click here to select a file</p>
                  {file && (
                    <div>
                      <strong>Selected file:</strong> {file.name}
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
            {previewSrc ? (
              isPreviewAvilable ? (
                <div className="image-preview">
                  <img
                    className="preview-image"
                    src={previewSrc}
                    alt="Preview"
                  />
                </div>
              ) : (
                <div className="preview-message">
                  <p>No Preview Avilable</p>
                </div>
              )
            ) : (
              <div className="preview-message">
                <p>Image preview will be shown here after selection </p>
              </div>
            )}
          </div>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </React.Fragment>
    </div>
  );
};

export default App;
