import React, { useEffect } from "react";
import beforeIcon from "../assets/img/arrow-left.svg";
import { StyledHr, StyledProfile, StyledText } from "../components/Common";
import { FlexBox } from "../components/UserStyled";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import Plus from "../assets/img/PlusIcon.svg";
import { getUserInfoApi } from "../utils/apis/UserAPI";
import { useDispatch } from "react-redux";
import { setUser as setReduxUser } from "../stores/modules/user";
import { AlertDialog } from "../components/AlertDialog";
import { Box } from "grommet";
import ArtistMan from "../assets/img/artist_man.png";
import ArtistWoman from "../assets/img/artist_woman.png";
import UserMan from "../assets/img/user_man.png";
import UserWoman from "../assets/img/user_woman.png";
import styled from "styled-components";

const styledp = {
  fontSize: "14px",
};

const StyledCardArtistImg = styled.img`
  width: 25vw;
  height: 25vw;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #ebebeb;
`;

export default function MypageDetail() {
  const checkProfile = () => {
    if (user.userGender === "M") {
      if (user.userRole === "ROLE_USER") {
        return UserMan;
      } else if (user.userRole === "ROLE_ARTIST") {
        return ArtistMan;
      }
    } else if (user.userGender === "F") {
      if (user.userRole === "ROLE_USER") {
        return UserWoman;
      } else if (user.userRole === "ROLE_ARTIST") {
        return ArtistWoman;
      }
    }
    return UserMan;
  };
  const Navigate = useNavigate("");
  const [user, setUser] = useState({
    userName: "",
    userRole: "",
    userEmail: "",
  });
  const [loading, setloading] = useState(true);
  const [taglist, setTagList] = useState([]);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    // 아직 로그인 된 상태가 아니라면
    if (localStorage.getItem("token") === null) {
      // 로그인하라고 보내주기
      Navigate("/login");
    } else {
      if (loading) {
        // 내 정보 조회
        getUserInfoApi(
          (res) => {
            console.log(res);
            setUser(res.data);
            setTagList(res.data.recommendationTagDtos);
            setloading(false);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    }
    // eslint-disable-next-line
  }, []);

  // 뒤로가기
  const Goback = () => {
    Navigate(-1);
  };
  // 로그아웃
  const Logout = () => {
    localStorage.removeItem("token");
    dispatch(setReduxUser(undefined));
    window.location.href = "/";
  };

  //로그아웃 confirm 함수
  const useConfirm = (message = null, onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }
    if (onCancel && typeof onCancel !== "function") {
      return;
    }

    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };

    return confirmAction;
  };
  const deleteConfirm = () => Logout();
  const cancelConfirm = () => console.log("취소했습니다.");

  const confirmLogout = useConfirm(
    "로그아웃하시겠습니까?",
    deleteConfirm,
    cancelConfirm
  );
  const handleClose = () => {
    setOpen(false);
  };

  const CheckRole = () => {
    if (user.userRole === "ROLE_USER") {
      return "구매자";
    } else if (user.userRole === "ROLE_ARTIST") {
      return "작가님";
    } else if (user.userRole === "ROLE_ADMIN") {
      return "관리자";
    }
    return "정보없음";
  };
  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "5vh",
            alignItems: "center",
            padding: "0px 10px",
          }}
        >
          <img
            alt="이전"
            src={beforeIcon}
            style={{ padding: "15px" }}
            onClick={Goback}
          />
          <h4>마이페이지</h4>
          <h4 style={{ visibility: "hidden" }}>dd</h4>
        </div>
        <StyledHr width="99vw" height="0.5px" color="lightgray" />
      </div>
      <FlexBox MainContent style={{ marginTop: "0" }}>
        <div style={{ width: "80vw" }}>
          <Box
            justify="center"
            align="center"
            margin={{ top: "50px", bottom: "20px" }}
          >
            <StyledCardArtistImg
              src={checkProfile()}
              margin="5px"
            ></StyledCardArtistImg>
          </Box>

          <div style={{ textAlign: "end" }}>
            {user.userRole === "ROLE_ARTIST" ? (
              <Link
                to={`/artistDetail/${user.artistId}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Button
                  style={{
                    padding: "0px 15px",
                    borderRadius: "16px",
                    backgroundColor: "rgba(259,209,0,0.7)",
                    margin: "0px",
                  }}
                >
                  <StyledText text="내 작가페이지" />
                </Button>
              </Link>
            ) : (
              ""
            )}
          </div>
          <FlexBox Row_SB>
            <h4>프로필 정보</h4>
          </FlexBox>
          <FlexBox
            Column_SA
            style={{ height: "300px", alignItems: "flex-start" }}
          >
            <Box direction="row" justify="between" width="80vw" align="center">
              <h5 style={{ margin: "0" }}>이름</h5>
              <div style={styledp}>{user.userName}</div>
            </Box>
            <Box direction="row" justify="between" width="80vw" align="center">
              <h5 style={{ margin: "0" }}>Role</h5>
              <FlexBox Row_SB>
                <div style={styledp}>{CheckRole()}</div>
                {user.userRole === "ROLE_USER" ? (
                  <Button
                    XsmallBlack
                    onClick={(e) => Navigate("/signupArtist")}
                  >
                    작가로 전환
                  </Button>
                ) : null}
              </FlexBox>
            </Box>
            <Box direction="row" justify="between" width="80vw" align="center">
              <h5 style={{ margin: "0" }}>닉네임</h5>
              <div style={styledp}>{user.userNickname}</div>
            </Box>
            <Box direction="row" justify="between" width="80vw" align="center">
              <h5 style={{ margin: "0" }}>전화번호</h5>
              <div style={styledp}>{user.userTel}</div>
            </Box>
            <Box direction="row" justify="between" width="80vw" align="center">
              <h5 style={{ margin: "0" }}>생년월일 / 성별</h5>
              <div style={styledp}>
                {user.userBirthday} / {user.userGender === "M" ? "남" : "여"}
              </div>
            </Box>
            <div style={{ marginBottom: "3px" }}>
              <h5 style={{ margin: "0px", marginBottom: "8px" }}>주소</h5>
              <div style={styledp}>{user.userAddr}</div>
            </div>
          </FlexBox>
          <div>
            <h5 style={{ marginBottom: "3px" }}>태그</h5>
            <FlexBox Row_S style={{ flexWrap: "wrap", padding: "6px 0px" }}>
              {taglist.map((item, idx) => (
                <Button
                  key={idx}
                  TagYellow
                  style={{
                    margin: "6px 3px ",
                    flex: "1 1 20%",
                    wordWrap: "break-word",
                    maxWidth: "25%",
                    padding: "5px 3px",
                  }}
                >
                  # {item.name}
                </Button>
              ))}
              <Link to="/updateTag" style={{ marginLeft: "20px" }}>
                <img src={Plus} alt="태그 수정" />
              </Link>
            </FlexBox>
            <FlexBox Row_E>
              <FlexBox Row_SA style={{ width: "80px" }}>
                <p
                  style={{ fontSize: "13px", color: "gray", textAlign: "end" }}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  로그아웃
                </p>
              </FlexBox>
              <AlertDialog
                open={open}
                handleClose={handleClose}
                handleAction={deleteConfirm}
                title="로그아웃"
                desc="로그아웃 하시겠습니까?"
                cancel="취소"
                accept="로그아웃"
              />
            </FlexBox>
          </div>
        </div>
        <br />
        <br />
      </FlexBox>
    </div>
  );
}
