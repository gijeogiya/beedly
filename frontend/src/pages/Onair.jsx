import styled from "styled-components";
import { Link } from "react-router-dom";
import { OnairPageCategoryBar } from "../components/OnairPageCategoryBar";
import { OnairPageTable } from "../components/OnairPageTable";
import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { getOnairApi, getOnairByCategoryApi } from "../utils/apis/PersonalProductAPI";

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
          현재 진행 중인 개인 경매
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
            ALL
          </StyledCategoryButton>
          <StyledCategoryButton
            onClick={() => {
              setloading(true);
              setNowCategory((prev) => (prev = "회화"));
            }}
            isActive={nowCategory === "회화"}
          >
            회화
          </StyledCategoryButton>
          <StyledCategoryButton
            onClick={() => {
              setloading(true);
              setNowCategory((prev) => (prev = "판화"));
            }}
            isActive={nowCategory === "판화"}
          >
            판화
          </StyledCategoryButton>
          <StyledCategoryButton
            onClick={() => {
              setloading(true);
              setNowCategory((prev) => (prev = "에디션"));
            }}
            isActive={nowCategory === "에디션"}
          >
            에디션
          </StyledCategoryButton>
          <StyledCategoryButton
            onClick={() => {
              setloading(true);
              setNowCategory((prev) => (prev = "사진"));
            }}
            isActive={nowCategory === "사진"}
          >
            사진
          </StyledCategoryButton>
          <StyledCategoryButton
            onClick={() => {
              setloading(true);
              setNowCategory((prev) => (prev = "입체"));
            }}
            isActive={nowCategory === "입체"}
          >
            입체
          </StyledCategoryButton>
        </StyledCategoryTable>
      </nav>
      <OnairPageTable list={OnairList} />
    </div>
  );
}
