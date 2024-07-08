import React, { useState } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Upload } from "../components/Upload";
import { Analysis } from "../components/Analysis";
import "../styles/styles.css";

export const Home = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("http://localhost:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Arquivo carregado com sucesso");
        setFileUploaded(true);
        setUploadError(""); // Limpa erros anteriores
      })
      .catch((error) => {
        console.error("Erro ao carregar o arquivo:", error);
        if (error.response) {
          // O pedido foi feito e o servidor respondeu com um status code diferente de 2xx
          console.error("Resposta de erro do servidor:", error.response.data);
          console.error("Status do erro:", error.response.status);
          console.error("Cabeçalhos do erro:", error.response.headers);
        } else if (error.request) {
          // O pedido foi feito, mas não houve resposta
          console.error("Sem resposta do servidor:", error.request);
        } else {
          // Algo aconteceu ao configurar o pedido
          console.error("Erro na configuração do pedido:", error.message);
        }
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="mx-5 mt-5 justify-content" id="content-body">
        {!fileUploaded ? (
          <div>
            <Upload handleFileUpload={handleFileUpload} />
            {uploadError && (
              <div className="alert alert-danger mt-3" role="alert">
                {uploadError}
              </div>
            )}
          </div>
        ) : (
          <Analysis />
        )}
      </div>
      <Footer />
    </div>
  );
};
