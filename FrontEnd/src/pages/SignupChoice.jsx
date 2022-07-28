import React from 'react'
import Button from "../components/Button"
import { Hr } from "../components/UserStyled"

const SignupInput = {
  display: "flex",
  margin: "1vw 3vw",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: "40vh",
}
const MainContent = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "90vh",
}
const Choice = {
  display: "flex",
  justifyContent: "space-around",
}
export default function signup() {
  return (
    <div style={MainContent}>

      <h3>회원가입</h3>
      <div style={SignupInput}>
        <Hr Thin />
        <div style={Choice}>
          <img style={{ maxWidth: "100%", height: "auto", margin: "0px 10px" }}
            alt="판매자" src="/img/Choice1.svg" />
          <img style={{ maxWidth: "100%", height: "auto", margin: "0px 10px" }} alt="구매자" src="/img/Choice2.svg" />
        </div>
        <Button MediumBlack>본인인증</Button>
        <Hr Thin />
        <br />
      </div>
    </div>
  )
}
