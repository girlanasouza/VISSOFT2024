import { Analysis } from "../components/Analysis";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Upload } from "../components/Upload";
import "../styles/styles.css"; // Certifique-se de que o caminho esteja correto

export const Home = () => {
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("File uploaded successfully");
        setFileUploaded(true);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="mx-5 mt-5 justify-content" id="content-body">
        {!fileUploaded ? (
          <div>
            <Upload handleFileUpload={handleFileUpload} />
          </div>
        ) : (
          <Analysis />
        )}
      </div>

      <Footer />
    </div>
  );

};
