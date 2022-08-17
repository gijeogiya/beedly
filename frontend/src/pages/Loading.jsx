import React from "react";
import { Spinner } from "grommet";
import { FlexBox } from "../components/UserStyled";
import { useSelector } from "react-redux";

export default function Loading() {
  const User = useSelector((state) => state.user.user);
  console.log(User);
  return (
    <FlexBox MainContent>
      <h4>로그인 중입니다.</h4>
      <br />
      <Spinner />
      {User.userId}
    </FlexBox>
  );
}
