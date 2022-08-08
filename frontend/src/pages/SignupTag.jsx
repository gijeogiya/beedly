import React from 'react'
import logo from '../assets/img/logoClear.png'
import { FlexBox } from '../components/UserStyled'
export default function SignupTag() {
    return (
        <div>
            <FlexBox MainContent style={{ padding: "5vh" }}>

                <div style={{ alignSelf: "flex-start" }}>
                    <h3 style={{ margin: "3px" }}>마음에드는</h3>
                    <h3 style={{ margin: "3px" }}>태그를 선택해주세요!</h3>

                </div>
                <br />
                <FlexBox Row_C>
                    <img style={{ height: "5vh" }} src={logo} alt="beedly" />가 당신의 취향을 추천해드릴게요.
                </FlexBox>
            </FlexBox>
        </div>
    )
}
