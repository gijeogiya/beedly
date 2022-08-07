import React from "react";
import { useDispatch } from "react-redux";
import { LogoHeader } from '../components/Common';
import { actionCreators as userActions } from "../stores/modules/user";
// import { login } from '../utils/api';
import Loading from "./Loading";

export default function Kakao() {
  const dispatch = useDispatch();
  let code = new URL(window.location.href).searchParams.get("code");
  // React.useEffect(() => {
  //     async function fetchdata() {
  //         await dispatch(userActions.login(code));

  //     }
  //     fetchdata();
  // }, []);
  React.useEffect(async () => {
    await dispatch(userActions.login(code));
  }, []);

<<<<<<< HEAD
    return (
        <div>
            <LogoHeader />
            <Loading />
        </div>
    )
=======
  return <Login />;
>>>>>>> origin/feature/f_auctionDetail
}
