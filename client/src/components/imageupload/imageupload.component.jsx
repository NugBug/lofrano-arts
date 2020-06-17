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
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, updateFormData] = useState({
    forSale: forSale,
    id: null,
    imageUrl: "",
    name: "",
    price: null,
    category: null,
  });

  // firebase data upload
  const firebaseUpload = async (data, displayImage, thumbImage, document) => {
    try {
      const docRef = await firestore.collection("collections").doc(document);
      await docRef.update({
        items: firebase.firestore.FieldValue.arrayUnion({
          ...data,
          imageUrl: displayImage,
          thumbUrl: thumbImage,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  // firebase storage upload
  const firestoreUpload = async (reference) => {
    try {
      await reference.on(
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
          reference.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log(downloadURL);
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Compress image and gather data for firebase storage and database upload
  const handleUpload = async (data, image, document, databaseUpload) => {
    setProgress(1);

    const imageOptions = {
      maxSizeMB: 3.0,
      useWebWorker: true,
    };

    const thumbnailOptions = {
      maxSizeMB: 1.0,
      maxWidthOrHeight: 450,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(image, imageOptions);
    const compressThumbnail = await imageCompression(image, thumbnailOptions);

    const uploadTask1 = storage
      .ref(`/images/${data.name}_display`)
      .put(compressedFile);
    const uploadTask2 = storage
      .ref(`/images/${data.name}_thumb`)
      .put(compressThumbnail);

    Promise.all([uploadTask1, uploadTask2])
      .then(async (tasks) => {
        let imageUrl = await storage
          .ref(`images/${data.name}_display`)
          .getDownloadURL()
          .then((url) => url);

        let thumbUrl = await storage
          .ref(`images/${data.name}_thumb`)
          .getDownloadURL()
          .then((url) => url);

        return { imageUrl, thumbUrl };
      })
      .then(({ imageUrl, thumbUrl }) => {
        databaseUpload(data, imageUrl, thumbUrl, document);
        setUploading(false);
      });

    firestoreUpload(uploadTask1);
    firestoreUpload(uploadTask2);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setUploading(true);

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

    // Form validation
    if (!image) {
      alert("Select image before upload");
    } else if (!data.name || !data.category) {
      alert("Fill out form data");
    } else {
      handleUpload(data, image, documentID, firebaseUpload);
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
    <div className="upload-form">
      {uploading ? (
        <div>
          Upload Progress:&nbsp;&nbsp;&nbsp;
          <progress value={progress} max="100" />
        </div>
      ) : (
        <div>
          <input
            id="image-upload"
            className="file-upload"
            type="file"
            name="image"
            onChange={(e) => {
              if (e.target.value.length > 0) {
                handleChange(e);
              } else {
                setFile(null);
                setImage(null);
              }
            }}
          />
          <br />
          <br />
          <form className="form" id="submission-form">
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
                <label className="radio-sale" htmlFor="isForSale">
                  Yes
                </label>
                <input
                  type="radio"
                  name="forSale"
                  id="isForSale"
                  onChange={() => setForSale(true)}
                  value={forSale}
                />
                <label className="radio-sale" htmlFor="isForSale">
                  No
                </label>
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
