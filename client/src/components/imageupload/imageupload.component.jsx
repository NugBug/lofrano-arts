import React, { useState } from "react";
import { storage } from "../../firebase/firebase.utils.js";

import "./imageupload.styles.scss";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // firebase storage upload progress
        setProgress(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
      },
      (error) => {
        // firebase storage upload error
        console.log(error);
      },
      () => {
        // firebase storage upload complete
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            setUrl({ url });
          });
      }
    );
  };

  return (
    <div className="upload-form">
      <progress value={progress} max="100" />
      <br />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <br />
      <img
        className="uploaded-iamge"
        src={url.url || "https://via.placeholder.com/400x300"}
        alt="Uploaded images"
      />
    </div>
  );
};

export default ImageUpload;
