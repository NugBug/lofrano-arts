import { storage, firestore } from "../firebase/firebase.utils.js";
import imageCompression from "browser-image-compression";
import firebase from "firebase/app";

// udpate firebase with carousel image
export const firebaseUpdate = async (
  item,
  displayImage,
  thumbImage,
  originalImage,
  document
) => {
  const docRef = await firestore.collection("collections").doc(document);
  let artItem = {};

  //delete object from array
  if (item.carousel && item.carousel.length > 0) {
    docRef.update({
      items: firebase.firestore.FieldValue.arrayRemove({
        carousel: item.carousel,
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

    artItem = {
      ...item,
      carousel: [...item.carousel, { displayImage, thumbImage }],
    };
  } else {
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

    artItem = {
      ...item,
      carousel: [{ displayImage, thumbImage }],
    };
  }

  //update object
  await docRef.update({
    items: firebase.firestore.FieldValue.arrayUnion({
      ...artItem,
    }),
  });

  //refresh page location to reflect db update
  window.location.reload();
};

// firebase new image data upload
export const firebaseUpload = async (
  data,
  displayImage,
  thumbImage,
  originalUrl,
  document
) => {
  try {
    const docRef = await firestore.collection("collections").doc(document);
    await docRef.update({
      items: firebase.firestore.FieldValue.arrayUnion({
        ...data,
        imageUrl: displayImage,
        thumbUrl: thumbImage,
        originalUrl: originalUrl,
      }),
    });
  } catch (error) {
    console.log(error);
  }
};

// firebase storage new image upload
export const firestoreUpload = async (reference, setProgress) => {
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
export const handleUpload = async (
  data,
  image,
  document,
  databaseUpload,
  setProgress,
  setUploading
) => {
  try {
    setProgress(1);
    setUploading(true);

    // Image compression config
    const imageOptions = {
      maxSizeMB: 4.0,
      useWebWorker: true,
      mamaxWidthOrHeight: 4080,
    };

    const thumbnailOptions = {
      maxSizeMB: 1.0,
      maxWidthOrHeight: 450,
      useWebWorker: true,
    };

    // Compress image and return thumbnail and detailed image for display
    const compressedFile = await imageCompression(image, imageOptions);
    const compressThumbnail = await imageCompression(image, thumbnailOptions);

    // Create firestore liseners for all image upload tasks
    const currentTime = Date.now();
    const uploadTask1 = storage
      .ref(`/images/${data.name}_${currentTime}_display`)
      .put(compressedFile);
    const uploadTask2 = storage
      .ref(`/images/${data.name}_${currentTime}_thumb`)
      .put(compressThumbnail);
    const uploadTask3 = storage
      .ref(`/images/${data.name}_${currentTime}_original`)
      .put(image);

    // Wait for tasks to finish, retrieve new image URLs and submit data for firestore upload
    Promise.all([uploadTask1, uploadTask2, uploadTask3])
      .then(async (tasks) => {
        let imageUrl = await storage
          .ref(`/images/${data.name}_${currentTime}_display`)
          .getDownloadURL()
          .then((url) => url);

        let thumbUrl = await storage
          .ref(`/images/${data.name}_${currentTime}_thumb`)
          .getDownloadURL()
          .then((url) => url);

        let originalUrl = await storage
          .ref(`/images/${data.name}_${currentTime}_original`)
          .getDownloadURL()
          .then((url) => url);

        return { imageUrl, thumbUrl, originalUrl };
      })
      .then(({ imageUrl, thumbUrl, originalUrl }) => {
        databaseUpload(data, imageUrl, thumbUrl, originalUrl, document);
        setUploading(false);
      });

    // Upload images to firestore
    firestoreUpload(uploadTask1, setProgress);
    firestoreUpload(uploadTask2, setProgress);
  } catch (error) {
    console.log(error);
  }
};
