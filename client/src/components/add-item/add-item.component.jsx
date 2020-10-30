import React, { useRef } from "react";
import { firebaseUpdate, handleUpload } from "../../utils/imageUpload.utils.js";
import CustomButton from "../custom-button/custom-button.component";
import getDocId from "../../utils/mapdocuments.utils.js";

import "./add-item.styles.scss";

const AddItemPic = ({ item, setUploading, setProgress }) => {
  const imageUploader = useRef(null);

  const updateFirebase = async (image, item) => {
    try {
      //retrieve correct collections document
      const documentID = getDocId(item.category);

      //upload new image
      handleUpload(
        item,
        image,
        documentID,
        firebaseUpdate,
        setProgress,
        setUploading
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Add carousel image button handler
  const handleButtonAndUpload = async (e, item) => {
    const image = e.target.files[0];
    updateFirebase(image, item);
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleButtonAndUpload(e, item)}
        ref={imageUploader}
        multiple={false}
        style={{ display: "none" }}
      />
      <CustomButton
        className="add-button"
        onClick={() => imageUploader.current.click()}
      >
        Add Pic
      </CustomButton>
    </div>
  );
};

export default AddItemPic;
