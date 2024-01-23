"use client";
import Image from "next/image";
import React, { useContext } from "react";
import UserTag from "../UserTag";
import { useRouter } from "next/navigation";
import { StoreContext } from "../../Provider";

function PinItem({ pin }) {
  const [state, setState] = useContext(StoreContext);
  const router = useRouter();
  // console.log("my Pin", pin);
  const user = {
    name: pin?.userName,
    image: pin?.userImage,
  };
  return (
    <div>
      <div
        class="relative 
       before:absolute
       before:h-full before:w-full
       before:rounded-3xl
       before:z-10
       hover:before:bg-gray-600 
       before:opacity-50
       cursor-pointer
       "
        onClick={() => {
          setState({ ...state, pin: pin });
          router.push("/pin/" + pin.id, {
            pathname: "/pin/" + pin.id,
            query: { data: pin },
          });
        }}
      >
        <Image
          src={pin.image}
          alt={pin.title}
          width={500}
          height={500}
          className="rounded-3xl 
        cursor-pointer relative z-0"
        />
      </div>
      <h2
        className="font-bold 
        text-[18px] mb-1 mt-2 line-clamp-2"
      >
        {pin.title}
      </h2>
      <UserTag user={user} />
    </div>
  );
}

export default PinItem;
