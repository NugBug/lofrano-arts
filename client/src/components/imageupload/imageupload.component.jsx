import React, { useState } from "react";
import { storage, firestore } from "../../firebase/firebase.utils.js";
import imageCompression from "browser-image-compression";
import firebase from "firebase/app";

import { getDocId } from "./mapdocuments.utils.js";

import "./imageupload.styles.scss";

const ImageUpload = () => {
  const [forSale, setForSale] = useState(false);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [formData, updateFormData] = useState({
    forSale: forSale,
    id: null,
    imageUrl: "",
    name: "",
    price: null,
    category: null,
  });

  // Upload image and data to firebase storage and database
  const handleUpload = async (data, image, document) => {
    const options = {
      maxSizeMB: 1.5,
      useWebWorker: true,
    };

    try {
      setProgress(1);
      const compressedFile = await imageCompression(image, options);
      await storage
        .ref(`images/${compressedFile.name}`)
        .put(compressedFile)
        .on(
          "state_changed",
          (snapshot) => {
            // firebase storage upload progress
            setProgress(
              Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100 + 1
              )
            );
          },
          (error) => {
            // firebase storage upload error
            console.log(error);
          },
          () => {
            // firebase storage upload complete and start database write
            storage
              .ref("images")
              .child(compressedFile.name)
              .getDownloadURL()
              .then((url) => {
                const docRef = firestore
                  .collection("collections")
                  .doc(document);
                docRef.update({
                  items: firebase.firestore.FieldValue.arrayUnion({
                    ...data,
                    imageUrl: url,
                  }),
                });
              });
          }
        );
    } catch (error) {
      console.log(error);
    }
  };

  // Handle form change events
  const handleChange = (e) => {
    // Grab form data
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    //grab file for upload
    if (e.target.files) {
      setImage(e.target.files[0]);
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Hash function to generate unique art item id
    const hashId = (artName) =>
      Math.abs(
        artName.split("").reduce((a, b) => {
          a = (a << 5) - a + b.charCodeAt(0);
          return a & a;
        }, 0)
      );

    // Map category name to database id
    const categoryName = formData.category;
    const documentID = getDocId(categoryName);

    setFile(null);

    // Restructure form data for Firestore upload
    const { name, price, imageUrl, category } = formData;
    const data = {
      name,
      forSale: forSale,
      id: hashId(formData.name),
      imageUrl,
      price,
      category,
    };

    // Call firebase data and image upload handler
    if (!image) {
      alert("Select image before upload");
    } else if (!data.name || !data.category) {
      alert("Fill out form data");
    } else {
      handleUpload(data, image, documentID);
    }
  };

  // Handle form reset
  const resetForm = () => {
    document.getElementById("submission-form").reset();
    document.getElementById("image-upload").value = "";
    const dropdowns = Array.from(document.getElementsByTagName("select"));
    dropdowns.forEach((dropdown) => (dropdown.selectedIndex = 0));
    setProgress(0);
    setFile(null);
  };

  return (
    <div>
      {progress < 100 && progress > 0 ? (
        <div className="upload-form">
          Upload Progress:&nbsp;&nbsp;&nbsp;
          <progress value={progress} max="100" />
        </div>
      ) : (
        <div className="upload-form">
          <input
            id="image-upload"
            className="file-upload"
            type="file"
            name="image"
            onChange={handleChange}
          />
          <br />
          <form className="form" id="submission-form">
            <br />
            <br />
            <ul className="form-outer">
              <li>
                <label className="image-title" htmlFor="name">
                  Name:
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter art piece name"
                  required
                  onChange={handleChange}
                />
              </li>
              <br />
              <div id="radio-forSale">
                <label className="for-sale" htmlFor="forSale">
                  For Sale:
                </label>
                <label htmlFor="isForSale">YES</label>
                <input
                  type="radio"
                  name="forSale"
                  id="isForSale"
                  onChange={() => setForSale(true)}
                  value={forSale}
                />
                <label htmlFor="isForSale">No</label>
                <input
                  type="radio"
                  name="forSale"
                  id="notForSale"
                  defaultChecked="true"
                  onChange={() => setForSale(false)}
                  value={forSale}
                />
              </div>
              <br />
              <li>
                <label className="category" htmlFor="category">
                  Category:
                </label>
                <select
                  id="dropdown"
                  name="category"
                  className="category-dropdown"
                  onChange={handleChange}
                >
                  <option defaultValue>Select Category</option>
                  <option value="Sculptures">Sculptures</option>
                  <option value="Sketches">Sketches</option>
                  <option value="Paintings">Paintings</option>
                  <option value="Photography">Photography</option>
                  <option value="Prints">Prints</option>
                </select>
              </li>
              <br />
              <li>
                <label className="price" htmlFor="price">
                  Price:
                </label>
                <input
                  id="price"
                  type="number"
                  min="1"
                  max="5000"
                  name="price"
                  placeholder="Price (leave field empty if not for sale)"
                  onChange={handleChange}
                />
              </li>
              <br />
            </ul>
            <div className="form-buttons">
              <button onClick={resetForm}>Reset Form</button>
              <button onClick={handleSubmit}>Submit</button>
            </div>
          </form>
          <br />
          <img
            className="uploaded-image"
            src={file || "https://via.placeholder.com/400x300"}
            alt="Uploaded images"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
