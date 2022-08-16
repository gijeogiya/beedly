import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import beforeIcon from "../assets/img/arrow-left.svg";
import { StyledHr } from "../components/Common";
export const LikeArtistList = () => {
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate("");
  const [products, setProducts] = useState([]);
  const GoBack = () => {
    Navigate(-1);
  };
  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "5vh",
            alignItems: "center",
            padding: "0px 10px",
          }}
        >
          <img alt="이전" src={beforeIcon} onClick={GoBack} />
          <h4>관심작가목록</h4>
          <h4 style={{ visibility: "hidden" }}>dd</h4>
        </div>
        <StyledHr width="99vw" height="0.5px" color="lightgray" />
      </div>
    </div>
  );
};
