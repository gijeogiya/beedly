import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { FlexBox } from "../components/UserStyled";
import { artistApplicationApi } from "../utils/apis/AdminAPI";

// artist 신청서 내라는 안내문
export default function SignupAritst() {
  const user = useSelector((state) => state.user.user.user);
  const Navigate = useNavigate("");

  // 증빙서류를 제출하라는 페이지를 보고 다음을 누를 경우
  const SignupComplete = () => {
    console.log(user.userId);
    artistApplicationApi(
      (res) => {
        console.log(res);
        Navigate("/");
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return (
    <FlexBox Column_SB style={{ height: "80vh" }}>
      <div style={{ margin: "0vh 3vh" }}>
        <h3 style={{ textAlign: "center" }}>회원가입</h3>

        <p style={{ fontSize: "12px" }}>
          작가님은 추가 증빙 자료를 제출, 승인 후에 이용이 가능합니다.
          <br />
          작가님 승인 이전에는 구매자 등급으로 이용이 가능합니다.
          <br />
          dldkgus98@naver.com 으로 증빙 서류를 제출해주세요.
        </p>

        <h5>필요한 증빙서류</h5>
        <ul style={{ alignSelf: "flex-start", margin: "0px" }}>
          <li style={{ fontSize: "14px" }}>포트폴리오</li>
          <li style={{ fontSize: "14px" }}>작품 사진(최소 3개)</li>
        </ul>
      </div>
      <br />
      <Button BigBlack onClick={SignupComplete}>
        다음
      </Button>
    </FlexBox>
  );
}
