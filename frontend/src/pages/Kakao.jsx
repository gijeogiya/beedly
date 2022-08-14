import React from "react";
import { useDispatch } from "react-redux";
import { LogoHeader } from "../components/Common";
import { setUser } from "../stores/modules/user";
import Loading from "./Loading";
import { loginApi } from "../utils/api";


export default function Kakao() {
  const dispatch = useDispatch();

  // kakao에서 던져준 코드 꺼내기
  let code = new URL(window.location.href).searchParams.get("code");
  const fetchData = async () => {
    // 해당코드를 백엔드에 요청해서 accessToken발금
    loginApi(
      code,
      (res) => {
        let token = res.headers["authorization"];
        console.log(res);

        // 응답받은 요청 내용을 redux에 저장
        dispatch(
          setUser({
            userName: res.data.userName,
            userNickname: res.data.userNickname,
            userEmail: res.data.userEmail,
            userId: res.data.userId,
            token: token,
            role: res.data.userRole,
          })
        );

        localStorage.setItem("token", token);
        // 사용자 정보가 있는 로그인인 경우 메인페이지로 이동
        if (res.status === 200) {
          console.log("로그인 성공");
          window.location.href = "/";

        } else if (res.status === 201) {
          //사용자 정보가 없을 때(회원가입 안함) -> 회원가입 페이지로 이동
          window.location.href = "/signup1";
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
  React.useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <LogoHeader />

      <Loading />
    </div>
  );
}
