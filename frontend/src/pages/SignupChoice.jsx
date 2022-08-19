import React, { useState } from "react";
import Button from "../components/Button";
import { FlexBox, Hr } from "../components/UserStyled";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ArtistMan from "../assets/img/artist_man.png";
import ArtistWoman from "../assets/img/artist_woman.png";
import UserMan from "../assets/img/user_man.png";
import UserWoman from "../assets/img/user_woman.png";

const SignupInput = {
  display: "flex",
  margin: "1vw 3vw",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  minHeight: "40vh",
};
const Choice = {
  width: "80vw",
  display: "flex",
  justifyContent: "space-around",
};
// 유저가 ROLE 선택하는 페이지
export default function Signup() {
  const [role, setRole] = useState("");
  const Navigate = useNavigate();
  const User = useSelector((state) => (state.user.user.user));
  // 다음을 누르면 해당 유저의 ROLE정보를 가지고 signup페이지로 이동
  const Signup2 = () => {
    Navigate(`/signup2?role=${role}`);
  };
  console.log(User);
  return (
    <FlexBox MainContent>
      <h3>회원가입</h3>
      <div style={SignupInput}>
        <Hr Thin />
        <div style={Choice}>
          <FlexBox Column_C style={{ width: "34vw", height: "20vh", borderRadius: "5%", backgroundColor: `${role === "ROLE_ARTIST" ? "#ffd100" : "#f0f0f0"}` }}>

            <img
              name="artist"
              style={{
                maxWidth: "100%",
                height: "auto",
                margin: "0px 10px",
                width: "25vw",
                height: "25vw"
              }}
              alt="판매자"
              src={User.userGender == "F" ? ArtistWoman : ArtistMan}
              onClick={() => {
                setRole("ROLE_ARTIST");
              }}
            />
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>작가님</div>
          </FlexBox>
          <FlexBox Column_C style={{ width: "34vw", height: "20vh", borderRadius: "5%", backgroundColor: `${role === "ROLE_USER" ? "#ffd100" : "#f0f0f0"}` }}>

            <img
              name="user"
              style={{
                maxWidth: "100%",
                height: "auto",
                margin: "0px 10px",
                width: "25vw",
                height: "25vw",
              }}
              alt="구매자"
              src={User.userGender == "F" ? UserWoman : UserMan}
              onClick={() => setRole("ROLE_USER")}
            />
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>구매자</div>

          </FlexBox>
        </div>
        <Button MediumBlack onClick={Signup2}>
          다음으로 넘어가기
        </Button>
        <Hr Thin />
        <br />
      </div>
    </FlexBox>
  );
}
