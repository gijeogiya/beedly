import React, { useState } from 'react'
import Button from "../components/Button"
import { Input, Hr } from "../components/UserStyled"
import { RadioButton, DateInput } from "grommet";

const SignupInput = {
    display: "flex",
    margin: "1vw 3vw",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "40vh",
}
const MainContent = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
}

const tableStyle = {
    width: "60vw",
    border: "0px",
}

const heading2 = {
    fontWeight: "500",
    fontSize: "16px",
    margin: "7px 0px",
}
const flexrowbox = {
    alignSelf: "auto",
    justifySelf: "baseline",
    flexDirection: "row",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    margin: "10px 0px",
}
const flexrowbox2 = {
    display: "flex",
    width: "30vw",
    justifyContent: "space-between",
    margin: "10px 0px",
}


export default function Signup() {
    const [Woman, setWoman] = React.useState(true);
    const [Man, setMan] = React.useState(false);
    return (
        <div style={MainContent}>

            <h3>회원가입</h3>
            <div style={SignupInput}>
                <table style={tableStyle}>
                    <tr>
                        <td>이름</td>
                        <td>이아현</td>
                    </tr>
                    <tr>
                        <td>전화번호</td>
                        <td>010 - 2872 - 1882</td>
                    </tr>
                    <tr>
                        <td>Role</td>
                        <td>구매자</td>
                    </tr>
                </table>
                <div>
                    <h3 style={heading2}>Email</h3>
                    <Input></Input>
                </div>
                <div>
                    <h3 style={heading2}>Password</h3>
                    <Input>영문, 숫자 조합 최소 9자</Input>
                    <br />
                    <Input>비밀번호 재입력</Input>
                </div>
                <div style={flexrowbox}>
                    <h3 style={heading2}>성별</h3>
                    <div style={flexrowbox2}>
                        <RadioButton
                            name="man"
                            checked={Man}
                            label="남"
                            onChange={(event) => setMan(event.target.checked)}
                        />

                        <RadioButton
                            name="woman"
                            checked={Woman}
                            label="여"
                            onChange={(event) => setMan(event.target.checked)}
                        />
                    </div>
                </div>
                <div style={flexrowbox}>
                    <h3 style={heading2}>생년월일</h3>
                    <div style={{ width: "50vw" }}>

                        <DateInput
                            format="mm/dd/yyyy"
                            value={(new Date()).toISOString()}
                            onChange={({ value }) => { }}
                            size="xsmall"
                        />
                    </div>
                </div>
                <div>
                    <h3 style={heading2} >닉네임</h3>
                    <Input></Input>
                </div>
                <div>
                    <div style={flexrowbox}>
                        <h3 style={heading2}>주소</h3>
                        <Button XsmallBlack>주소찾기</Button>
                    </div>
                    <Input></Input>
                </div>
                <div style={{ margin: "0px 0px 10px 0px" }}>
                    <h3 style={heading2}>상세주소</h3>
                    <Input></Input>
                </div>

                <Button BigBlack>회원가입</Button>
            </div>
        </div>
    )
}
