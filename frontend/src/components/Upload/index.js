import { UploadFile } from "@mui/icons-material";

export const Upload = ({ handleFileUpload }) => {
  return (
    <>
      <div className="container border text-center mb-5">
        <div className="mb-3">
          <label htmlFor="uploadFile" className="form-label">
            <UploadFile /> Make Upload Bug Report File
          </label>
          <input
            onChange={(e) => handleFileUpload(e.target.files[0])}
            className="form-control"
            type="file"
            id="uploadFile"
          ></input>
        </div>
      </div>
    </>
  );
};
