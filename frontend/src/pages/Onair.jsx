import styled from "styled-components";
import { Link } from "react-router-dom";
import { OnairPageCategoryBar } from "../components/OnairPageCategoryBar";
import { OnairPageTable } from "../components/OnairPageTable";
import React, { useEffect, useState } from "react";
import { getOnairApi } from "../utils/api";
import Button from "../components/Button";

const OnairPageTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
`;

export default function OnairPage() {
  const [loading, setloading] = useState(true);
  const [OnairList, setOnairList] = useState([]);

  useEffect(() => {
    if (loading) {
      // 진행중인 경매
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
      <OnairPageCategoryBar />
      <OnairPageTable list={OnairList} />

      {/* <Link to="/auctionSeller">
        <Button SmallGray>셀러</Button>
      </Link>
      <Link to="/auctionBuyer">
        <Button SmallGray>버이어</Button>
      </Link> */}
    </div>
  );
}
