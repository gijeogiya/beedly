import React, { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import styled from "styled-components";
import Button from "./Button";
import CloseButton from "../assets/images/close.png";
import { StyledHr, StyledText } from "./Common";
import { useEffect } from "react";
import { Box, Pagination, Spinner } from "grommet";
import { Outlet, Route, Routes } from "react-router-dom";
import { Search } from "grommet-icons";
import { ProductRegister } from "../pages/ProductRegister";
import { getBoard } from "../utils/apis/BoardApi";
const HeaderDiv = styled.div`
  margin: 5px;
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

const HeaderBox = ({ goBack, boardType }) => {
  return (
    <HeaderDiv>
      <div style={{ width: "10vw" }}></div>
      <StyledText
        size="20px"
        weight="bold"
        text={boardType === "FAQ" ? "FAQ" : "공지사항"}
      />
      <BackButton onClick={goBack}>
        <img src={CloseButton} />
      </BackButton>
    </HeaderDiv>
  );
};

export const Notice = ({ boardType, open, onDismiss }) => {
  const [notices, setNotices] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [currentNotice, setCurrentNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  useEffect(() => {
    getBoard(
      boardType,
      (response) => {
        console.log(response);
        setNotices(response.data);
        setLoading(false);
      },
      (fail) => {
        console.log(fail);
      }
    );
    return () => {
      setLoading(false);
    };
    // let temp = [
    //   {
    //     title: "[공지] 거래 중지 작가 안내",
    //     text: "거래 중지 작가들은 거래가 중지된 작가입니다. 거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.",
    //   },
    //   {
    //     title: "[공지] 7월 3째주 정기 경매 상품 등록 안내",
    //     text: "거래 중지 작가들은 거래가 중지된 작가입니다. 거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.",
    //   },
    //   {
    //     title: "[공지] 거래 중지 작가 안내",
    //     text: "거래 중지 작가들은 거래가 중지된 작가입니다. 거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.",
    //   },
    //   {
    //     title: "[공지] 7월 2째주 이벤트 경매 결과 안내",
    //     text: "거래 중지 작가들은 거래가 중지된 작가입니다. 거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.",
    //   },
    //   {
    //     title: "[공지] 거래 중지 작가 안내",
    //     text: "거래 중지 작가들은 거래가 중지된 작가입니다. 거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.",
    //   },
    //   {
    //     title: "[공지] 거래 중지 작가 안내",
    //     text: "거래 중지 작가들은 거래가 중지된 작가입니다. 거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.",
    //   },
    //   {
    //     title: "[공지] 거래 중지 작가 안내",
    //     text: "거래 중지 작가들은 거래가 중지된 작가입니다. 거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.",
    //   },
    //   {
    //     title: "[긴급 공지] 7월 정기 점검 안내",
    //     text: "거래 중지 작가들은 거래가 중지된 작가입니다. 거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.",
    //   },
    //   {
    //     title: "[공지] 거래 중지 작가 안내",
    //     text: "거래 중지 작가들은 거래가 중지된 작가입니다. 거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.",
    //   },
    //   {
    //     title: "[공지] 거래 중지 작가 안내",
    //     text: "거래 중지 작가들은 거래가 중지된 작가입니다. 거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.거래 중지 작가들은 거래가 중지된 작가입니다.",
    //   },
    // ];
    // setNotices(temp);
  }, []);

  const handleNotice = (e, i) => {
    setCurrentNotice(i);
    setClicked(true);
  };
  if (loading) return <Spinner />;
  return (
    <BottomSheet
      open={open}
      onDismiss={() => {
        onDismiss();
        setClicked(false);
      }}
    >
      <HeaderBox
        goBack={() => {
          onDismiss();
          setClicked(false);
        }}
        boardType={boardType}
      />
      {clicked ? (
        <Box margin="15px" pad="10px" height="70vh">
          <StyledText
            style={{ align: "center" }}
            size="20px"
            weight="bold"
            // myArray.find(x => x.id === '45').foo;
            text={notices.find((n) => n.id === currentNotice).boardTitle}
          />
          <StyledHr width="100%" />
          <Box margin="medium">
            <div
              style={{
                whiteSpace: "pre-wrap",
                overflow: "scroll",
              }}
              dangerouslySetInnerHTML={{
                __html: notices.find((n) => n.id === currentNotice)
                  .boardContent,
              }}
            />
            {/* {notices.find((n) => n.id === currentNotice).boardContent} */}
          </Box>
          <Box direction="row" justify="center">
            <Button
              BigBlack
              children="목록으로 돌아가기"
              onClick={() => setClicked(false)}
            />
          </Box>
        </Box>
      ) : (
        <Box margin="15px" pad="10px" height="70vh">
          {notices !== [] &&
            notices.slice(offset, offset + limit).map((notice, i) => (
              <Box
                key={i}
                onClick={() => {
                  setClicked(true);
                  setCurrentNotice(notice.id);
                }}
              >
                <p>{notice.boardTitle}</p>
                <StyledHr width="100%" />
              </Box>
            ))}
          <Pagination
            style={{ bottom: 0, padding: "30px" }}
            step={limit}
            page={page}
            onChange={({ page }) => {
              setPage(page);
            }}
            setPage={setPage}
            alignSelf="center"
            margin="5px"
            numberItems={notices.length}
          />
        </Box>
      )}
    </BottomSheet>
  );
};
