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

  // This code will add new digital art collection data upon application mount, use in useEffect
  // Be sure to map state 'collectionsArray: selectCollectionsForPreview' to props and pass as prop
  // Import 'addCollectionAndDocuments from firebase.utils.js
  // Imprt selectCollectionsForPreview from gallery redux gallery.selector.js
  //
  // addCollecitonAndDocuments(
  //   "collections",
  //   collectionsArray.map(({ title, items }) => ({ title, items }))
  // );
  // });

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
