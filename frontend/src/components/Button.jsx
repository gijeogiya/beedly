import React from "react";
import styled, { css } from "styled-components";
import "../App.css";
const StyledButton = styled.button`
  height: 42px;
  border-radius: 5px;
  border: 0px;
  font-size: 12px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 500;
  margin: 10px 5px;
  ${(props) =>
    props.BigBlack &&
    css`
      color: white;
      background: #1f1d1d;
      width: 70vw;
    `}
  ${(props) =>
    props.BigYellow &&
    css`
      color: #1f1d1d;
      background: #ffd100;
      width: 70vw;
    `}
    ${(props) =>
    props.BigPink &&
    css`
      color: white;
      background: #d00000;
      opacity: 0.4;
      width: 70vw;
    `}
    ${(props) =>
    props.BigGray &&
    css`
      color: white;
      background: #1f1d1d;
      opacity: 0.4;
      width: 70vw;
    `}
    ${(props) =>
    props.BigRed &&
    css`
      color: white;
      background: #d00000;
      width: 70vw;
    `}

    ${(props) =>
    props.MediumBlack &&
    css`
      color: white;
      background: #1f1d1d;
      width: 40vw;
    `}
    ${(props) =>
    props.MediumGreen &&
    css`
      color: white;
      background: #2c9722;
      width: 40vw;
    `}
    ${(props) =>
    props.MideumRed &&
    css`
      color: white;
      background: #d00000;
      width: 40vw;
    `}
    ${(props) =>
    props.MediumYellow &&
    css`
      color: #1f1d1d;
      background: #ffd100;
      width: 40vw;
    `}
    ${(props) =>
    props.MediumPink &&
    css`
      color: white;
      background: #d00000;
      opacity: 0.4;
      width: 40vw;
    `}
    ${(props) =>
    props.MediumGray &&
    css`
      color: white;
      background: #1f1d1d;
      opacity: 0.4;
      width: 40vw;
    `}

    ${(props) =>
    props.SmallBlack &&
    css`
      color: white;
      background: #1f1d1d;
      width: 20vw;
    `}
    ${(props) =>
    props.SmallRed &&
    css`
      color: white;
      background: #d00000;
      width: 20vw;
    `}
    ${(props) =>
    props.SmallGray &&
    css`
      color: white;
      background: #1f1d1d;
      opacity: 0.4;
      width: 20vw;
    `}
    ${(props) =>
    props.SmallYellow &&
    css`
      color: #1f1d1d;
      background: #ffd100;
      width: 20vw;
    `}
    ${(props) =>
    props.SmallBlue &&
    css`
      color: white;
      background: #5484e2;
      width: 20vw;
    `}
    ${(props) =>
    props.SmallThinYellow &&
    css`
      align: center;
      color: #1f1d1d;
      background: #ffd100;
      height: 30px;
      width: 15vw;
    `}

    ${(props) =>
    props.SmallThinWhite &&
    css`
      align: center;
      color: black;
      background: #e0e0e0;
      height: 30px;
      width: 15vw;
    `}

    ${(props) =>
    props.TagYellow &&
    css`
      color: #1f1d1d;
      background-color: rgba(255, 209, 0, 0.7);
      min-height: 32px;
      max-width: 20%;
    `}
    ${(props) =>
    props.TagGray &&
    css`
      color: #565656;
      background-color: #d8d8d8;
      min-height: 32px;
      max-width: 20%;
    `}

    ${(props) =>
    props.XsmallBlack &&
    css`
      color: white;
      background: #1f1d1d;
      width: 15vw;
      height: 30px;
      font-size: 8px;
    `}

    ${(props) =>
    props.Blank &&
    css`
      color: black;
      background: none;
      width: 15vw;
      font-size: 8px;
    `}
`;

export default function Button({ children, ...props }) {
  return <StyledButton {...props}>{children}</StyledButton>;
}
