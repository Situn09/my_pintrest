"use client";
import React, { useContext, useEffect, useState } from "react";
import PinImage from "./../../components/PinDetail/PinImage";
import PinInfo from "./../../components/PinDetail/PinInfo";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import app from "./../../Shared/firebaseConfig";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { StoreContext } from "../../Provider";

function PinDetail({ params }) {
  const [state, setState] = useContext(StoreContext);
  // const { data: session } = useSession();
  const router = useRouter();
  // const receivedData = router.query?.data;

  // const db = getFirestore(app);
  // const [pinDetail, setPinDetail] = useState([]);
  // useEffect(() => {
  //   getPinDetail();
  // }, []);
  // const getPinDetail = async () => {
  //   if (session) {
  //     const docRef = doc(db, "pinterest-post", params.pinId);
  //     const docSnap = await getDoc(docRef);
  //     if (docSnap.exists()) {
  //       setPinDetail(docSnap.data());
  //     } else {
  //       console.log("No such document!");
  //     }
  //   } else {
  //     setPinDetail(state.pin);
  //   }
  // };
  return (
    <>
      {state.pin ? (
        <div className=" bg-white p-3 md:p-12 rounded-2xl md:px-24 lg:px-36">
          <HiArrowSmallLeft
            className="text-[60px] font-bold  
       cursor-pointer hover:bg-gray-200 rounded-full pl-2  lg:ml-[-50px] xl:ml-[-50px] 2xl:ml-[-50px] "
            onClick={() => router.back()}
          />
          <div
            className="grid grid-cols-1 lg:grid-cols-2 md:gap-10 shadow-lg
      rounded-2xl p-3 md:p-7 lg:p-12 xl:pd-16 "
          >
            <PinImage pinDetail={state.pin} />
            <div>
              <PinInfo pinDetail={state.pin} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default PinDetail;
