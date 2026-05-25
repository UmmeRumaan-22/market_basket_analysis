import { useState } from "react";

import API from "../api/axios";

import MainLayout from "../layouts/MainLayout";

function UploadDataset() {
  const [file, setFile] = useState(null);

  const uploadFile = async () => {
    const formData = new FormData();

    formData.append("file", file);

    try {
      await API.post(
        "/upload/dataset",
        formData
      );

      alert("Dataset Uploaded");
    } catch (error) {
      alert("Upload Failed");
    }
  };

  return (
    <MainLayout>
      <div className="page-container">
        <h2>Upload Dataset</h2>

        <input
          type="file"
          className="form-control"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
        />

        <button
          className="btn btn-primary mt-3"
          onClick={uploadFile}
        >
          Upload
        </button>
      </div>
    </MainLayout>
  );
}

export default UploadDataset;