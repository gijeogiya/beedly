import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { CategoryBar } from "../components/MainCategoryBar";
import { BannerTable } from "../components/MainBanner";
import {
  HorizonScrollRowTable,
  HorizonScrollColTable,
} from "../components/HorizonScrollTable";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StyledText } from "../components/Common";
import user from "../stores/modules/user";
import { getUserInfoApi } from "../utils/apis/UserAPI";
import { getArtistApi } from "../utils/apis/ArtistAPI";
import { getRecommendationProductApi } from "../utils/apis/UserRecommendationAPI";
import { Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import {
  getOnairApi,
  getPersonalProductListApi,
  getProductListBySizeApi,
} from "../utils/apis/PersonalProductAPI";
import SubBanner1 from "../assets/img/SubBanner1.png";
import SubBanner2 from "../assets/img/SubBanner2.png";
import { Tag } from "grommet";

const StyledTableTitle = styled.div`
  font-size: 16px;
  color: #1f1d1d;
  padding-left: 20px;
  font-weight: 900;
`;

const StyledTableSubtitle = styled.div`
  font-size: 14px;
  padding-left: 20px;
  font-weight: 500;
  color: rgba(31, 29, 29, 0.4);
`;

const StyledCategoryTable = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
`;

const StyledCategoryButton = styled.button`
  display: inline;
  padding: 0 10px;
  justify-content: center;
  font-size: 16px;
  border: 0;
  background-color: white;
`;

const SubBanner = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

export default function MainPage() {
  const [loading, setloading] = useState(true);
  const [OnairList, setOnairList] = useState([]);
  const [ArtistList, setArtistList] = useState([]);
  const [ArtForYouList, setArtForYouList] = useState([]);
  const [NewProductList, setNewProductList] = useState([]);
  const [SizeProductList, setSizeProductList] = useState([]);
  const [user, setUser] = useState({
    userName: "",
    userRole: "",
    userEmail: "",
  });
  const User = useSelector((state) => state.user.user.user);
  // console.log("User :: ", User);
  const Navigate = useNavigate();
  const ProductSizeList = [
    {
      size: "small",
      description: "?????? ??? ????????? ????????? ??????",
      sizeName: "Mug",
    },
    {
      size: "medium",
      description: "?????? ?????? ???????????? ?????? ????????? ?????????",
      sizeName: "Small Wall",
    },
    {
      size: "large",
      description: "TV ?????? ????????? ????????? ????????? ????????? ?????????",
      sizeName: "TV",
    },
    {
      size: "xlarge",
      description: "????????? ?????? ????????? ????????????!",
      sizeName: "Big",
    },
  ];
  const [Size, setSize] = useState({});

  const goSearchTag = (keyword) => {
    const data = {
      searchCategory: "tag",
      keyword: keyword,
    };
    Navigate("/searchResult", { state: data });
  };

  useEffect(() => {
    if (loading) {
      if (User === undefined) {
        //????????? ??????
        // setUser(undefined);
      } else {
        getUserInfoApi(
          (res) => {
            setUser(res.data);
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
      }

      // ???????????? ??????
      getOnairApi(
        "0",
        "20",
        "",
        (res) => {
          console.log(res);
          setOnairList(res.data.content);
        },
        (err) => {
          console.log(err);
        }
      );

      // ?????? ?????? ????????????
      getArtistApi(
        "0",
        "20",
        "",
        (res) => {
          setArtistList(res.data.content);
        },
        (err) => {
          console.log(err);
        }
      );

      //Art for you ?????? ????????????
      getRecommendationProductApi(
        (res) => {
          setArtForYouList(res.data);
          console.log(res.data);
        },
        (err) => {
          console.log(err);
        }
      );

      //?????? ?????? ?????? ????????????
      getPersonalProductListApi(
        "0",
        "20",
        "createdDate,DESC",
        (res) => {
          setNewProductList(res.data.content);
          console.log(res.data);
        },
        (err) => {
          console.log(err);
        }
      );

      //????????? ???????????? ?????? ????????????
      setSize(ProductSizeList[Math.floor(Math.random() * 4)]);
      setloading(false);
    }
    // eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    console.log(Size);
    console.log(Size.size);
    if (Size !== null) {
      getProductListBySizeApi(
        Size.size,
        "0",
        "20",
        "",
        (res) => {
          console.log(res);
          if (res.data.content.length <= 3) {
            setSize(ProductSizeList[Math.floor(Math.random() * 4)]);
          }
          setSizeProductList(res.data.content);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }, [Size]);

  const goProductList = (category) => {
    Navigate("/productlist", { state: { gottenCategory: category } });
  };

  return (
    <div>
      <nav>
        <StyledCategoryTable>
          <StyledCategoryButton onClick={() => goProductList("??????")}>
            <StyledText text="??????" size="16px"/>
          </StyledCategoryButton>
          <StyledCategoryButton onClick={() => goProductList("??????")}>
            <StyledText text="??????" size="16px"/>
          </StyledCategoryButton>
          <StyledCategoryButton onClick={() => goProductList("?????????")}>
            <StyledText text="?????????" size="16px"/>
          </StyledCategoryButton>
          <StyledCategoryButton onClick={() => goProductList("??????")}>
            <StyledText text="??????" size="16px"/>
          </StyledCategoryButton>
          <StyledCategoryButton onClick={() => goProductList("??????")}>
            <StyledText text="??????" size="16px"/>
          </StyledCategoryButton>
        </StyledCategoryTable>
      </nav>
      <BannerTable />
      <div
        style={{
          borderBottom: "1px solid #ebebeb",
          paddingBottom: "20px",
          paddingTop: "20px",
        }}
      >
        <StyledTableTitle>On Air</StyledTableTitle>
        <StyledTableSubtitle>?????? ???????????? ????????????</StyledTableSubtitle>
        {/* ?????? ????????? ??? ??????? -> ???????????? ?????? */}
        <HorizonScrollRowTable list={OnairList} />
      </div>
      <div
        style={{
          // borderBottom: "1px solid #ebebeb",
          paddingBottom: "20px",
          paddingTop: "20px",
        }}
      >
        <StyledTableTitle>Today???s Artist</StyledTableTitle>
        <StyledTableSubtitle>????????? ????????????</StyledTableSubtitle>
        <HorizonScrollColTable list={ArtistList} />
      </div>
      <div
        style={{
          borderBottom: "1px solid #ebebeb",
          paddingBottom: "20px",
          paddingTop: "20px",
        }}
      >
        <SubBanner onClick={() => goSearchTag("?????????")}>
          <img src={SubBanner2} />
        </SubBanner>
        <StyledTableTitle style={{ paddingTop: "20px" }}>
          Art For You
        </StyledTableTitle>
        <StyledTableSubtitle>?????? ????????? ??????????</StyledTableSubtitle>
        <HorizonScrollRowTable list={ArtForYouList} />
      </div>
      <div
        style={{
          borderBottom: "1px solid #ebebeb",
          paddingBottom: "20px",
          paddingTop: "20px",
        }}
      >
        <StyledTableTitle>New In</StyledTableTitle>
        <StyledTableSubtitle>?????? ?????? ??????</StyledTableSubtitle>
        <HorizonScrollRowTable list={NewProductList} />
      </div>
      <SubBanner onClick={() => goSearchTag("?????????")}>
        <img src={SubBanner1} />
      </SubBanner>
      <div style={{ paddingBottom: "20px", paddingTop: "20px" }}>
        <StyledTableTitle>{Size.sizeName} Size</StyledTableTitle>
        <StyledTableSubtitle>{Size.description}</StyledTableSubtitle>
        <HorizonScrollRowTable list={SizeProductList} />
      </div>
      {User !== undefined && user.userRole !== "ROLE_USER" && (
        <Fab
          color="primary"
          aria-label="edit"
          style={{
            position: "fixed",
            bottom: "60px",
            right: "10px",
            display: "flex",
          }}
          onClick={() => Navigate("/productRegister")}
        >
          <EditIcon />
        </Fab>
      )}
    </div>
  );
}
