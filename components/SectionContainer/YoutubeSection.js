import React, { useEffect, useState } from "react";
import { get } from "../../services/UserServices";
import { Youtubecard } from "../YoutubeComponent";
import Homesection from "./HomeSection";
import Scrollsection from "./ScrollSection";
import { HomesectionskeletonScroll } from "../SkeletonView";

const Youtubesection = ({ pathUrl, title }) => {
  const [dataVideo, setdataVideo] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const getVideo = async () => {
    const { data, _, status } = await get({
      pathUrl: pathUrl,
    });

    if (status === 200) {
      setdataVideo(data.data);
      setisLoading(false);
    }
  };

  useEffect(() => {
    getVideo();
  }, []);

  if (dataVideo.length > 0) {
    return (
      <Homesection title={title} isLoading={isLoading}>
        <Scrollsection>
          {dataVideo.map((element, index) => {
            return (
              <Youtubecard
                title={element.title}
                key={index}
                imageUrl={element.thumbnail}
              />
            );
          })}
        </Scrollsection>
      </Homesection>
    );
  } else {
    return <HomesectionskeletonScroll isLoading={isLoading} />;
  }
};

export default Youtubesection;
