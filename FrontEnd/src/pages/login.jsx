import React from 'react'
import Logo from "../components/logo.jsx";


const loginInput = {
    display: "flex",
    margin: "10vw 3vw",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height : "35vh",
}

const inputStyle = {
    minWidth : "80vw",
    minHeight : "40px",
    boxShadow:"0px 4px 3px 0px rgba(0,0,0,0.6)",
    borderRadius: "5px",
    border:"1px rgb(255,255,255)",
    padding : "5px",
    margin : "5px 0px"
}

const heading = {
    fontWeight: "bold",
    fontSize: "16px",
}

const heading2 = {
    fontWeight: "600",
    fontSize: "16px",
}
const flexbox = {
    display: "flex",
    margin: "10vw 3vw",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height : "11vh",   
}
const smallButton={
    width: "30vw",
    height: "42px",
    borderRadius: "5px",
    backgroundColor: "#1F1D1D",
    color: "white",
    border:"0px",
}

const largeButton={
    width: "70vw",
    height: "42px",
    borderRadius: "5px",
    backgroundColor: "#1F1D1D",
    color: "white",
    border:"0px",
}

const largeButtonYellow={
    width: "70vw",
    height: "42px",
    borderRadius: "5px",
    backgroundColor: "#FFD100",
    color: "#1F1D1D",
    border:"0px",
}
export default function login() {
    return (
        <div>
            <Logo />
            <div style={loginInput}>
                <div style={heading}>로그인</div>
                <div>
                    <div style={heading2}>Email</div>
                    <input type="text" style = {inputStyle}/>
                </div>
                <div>
                    <div style={heading2}>Password</div>
                    <input type="text" style = {inputStyle}/>
                </div>
                <button style={smallButton}>로그인</button>
            </div>
            <hr/>
            <div style={flexbox}>
            <button style={largeButtonYellow}>카카오로 로그인</button>
            <button style={largeButton}>회원가입</button>
            </div>
        </div>
    )
}
