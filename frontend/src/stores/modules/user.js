import axios from "axios";
import { createAction, handleActions } from "redux-actions";
import { useNavigate } from "react-router-dom";
import produce from "immer";
import { loginApi, updateUserInfoApi } from "../../utils/api";

const SET_USER = "SET_USER";

const setUser = createAction(SET_USER, (user) => ({ user }));

const initialState = {
  user: {
    userId: "",
  },
};

// 카카오 로그인
export const login = (code) => {
  return function (dispatch, getState) {
    loginApi(
      code,
      (res) => {
        let token = res.headers["authorization"];

        dispatch(
          setUser({
            userEmail: res.data.userEmail,
            userEender: res.data.userGender,
            userId: token,
          })
        );

        localStorage.setItem("token", token);
        if (res.status === 200) {
          console.log("로그인 성공");
          let token = res.headers["authorization"];
          // sessionStorage("token", token);
          dispatch(setUser);
          window.location.href = "/";
        } else if (res.status === 201) {
          //사용자 정보가 없을 때(회원가입 안함) -> 회원가입 페이지로 이동
          // localStorage.setItem("token", token);
          window.location.href = "/signup1";
        }
      },
      (err) => {
        console.log(err);
      }
    );
  };
};

// export const join = (user) => {
//   return function (dispatch, getState) {
//     updateUserInfoApi(
//       user,
//       (res) => {
//         let token = res.headers["authorization"];
//         console.log(res);
//         dispatch(
//           setUser({
//             userEmail: res.data.userEmail,
//             userGender: res.data.userGender,
//             userId: token,
//           })
//         );
//         console.log(res.data.userEmail);
//         console.log(res.data.userGender);
//         if (res.status === 200) {
//           console.log("로그인 성공");
//           let token = res.headers["authorization"];
//           localStorage.setItem("token", token);
//           // window.location.href = "/";
//         } else if (res.status === 201) {
//           //사용자 정보가 없을 때(회원가입 안함) -> 회원가입 페이지로 이동
//           // window.location.href = "/signup1";
//         }
//       },
//       (err) => {
//         console.log(err);
//       }
//     );
//   };
// };

export default handleActions(
  {
    //사용자 정보 설정
    [SET_USER]: (state, { payload: user }) =>
      produce(state, (draft) => {
        draft.user = user;
        console.log(draft.user);
      }),
  },
  initialState
);

const actionCreators = {
  setUser,
  login,
  // join,
};

export { actionCreators };
