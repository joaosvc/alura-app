import React from "react";
import ReactPlayer from "react-player";

interface PlayerProps {
  url: string;
  thumbnail: string;
}

const Player = ({ url, thumbnail }: PlayerProps) => {
  return (
    <>
      <ReactPlayer
        controls={true}
        url={url}
        width="100%"
        height="100%"
        config={{
          file: {
            attributes: {
              poster: thumbnail,
              controlsList: "nodownload",
            },
          },
        }}
      />
    </>
  );
};

export default React.memo(Player);
