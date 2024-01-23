import Image from "next/image";
import { useState } from "react";

import Spinner from "../../../public/Spinner.gif";

const Loading = ({ isLoading, children }) => {
  return isLoading ? (
    <div
      style={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image src={Spinner} />
    </div>
  ) : (
    <>{children}</>
  );
};
export default Loading;
