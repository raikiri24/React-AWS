import React, { useEffect, useState } from "react";
const Welcome = () => {
  const [galleryImgData, setGalleryImgData] = useState([]);
  const loadGalleryImgData = async () => {
    const resp = await fetch(
      "https://hn49yz664f.execute-api.ap-southeast-1.amazonaws.com/Production/galleryimg"
    );

    let jsonData = await resp.json();
    setGalleryImgData(jsonData);
  };

  useEffect(() => {
    loadGalleryImgData();
  });
  return (
    <div className="scene" id="welcome">
      <article className="content">
        <div className="gallery">
          {galleryImgData.map((img) => (
            <img
              src={`${img.src}`}
              alt={`${img.alt}`}
              className={`${img.className}`}
            />
          ))}
        </div>
        <h1>Welcome to the Landon&nbsp;Hotel</h1>
        <p>
          The original Landon perseveres after 50 years in the heart of West
          London. The West End neighborhood has something for everyone—from
          theater to dining to historic sights. And the not-to-miss Rooftop Cafe
          is a great place for travelers and locals to engage over drinks, food,
          and good&nbsp;conversation. &nbsp;To learn more about the Landon Hotel
          in the West End, browse our website and{" "}
          <a href="files/landon_information_sheet_London.pdf">
            download our handy information sheet
          </a>
          .
        </p>
      </article>
    </div>
  );
};

export default Welcome;
