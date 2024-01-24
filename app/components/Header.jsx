"use client";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { HiBell, HiChat, HiSearch } from "react-icons/hi";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import app from "./../Shared/firebaseConfig";
import { useRouter } from "next/navigation";
import { StoreContext } from "../Provider";

function Header() {
  const { data: session } = useSession();
  // console.log(session)
  const router = useRouter();
  const [state, setState] = useContext(StoreContext);

  const db = getFirestore(app);

  useEffect(() => {
    saveUserInfo();
  }, [session]);

  const saveUserInfo = async () => {
    if (session?.user) {
      await setDoc(doc(db, "user", session.user.email), {
        userName: session.user.name,
        email: session.user.email,
        userImage: session.user.image,
      });
    }
  };

  const onSearch = (text) => {
    router.push("/");
  };

  const onCreateClick = () => {
    if (session) {
      router.push("/pin-builder");
    } else {
      signIn();
    }
  };

  return (
    <div className="flex justify-between gap-0.5 md:gap-3 items-center p-6 w-full vs:gap-3 lg:gap-3 xl:gap-3 2xl:gap-3">
      <Image
        src="/logo.png"
        alt="log"
        width={50}
        height={50}
        onClick={() => router.push("/")}
        className="hover:bg-gray-300 p-2 rounded-full cursor-pointer"
      />
      <button
        className="bg-black hover:bg-gray-300 text-white p-2 px-4 rounded-full hidden md:flex lg:flex "
        onClick={() => router.push("/")}
      >
        Home
      </button>
      <button
        className="font-semibold p-2 px-4 rounded-full hover:bg-gray-300"
        onClick={() => onCreateClick()}
      >
        Create
      </button>
      <div className="bg-[#e9e9e9] p-3 flex gap-3 items-center rounded-full w-full">
        <HiSearch className="text-[25px] text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none w-[70px] vs:w-full lg:w-full xl:w-full 2xl:w-full"
          onChange={(e) => setState({ ...state, search: e.target.value })}
        />
      </div>
      {/* <HiSearch
        className="text-[25px] 
        text-gray-500 md:hidden"
      /> */}
      <HiBell className="text-[40px] md:text-[60px] text-gray-500 hidden md:flex lg:flex xl:flex 2xl:flex" />
      <HiChat className="text-[40px] md:text-[60px] text-gray-500 hidden md:flex lg:flex xl:flex 2xl:flex" />
      {session?.user ? (
        <Image
          src={session.user.image}
          onClick={() => router.push("/" + session.user.email)}
          alt="profile"
          width={50}
          height={59}
          className="hover:bg-gray-300 p-2 rounded-full cursor-pointer"
        />
      ) : (
        <button
          className="font-semibold p-2 px-4 rounded-full hover:bg-gray-300"
          onClick={() => signIn()}
        >
          Login
        </button>
      )}
    </div>
  );
}

export default Header;
