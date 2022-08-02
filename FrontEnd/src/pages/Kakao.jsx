import React from "react";
import { useDispatch } from "react-redux";
import Loading from "../components/Loading";
import { login } from "../stores/modules/user";

export default function Kakao(props) {
  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  dispatch(login(code));

  return (
    <div>
      <Loading />
    </div>
  );
}
