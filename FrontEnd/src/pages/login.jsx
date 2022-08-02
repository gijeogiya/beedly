import React from 'react'
import Button from "../components/Button"
import { Input, Hr } from "../components/UserStyled"
import Loading from "../components/Loading"

// const loginInput = {
//     display: "flex",
//     margin: "2vw 3vw",
//     flexDirection: "column",
//     justifyContent: "space-around",
//     alignItems: "center",
//     minHeight: "45vh",
// }

// const heading = {
//     fontWeight: "bold",
//     fontSize: "16px",
// }

// const heading2 = {
//     fontWeight: "500",
//     fontSize: "16px",
// }
const flexbox = {
    display: "flex",
    margin: "10vw 3vw",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: "auto",
}
const MainContent = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
}


const CLIENT_ID = process.env.REACT_APP_KAKAO_API_KEY;
const REDIRECT_URI = "http://localhost:3000/user/kakao/callback";
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
const test = () => {
    console.log(KAKAO_AUTH_URL)
    window.location.href = KAKAO_AUTH_URL;
}
export default function login() {
    return (
        <div style={MainContent}>
            {/* <div style={loginInput}>
                <div style={heading}>로그인</div>
                <div>
                    <div style={heading2}>Email</div>
                    <Input></Input>
                </div>
                <div>
                    <div style={heading2}>Password</div>
                    <Input></Input>
                </div>
                <Button MediumBlack>로그인</Button>
            </div>
            <Hr Thin /> */}
            <div style={flexbox}>
                <Button BigYellow onClick={test}>카카오 로그인</Button>
                <Button BigBlack>회원가입</Button>
            </div>
        </div>
    )
}
