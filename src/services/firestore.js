import {
  collection,
  doc,
  where,
  setDoc,
  getDocs,
  query,
  updateDoc,
} from "firebase/firestore";

import { db } from "src/boot/firebase.js";

const fs_getFoods = async () => {
  const res = [];
  const querySnapshot = await getDocs(collection(db, "foods"));
  querySnapshot.forEach((doc) => {
    res.push(doc.data());
  });
  return res;
};

const fs_getBodyWeight = async () => {
  const targetDate = "May 24th, 2024";
  const q = query(
    collection(db, "body_weight"),
    where("date", "==", targetDate)
  );
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return doc.data();
  } else {
    return null;
  }
};

const fs_getDays = async () => {
  const res = [];
  const querySnapshot = await getDocs(collection(db, "days"));
  querySnapshot.forEach((doc) => {
    res.push(doc.data());
  });
  return res;
};

const fs_setBodyWeight = async (bodyWeight, date) => {
  console.log(date);
  const datesRef = collection(db, "days");
  const q = query(datesRef, where("date", "==", date));
  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const docRef = querySnapshot.docs[0].ref;
    try {
      await updateDoc(docRef, { bodyWeight: bodyWeight });
      console.log("Body weight updated successfully");
    } catch (error) {
      console.error("Error updating body weight:", error);
    }
  } else {
    console.log("No such day in firestore");
  }
};

export { fs_getFoods, fs_getBodyWeight, fs_setBodyWeight, fs_getDays };
