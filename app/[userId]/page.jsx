"use client";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import app from "../Shared/firebaseConfig";
import UserInfo from "./../components/UserInfo";
import PinList from "./../components/Pins/PinList";
import SharButton from "../components/Utils/ShareButton";

function profile({ params }) {
  const db = getFirestore(app);

  const [userInfo, setUserInfo] = useState();
  const [listOfPins, setListOfPins] = useState([]);

  useEffect(() => {
    // console.log("params", params.userId.replace("%40", "@"));
    if (params) {
      getUserInfo(params.userId.replace("%40", "@"));
    }
  }, [params]);

  const getUserInfo = async (email) => {
    const docRef = doc(db, "user", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //   console.log("Document data:", docSnap.data());
      setUserInfo(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      //   console.log("No such document!");
    }
  };

  useEffect(() => {
    if (userInfo) {
      getUserPins();
    }
  }, [userInfo]);

  const getUserPins = async () => {
    const q = query(
      collection(db, "pinterest-post"),
      where("email", "==", userInfo.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //doc.data() is never undefined for query doc snapshots
      setListOfPins((listOfPins) => [...listOfPins, doc.data()]);
    });
  };
  console.log(listOfPins);

  return (
    <div>
      {userInfo ? (
        <div>
          <UserInfo userInfo={userInfo} />
          <PinList listOfPins={listOfPins} />
        </div>
      ) : null}
    </div>
  );
}

export default profile;
