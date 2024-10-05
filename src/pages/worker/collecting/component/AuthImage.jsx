import React, { useEffect, useState } from "react";
import jwtAxios from "../../../../util/jwtUtil";

const AuthImage = ({ src, alt, className }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    jwtAxios
      .get(src, { responseType: "blob" })
      .then((response) => {
        const url = URL.createObjectURL(response.data);
        setImageSrc(url);
      })
      .catch((error) => console.log("ERROR LOADING IMAGE: ", error));
  }, [src]);

  return imageSrc ? (
    <img src={imageSrc} alt={alt} className={className} />
  ) : null;
};

export default AuthImage;
