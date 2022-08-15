import React from "react";
import { StyledHr } from "../components/Common";
import ProductState from "../components/ProductState";
import { FlexBox, Hr } from "../components/UserStyled";
import beforeIcon from "../assets/img/arrow-left.svg";
import { nodeName } from "jquery";
// 판매내역 페이지
export default function SaleList() {
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
          <img alt="이전" src={beforeIcon} />
          <h4>판매내역</h4>
          <h4 style={{ visibility: "hidden" }}>dd</h4>
        </div>
        <StyledHr width="99vw" height="0.5px" color="lightgray" />
      </div>
      {/* <ProductState src={imgurl} title={title} time={time} state={state} price={price} ></ProductState>
       */}
      <ProductState></ProductState>
      <hr
        style={{
          border: "none",
          height: "1px",
          backgroundColor: "rgb(217,217,217,0.5)",
        }}
      />
      <ProductState></ProductState>
      <hr
        style={{
          border: "none",
          height: "1px",
          backgroundColor: "rgb(217,217,217,0.5)",
        }}
      />
      <ProductState></ProductState>
      <hr
        style={{
          border: "none",
          height: "1px",
          backgroundColor: "rgb(217,217,217,0.5)",
        }}
      />
      <ProductState></ProductState>
      <hr
        style={{
          border: "none",
          height: "1px",
          backgroundColor: "rgb(217,217,217,0.5)",
        }}
      />
      <ProductState></ProductState>
    </div>
  );
}
