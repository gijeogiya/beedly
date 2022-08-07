<<<<<<< HEAD
import React from "react";
=======
import React, { useState } from 'react'
>>>>>>> origin/feature/f_signup
import { useDispatch } from "react-redux";
import { LogoHeader } from '../components/Common';
import { actionCreators as userActions } from "../stores/modules/user";
// import { login } from '../utils/api';
import Loading from "./Loading";
import { useSelector } from 'react-redux';
export default function Kakao() {
<<<<<<< HEAD
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
=======
    const dispatch = useDispatch();
    const [userId, setuserId] = useState('');
    const Selector = useSelector(state => state.user.user);
    React.useEffect(() => {
        let code = new URL(window.location.href).searchParams.get("code");
        async function fetchData() {
            await dispatch(userActions.login(code));
        }
        fetchData();

    }, []);
>>>>>>> origin/feature/f_signup
    return (
        <div>
            <LogoHeader />
            <div>
                {Selector.userId}

            </div>
            <Loading />
        </div>
    )
=======
  return <Login />;
>>>>>>> origin/feature/f_auctionDetail
}
