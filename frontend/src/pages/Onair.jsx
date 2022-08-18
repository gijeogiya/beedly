import styled from "styled-components";
import { Link } from "react-router-dom";
import { OnairPageCategoryBar } from "../components/OnairPageCategoryBar";
import { OnairPageTable } from "../components/OnairPageTable";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { getOnairApi, getOnairByCategoryApi } from "../utils/apis/PersonalProductAPI";
import SortIcon from "../assets/img/SortIcon.svg";
import { StyledText } from "../components/Common";

const OnairPageTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

const StyledCategoryTable = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  border-bottom: 2px solid #ebebeb;
`;

const StyledCategoryButton = styled.button`
  display: inline;
  padding: 0 10px;
  justify-content: center;
  font-size: 16px;
  border: 0;
  background-color: white;
  font-weight: ${(props) => (props.isActive ? "bold" : "0" || "0")};
`;

const SortButton = styled.button`
  border: 0;
  background-color: white;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-weight: 700;
  padding-top: 4px;
`;

const SortImg = styled.img`
  width: 13px;
  padding-left: 3px;
  padding-top: 2px;
`;

export default function OnairPage() {
  const [loading, setloading] = useState(true);
  const [OnairList, setOnairList] = useState([]);
  const [nowCategory, setNowCategory] = useState('ALL');

  useEffect(() => {
    if (loading) {
      //카테고리별 온에어 가져오기
      if (nowCategory === 'ALL') {
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
      }
      else {
        getOnairByCategoryApi(
          nowCategory,
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
      }
      setloading(false);
    }
  }, [loading]);

  return (
    <div>
      <OnairPageTitle>
        <div style={{ fontSize: "18px", fontWeight: "700" }}>On Air</div>
        <div style={{ fontSize: "16px", color: "rgba(31, 29, 29, 0.4)" }}>
          현재 방송 중인 개인 경매
        </div>
      </OnairPageTitle>
      <nav>
        <StyledCategoryTable>
          <StyledCategoryButton
            onClick={() => {
              setloading(true);
              setNowCategory((prev) => (prev = "ALL"));
            }}
            isActive={nowCategory === "ALL"}
          >
            <StyledText text="ALL" size="16px" weight={nowCategory === "ALL" ? "bold" : "0"} />
          </StyledCategoryButton>
          <StyledCategoryButton
            onClick={() => {
              setloading(true);
              setNowCategory((prev) => (prev = "회화"));
            }}
            isActive={nowCategory === "회화"}
          >
            <StyledText text="회화" size="16px" weight={nowCategory === "회화" ? "bold" : "0"} />
          </StyledCategoryButton>
          <StyledCategoryButton
            onClick={() => {
              setloading(true);
              setNowCategory((prev) => (prev = "판화"));
            }}
            isActive={nowCategory === "판화"}
          >
            <StyledText text="판화" size="16px" weight={nowCategory === "판화" ? "bold" : "0"} />
          </StyledCategoryButton>
          <StyledCategoryButton
            onClick={() => {
              setloading(true);
              setNowCategory((prev) => (prev = "에디션"));
            }}
            isActive={nowCategory === "에디션"}
          >
            <StyledText text="에디션" size="16px" weight={nowCategory === "에디션" ? "bold" : "0"} />
          </StyledCategoryButton>
          <StyledCategoryButton
            onClick={() => {
              setloading(true);
              setNowCategory((prev) => (prev = "사진"));
            }}
            isActive={nowCategory === "사진"}
          >
            <StyledText text="사진" size="16px" weight={nowCategory === "사진" ? "bold" : "0"} />
          </StyledCategoryButton>
          <StyledCategoryButton
            onClick={() => {
              setloading(true);
              setNowCategory((prev) => (prev = "입체"));
            }}
            isActive={nowCategory === "입체"}
          >
            <StyledText text="입체" size="16px" weight={nowCategory === "입체" ? "bold" : "0"} />
          </StyledCategoryButton>
        </StyledCategoryTable>
      </nav>
      <div
        style={{
          width: "95vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          paddingTop: "10px",
        }}
      >
        <SortButton>
          <div>인기순</div>
          <SortImg src={SortIcon} />
        </SortButton>
      </div>
      <OnairPageTable list={OnairList} />
    </div>
  );
}
