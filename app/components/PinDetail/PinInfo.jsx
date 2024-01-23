"use client";
import React, { useContext, useState } from "react";
import UserTag from "../UserTag";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import app from "../../Shared/firebaseConfig";
import { useSession } from "next-auth/react";
import { StoreContext } from "../../Provider";

function PinInfo({ pinDetail }) {
  const { data: session } = useSession();
  const [state, setState] = useContext(StoreContext);
  const postId = Date.now().toString();
  console.log("State check", state);
  const storage = getStorage(app);
  const db = getFirestore(app);
  const user = {
    name: pinDetail.userName,
    email: pinDetail.email,
    image: pinDetail.userImage,
  };

  const onClickToBookmark = () => {
    // console.log("title ",title,"desc",desc,"Link",link)
    addToBookmark();
  };

  const addToBookmark = () => {
    const storageRef = ref(storage, "pinterest/" + state.pin.userName);
    uploadBytes(storageRef, state.pin.image)
      .then((snapshot) => {
        console.log("File Uploaded");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (url) => {
          console.log("DownloadUrl", url);
          const postData = {
            title: state.pin.title,
            desc: state.pin.desc,
            link: state.pin.link,
            image: state.pin.image,
            userName: session.user.name,
            email: session.user.email,
            userImage: session.user.image,
            id: postId,
          };

          await setDoc(doc(db, "pinterest-bookmark", postId), postData).then(
            (resp) => {
              alert("Photo is add to your ⭐ Favorites Flicks");
              console.log("Saved");
              // router.push("/" + session.user.email);
            }
          );
        });
      });
  };

  return (
    <div>
      <h2 className="text-[30px] font-bold mb-10">{pinDetail.title}</h2>
      <UserTag user={user} />
      <h2 className="mt-10">{pinDetail.desc}</h2>
      <button
        className="p-2 bg-[#e9e9e9] px-5 text-[23px]
      mt-10 rounded-full hover:scale-105 transition-all"
        onClick={() => window.open(pinDetail.link)}
      >
        Open Url
      </button>
      {session?.user.email ? (
        <button
          className="p-2 bg-[#e9e9e9] px-5 text-[23px]
      mt-10 rounded-full hover:scale-105 transition-all"
          onClick={() => onClickToBookmark()}
        >
          Add to ⭐ Bookmark
        </button>
      ) : null}
    </div>
  );
}

export default PinInfo;
