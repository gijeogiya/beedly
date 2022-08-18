import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ArtistDetailBar } from "../components/ArtistDetailBar";
import { ArtistDetailCard } from "../components/ArtistDetailCard";
import { ArtistDetailProductOngoingTable } from "../components/ArtistDetailProductOngoingTable";
import { ArtistDetailProductClosedTable } from "../components/ArtistDetailProductClosedTable";
import { HalfProductCard } from "../components/HalfProductCard";
import { useParams } from "react-router-dom";
import LikeIcon from "../assets/images/like.png";
import { useNavigate } from "react-router-dom";
import BackButtonImage from "../assets/images/backButton.png";
import { useSelector } from "react-redux";
import { FlexBox, Input } from "../components/UserStyled";
import Button from "../components/Button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "../assets/img/EditIcon.svg";
import CameraIcon from "../assets/img/CameraIcon.svg";
import { addFavoriteArtistApi, artistDetailApi, deleteFavoriteArtistApi, getStandByProductByArtist, getSuccessProductByArtist, UpdateBgImgApi, UpdateDescApi, UpdateProfileImgApi } from "../utils/apis/ArtistAPI";
const BarWarp = styled.div`
  padding: 8px 24px 8px 10px;
  border-bottom: 1px solid #ebebeb;
  display: flex;
  justify-content: space-between;
`;

const BackButton = styled.button`
  background: none;
  font-size: 12px;
  font-family: Noto Sans KR, sans-serif;
  border: 0px;
  width: 10vw;
`;
const StyledTableTitle = styled.div`
  font-size: 16px;
  color: #1f1d1d;
  padding-top: 20px;
  padding-left: 20px;
  font-weight: 700;
`;
const ArtistDetailBackgroundImg = styled.img`
  object-fit: cover;
  width: 100%;
  height: 200px;
`;

const ArtistDetailMainInf = styled.div`
  display: flex;
  position: absolute;
  padding: 164px 0 0 24px;
`;

const StyledCardArtistImgFrame = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 3px;
  padding-top: 5px;
  padding-bottom: 3px;
  padding-right: 3px;
`;

const StyledCardArtistImg = styled.img`
  width: 23vw;
  height: 23vw;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid white;
`;

const ArtistDetailSubInf = styled.div`
  padding: 64px 0 0 26px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
export default function ArtistDetailPage() {
  const navigate = useNavigate("");
  const { artistId } = useParams();
  const [artistProfileImg, setArtistProfileImg] = useState("");
  const [artistBgImg, setArtistBgImg] = useState("");
  const [favoriteCount, setFavoriteCount] = useState("");
  const [favoriteId, setFavoriteId] = useState("");
  const [isMyFavorite, setIsMyFavorite] = useState();
  const [userId, setUserID] = useState();
  const [userNickname, setUserNickname] = useState();
  const [artistDesc, setArtistDesc] = useState();
  const [loading, setloading] = useState(true);
  const User = useSelector((state) => state.user.user.user);
  const [WantUpdateDesc, setWantUpdateDesc] = useState(false);
  const [UpdateDesc, setUpdateDesc] = useState();

  const [standByProductList, setStandByProductList] = useState();
  const [successProductList, setSuccessProductList] = useState();
  const goBack = () => {
    navigate(-1);
  };

  const getInfo = () => {
    artistDetailApi(
      artistId,
      (res) => {
        console.log(res);
        setArtistProfileImg(res.data.artistProfileImg);
        setFavoriteCount(res.data.favoriteCount);
        setFavoriteId(res.data.favoriteId);
        setIsMyFavorite(res.data.isMyFavorite);
        setUserID(res.data.userId);
        setUserNickname(res.data.userNickname);
        setArtistDesc(res.data.artistDesc);
        setArtistBgImg(res.data.artistBgImg);
        setUpdateDesc(res.data.artistDesc);
        setloading(false);
      },
      (err) => {
        console.log(err);
      }
    );
  };
  const addFavoriteArtist = (e) => {
    //만약 현재 보고있는 user가 동일한 사람이라면
    if (userId === User.userId) {
      console.log("나야");
    } else {
      if (isMyFavorite) {
        deleteFavoriteArtistApi(
          favoriteId,
          (res) => {
            console.log(res);
            getInfo();
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        addFavoriteArtistApi(
          artistId,
          (res) => {
            console.log(res);
            getInfo();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    }
  };
  const WantUpdateProfile = (e) => {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    UpdateProfileImgApi(
      formData,
      (res) => {
        console.log(res);
        getInfo();
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const WantUpdateBgImg = (e) => {
    console.log(e.target.files[0]);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    UpdateBgImgApi(
      formData,
      (res) => {
        console.log(res);
        getInfo();
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const SendUpdateDesc = () => {
    const data = { desc: UpdateDesc };
    UpdateDescApi(
      data,
      (res) => {
        console.log(res);
        setWantUpdateDesc(false);
        getInfo();
      },
      (err) => {
        console.log(err);
      }
    );
  };
  useEffect(() => {
    if (User === undefined) {
      navigate(`/login`);
    }
    if (loading) {
      artistDetailApi(
        artistId,
        (res) => {
          console.log(res);
          setArtistProfileImg(res.data.artistProfileImg);
          setFavoriteCount(res.data.favoriteCount);
          setFavoriteId(res.data.favoriteId);
          setIsMyFavorite(res.data.isMyFavorite);
          setUserID(res.data.userId);
          setUserNickname(res.data.userNickname);
          setArtistDesc(res.data.artistDesc);
          setArtistBgImg(res.data.artistBgImg);
          setUpdateDesc(res.data.artistDesc);
        },
        (err) => {
          console.log(err);
        }
      )

      getStandByProductByArtist(artistId, (res) => {
        setStandByProductList(res.data.content);
        console.log(res);
      }, (err) => {
        console.log(err);
      })


      getSuccessProductByArtist(artistId, (res) => {
        setSuccessProductList(res.data.content);
        console.log(res);
      }, (err) => {
        console.log(err);
      })
      setloading(false);

    }
  }, [loading]);
  return (
    <div>

      <div>
        {/* Bar부분 */}
        <BarWarp>
          <BackButton onClick={goBack}>
            <img src={BackButtonImage} />
          </BackButton>
          <button
            onClick={(e) => addFavoriteArtist(e)}
            style={{ border: "0", backgroundColor: "white" }}
          >
            <FlexBox Row_SB style={{ width: "40px" }}>

              {isMyFavorite ? <FavoriteIcon style={{ color: "red" }} /> : <FavoriteBorderIcon />}
              <div>{favoriteCount}</div>
            </FlexBox>
          </button>
        </BarWarp>
        <div
          style={{
            borderBottom: "1px solid #ebebeb",
            paddingBottom: "20px",
          }}
        >
          <ArtistDetailMainInf>
            <StyledCardArtistImgFrame>
              <StyledCardArtistImg src={artistProfileImg} />
              {userId === User.userId ? (
                <div
                  style={{
                    position: "absolute",
                    width: "30px",
                    height: "30px",
                    paddingLeft: "65px",
                    paddingTop: "60px",
                  }}
                >
                  <label htmlFor="image">
                    <img src={CameraIcon} alt="프로필 편집" />
                  </label>
                  <input
                    id="image"
                    type="file"
                    accept="image/jpg,image/png,image/jpeg,image/gif"
                    onChange={(e) => WantUpdateProfile(e)}
                    style={{
                      display: "none",
                    }}
                  />
                </div>
              ) : (
                <div style={{ display: "none" }}></div>
              )}
            </StyledCardArtistImgFrame>
            <FlexBox Row_SB style={{ minWidth: "65vw" }}>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  padding: "46px 0 0 14px",
                }}
              >
                {userNickname}
              </div>
            </FlexBox>
          </ArtistDetailMainInf>
          <div>
            {userId === User.userId ? (
              <div
                style={{
                  position: "absolute",
                  paddingLeft: "90%",
                  paddingTop: "35%",
                }}
              >
                <label htmlFor="bgimage">
                  <img src={CameraIcon} alt="배경이미지 편집" /> :{" "}
                  <div style={{ display: "none" }}></div>
                </label>
                <input
                  id="bgimage"
                  type="file"
                  accept="image/jpg,image/png,image/jpeg,image/gif"
                  onChange={(e) => WantUpdateBgImg(e)}
                  style={{
                    display: "none",
                  }}
                />
              </div>
            ) : (
              <div style={{ display: "none" }}></div>
            )}
            <ArtistDetailBackgroundImg src={artistBgImg} />
          </div>
          <ArtistDetailSubInf>
            {WantUpdateDesc ? (
              <textarea
                onChange={(e) => {
                  setUpdateDesc(e.target.value);
                }}
                value={UpdateDesc}
                style={{
                  marginRight: "10px",
                  minHeight: "6vh",
                  minWidth: "65vw",
                  border: "2px solid black",
                  padding: "10px",
                }}
              />
            ) : (
              <div
                style={{
                  maxWidth: "300px",
                  fontSize: "14px",
                  padding: "10px",
                }}
              >
                {artistDesc}
              </div>
            )}

            <FlexBox MainContent2>
              {userId === User.userId && !WantUpdateDesc ? (
                <img
                  src={EditIcon}
                  alt="자기소개 편집"
                  style={{ width: "18px", height: "18px" }}
                  onClick={(e) => setWantUpdateDesc(true)}
                />
              ) : (
                <div style={{ display: "none" }}></div>
              )}
              {WantUpdateDesc ? (
                <FlexBox
                  style={{
                    flexDirection: "column",
                    fontSize: "12px",
                    fontWeight: "bold",
                    minWidth: "55px",
                  }}
                >
                  <Button XsmallBlack onClick={(e) => SendUpdateDesc()}>
                    저장
                  </Button>
                  <Button
                    XsmallBlack
                    onClick={(e) => {
                      setWantUpdateDesc(false);
                      setUpdateDesc(artistDesc);
                    }}
                  >
                    취소
                  </Button>
                </FlexBox>
              ) : (
                <div></div>
              )}
            </FlexBox>
          </ArtistDetailSubInf>
        </div>
        <StyledTableTitle>진행 중인 작품</StyledTableTitle>
        {!loading && <ArtistDetailProductOngoingTable list={standByProductList} />}

        <StyledTableTitle>경매가 종료된 작품</StyledTableTitle>
        {!loading && <ArtistDetailProductClosedTable list={successProductList} />}

      </div>
    </div>
  );
}
