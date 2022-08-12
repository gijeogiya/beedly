import React from "react";
import styled from "styled-components";
import { ArtistDetailBar } from "../components/ArtistDetailBar";
import { ArtistDetailCard } from "../components/ArtistDetailCard";
import { ArtistDetailProductOngoingTable } from "../components/ArtistDetailProductOngoingTable";
import { ArtistDetailProductClosedTable } from "../components/ArtistDetailProductClosedTable";
import { ProductCard } from "../components/ProductCard";

const StyledTableTitle = styled.div`
  font-size: 16px;
  color: #1f1d1d;
  padding-top: 20px;
  padding-left: 20px;
  font-weight: 700;
`;

export default function ArtistDetailPage() {
    return (
        <div>
            <ArtistDetailBar/>
            <ArtistDetailCard/>
            <StyledTableTitle>진행 중인 작품</StyledTableTitle>
            <ArtistDetailProductOngoingTable/>
            <StyledTableTitle>경매가 종료된 작품</StyledTableTitle>
            <ArtistDetailProductClosedTable/>
        </div>


    )
}