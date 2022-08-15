import { useEffect, useState } from "react";
import styled from "styled-components";
import { HalfProductCard } from "../components/HalfProductCard";
import { getProductByArtistId } from "../utils/api";

const ProductTable = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 88vw;

`;



export function ArtistDetailProductOngoingTable({ artist }) {
    const [loading, setloading] = useState(true);
    useEffect(() => {
        getProductByArtistId(artist.artistId, "0", "20", "", (res) => {
            console.log(res);
            setloading(false);
        }, (err) => {
            console.log(err);
        })
    }, [loading])
    return (
        <div style={{ "display": "flex", "justifyContent": "center", borderBottom: "1px solid #ebebeb", paddingBottom: "20px", }}>
            <ProductTable>
                {/* <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard />
                <ProductCard /> */}
            </ProductTable>
        </div>
    );
}