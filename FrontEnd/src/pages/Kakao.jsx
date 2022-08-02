import React from "react";
import { useDispatch } from "react-redux";
<<<<<<< HEAD
import { kakaoLogin } from "../stores/modules/User";
import Login from "./Login";

export default function Kakao() {
    const dispatch = useDispatch();
    let code = new URL(window.location.href).searchParams.get("code");

    React.useEffect(async () => {
        await dispatch(kakaoLogin(code));
    }, []);
    console.log(code)
    return (
        <Login />
    )
}

=======
import Loading from "../components/Loading";
import { login } from "../stores/modules/user";

export default function Kakao(props) {
  const dispatch = useDispatch();

  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");
  console.log(code);
  dispatch(login(code));
>>>>>>> efe1ffe1cf04e2ac28f4ee4bfa8ff92590ff5e35

  return (
    <div>
      <Loading />
    </div>
  );
}
