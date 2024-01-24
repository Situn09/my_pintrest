import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import ShareButton from "./Utils/ShareButton";
// import { useRouter } from "next/router";

function UserInfo({ userInfo }) {
  console.log("required current url", userInfo);
  const router = useRouter();
  const pathname = usePathname();
  console.log("pathname Detail", pathname);
  const [isLoading, setLoading] = useState(true);
  console.log("hello user :", userInfo);
  const { data: session } = useSession();

  const onLogOutClick = () => {
    signOut();
    router.push("/");
  };

  const isPostImagePageActive = pathname === "/" + session?.user.email;
  const isBookmarkPageActive =
    pathname === "/" + session?.user.email + "/BookmarkPage";

  return (
    <>
      <div className="flex flex-col items-center">
        <Image
          src={userInfo.userImage}
          alt="userImage"
          width={80}
          height={80}
          className="rounded-full"
        />
        <h2 className="text-[30px] font-semibold">{userInfo.userName}</h2>
        <h2 className="text-gray-400">{userInfo.email}</h2>
        <div className="flex-row gap-5 justify-center align-middle vs:flex md:flex lg:flex xl:flex 2xl:flex">
          {session?.user.email == userInfo.email ? (
            <button
              className={` hover:bg-slate-500 p-2 px-3 font-semibold mt-5 rounded-full ${
                isPostImagePageActive ? "bg-slate-500" : "bg-gray-200"
              }`}
              onClick={() => router.push("/" + session.user.email)}
            >
              Captured Keeps
            </button>
          ) : null}
          <div className="bg-gray-200 hover:bg-slate-500  p-2 px-3 font-semibold mt-5 rounded-full">
            <ShareButton
              title={"Share your Profile"}
              url={`https://situnprintrest.netlify.app/${userInfo.email}`}
              text={""}
            />
          </div>
          {session?.user.email == userInfo.email ? (
            <>
              <button
                // activeClassName="active"
                className={` hover:bg-slate-500 p-2 px-3 font-semibold mt-5 rounded-full ${
                  isBookmarkPageActive ? "bg-slate-500" : "bg-gray-200"
                }`}
                onClick={() =>
                  router.push("/" + session.user.email + "/BookmarkPage")
                }
              >
                ⭐ Favorites Flicks
              </button>
              <button
                className="bg-gray-200 hover:bg-slate-500  p-2 px-3 font-semibold mt-5 rounded-full"
                onClick={() => onLogOutClick()}
              >
                Logout
              </button>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default UserInfo;
