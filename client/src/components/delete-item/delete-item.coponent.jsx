import React from "react";
import firebase from "firebase/app";
import { firestore } from "../../firebase/firebase.utils.js";
import CustomButton from "../custom-button/custom-button.component";
import getDocId from "../../utils/mapdocuments.utils.js";

import "./delete-item.styles.scss";

const DeleteItem = ({ item }) => {
  const firebaseDelete = async (item) => {
    try {
      //retrieve correct collections document
      const documentID = getDocId(item.category);
      const docRef = await firestore.collection("collections").doc(documentID);

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

      //refresh page location to reflect db update
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <CustomButton
        className="delete-button"
        onClick={() => {
          firebaseDelete(item);
        }}
      >
        Delete
      </CustomButton>
    </div>
  );
};

export default DeleteItem;
