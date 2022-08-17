import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LikeProduct } from "../components/LikeProduct";
import { getFavoriteProduct } from "../utils/api";
import beforeIcon from "../assets/img/arrow-left.svg";
import { StyledHr } from "../components/Common";
import { Spinner } from "grommet";
import { getLikeProduct } from "../utils/apis/UserAPI";
export const LikeList = () => {
  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate("");
  const [products, setProducts] = useState([]);
  const GoBack = () => {
    Navigate(-1);
  };

  const handleData = () => {
    getLikeProduct(
      (res) => {
        console.log("관심작품 ", res);
        setProducts(res.data);
        setLoading(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    if (loading) handleData();
    return () => {
      setLoading(false);
    };
  }, [products]);

  if (loading) return <Spinner />;
  return (
    <div>
      {/* 판매내역 header */}
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
          <h4>관심목록</h4>
          <h4 style={{ visibility: "hidden" }}>dd</h4>
        </div>
        <StyledHr width="99vw" height="0.5px" color="lightgray" />
      </div>
      {/* <ProductState src={imgurl} title={title} time={time} state={state} price={price} ></ProductState>
       */}
      {products.map((product, idx) => (
        <div key={idx}>
          <LikeProduct product={product} handleData={handleData} />
          <hr
            style={{
              border: "none",
              height: "1px",
              backgroundColor: "rgb(217,217,217,0.5)",
            }}
          />
        </div>
      ))}
    </div>
  );
};
