import React from "react";
import firebase from "firebase/app";
import { firestore } from "../../firebase/firebase.utils.js";
import CustomButton from "../custom-button/custom-button.component";
import getDocId from "../../utils/mapdocuments.utils.js";

import "./delete-item.styles.scss";

const DeleteItem = (item) => {
  const firebaseDelete = async (item) => {
    try {
      const documentID = getDocId(item.item.category);
      const docRef = await firestore.collection("collections").doc(documentID);
      console.log(docRef);
      docRef.update({
        items: firebase.firestore.FieldValue.arrayRemove({
          category: item.item.category,
          forSale: item.item.forSale,
          id: item.item.id,
          imageUrl: item.item.imageUrl,
          name: item.item.name,
          originalUrl: item.item.originalUrl,
          price: item.item.price,
          thumbUrl: item.item.thumbUrl,
        }),
      });

      //reload location to reflect update
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
