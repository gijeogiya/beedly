import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ArtistDetailBar } from "../components/ArtistDetailBar";
import { ArtistDetailCard } from "../components/ArtistDetailCard";
import { ArtistDetailProductOngoingTable } from "../components/ArtistDetailProductOngoingTable";
import { ArtistDetailProductClosedTable } from "../components/ArtistDetailProductClosedTable";
import { ProductCard } from "../components/ProductCard";
import { artistDetailApi } from "../utils/api";
import { useParams } from "react-router-dom";

const StyledTableTitle = styled.div`
  font-size: 16px;
  color: #1f1d1d;
  padding-top: 20px;
  padding-left: 20px;
  font-weight: 700;
`;

export default function ArtistDetailPage() {
    const { artistId } = useParams();
    const [artistInfo, setArtistInfo] = useState();
    console.log(artistId);
    useEffect(() => {
        artistDetailApi(artistId, (res) => {
            setArtistInfo(res.data);
        }, (err) => {
            console.log(err);
        })
    }, [])
    return (
        <div>
            <ArtistDetailBar artist={artistInfo} />
            <ArtistDetailCard artist={artistInfo} />
            <StyledTableTitle>진행 중인 작품</StyledTableTitle>
            <ArtistDetailProductOngoingTable artist={artistInfo} />
            <StyledTableTitle>경매가 종료된 작품</StyledTableTitle>
            <ArtistDetailProductClosedTable artist={artistInfo} />
        </div>


    )
}