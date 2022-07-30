import React from "react";
import styled from "styled-components";

const HeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;

const HeaderBox = () => {
  return (
    <HeaderDiv>
      <div></div>
      <div>작품 등록</div>

      <button>{"X"}</button>
    </HeaderDiv>
  );
};

export const SpecialProduct = () => {
  return (
    <div>
      <HeaderBox />
      <div>메인</div>
      <div>사진들</div>
      <div>태그</div>
      <div>버튼</div>
    </div>
  );
};
