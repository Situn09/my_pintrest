import { RWebShare } from "react-web-share";

const ShareButton = ({ title, text, url }) => {
  return (
    <RWebShare
      data={{
        text: text,
        title: title,
        url: url,
      }}
    >
      <button style={{ textAlign: "center", width: "100%" }}>Share</button>
    </RWebShare>
  );
};
export default ShareButton;
