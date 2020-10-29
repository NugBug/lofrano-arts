import React from "react";
import firebase from "firebase/app";
import { firestore } from "../../firebase/firebase.utils.js";
import { firebaseUpload, handleUpload } from "../../utils/imageUpload.utils.js";
import CustomButton from "../custom-button/custom-button.component";
import getDocId from "../../utils/mapdocuments.utils.js";

import "./add-item.styles.scss";

const AddItemPic = ({ item, collection }) => {
  const firebaseAdd = async (item) => {
    try {
      //retrieve correct collections document
      const documentID = getDocId(item.category);
      const docRef = await firestore.collection("collections").doc(documentID);
      const artItem = { ...item, carousel: [] };

      //delete object from array
      docRef.update({
        items: firebase.firestore.FieldValue.arrayRemove({
          category: item.category,
          forSale: item.forSale,
          id: item.id,
          imageUrl: item.imageUrl,
          name: item.name,
          originalUrl: item.originalUrl,
          price: item.price,
          thumbUrl: item.thumbUrl,
        }),
      });

      //update object
      docRef.update({
        items: firebase.firestore.FieldValue.arrayUnion({
          ...artItem,
        }),
      });

      //upload new image

      //refresh page location to reflect db update
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const test = () => {
    console.log("click");
  };

  return (
    <div>
      <input type="file" accept="image/*" multiple="false" />
      <CustomButton
        className="add-button"
        onClick={() => {
          test();
        }}
      >
        Add Pic
      </CustomButton>
    </div>
  );
};

export default AddItemPic;
