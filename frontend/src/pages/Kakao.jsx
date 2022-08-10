import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { LogoHeader } from "../components/Common";
import { actionCreators as userActions, setUser } from "../stores/modules/user";
// import { login } from '../utils/api';
import Loading from "./Loading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../utils/api";
export default function Kakao() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userId, setuserId] = useState("");
  const Selector = useSelector((state) => state.user.user);
  let code = new URL(window.location.href).searchParams.get("code");
  const fetchData = async () => {
    loginApi(
      code,
      (res) => {
        let token = res.headers["authorization"];
        console.log(res);
        dispatch(
          setUser({
            userName: res.data.userName,
            userNickname: res.data.userNickname,
            userId: res.data.userId,
            token: token,
          })
        );

        localStorage.setItem("token", token);
        if (res.status === 200) {
          console.log("로그인 성공");
          let token = res.headers["authorization"];
          // sessionStorage("token", token);
          // dispatch(setUser);
          // window.location.href = "/";
          // return "/";
          navigate("/");
        } else if (res.status === 201) {
          //사용자 정보가 없을 때(회원가입 안함) -> 회원가입 페이지로 이동
          // localStorage.setItem("token", token);
          // window.location.href = "/signup1";
          // return "/signup1";
          navigate("/signup1");
        }
      },
      (err) => {
        console.log(err);
        //   return "";
      }
    );
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <LogoHeader />

      <Loading />
    </div>
  );
}
