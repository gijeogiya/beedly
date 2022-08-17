import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HalfProductCard } from "../components/HalfProductCard";

const ProductTable = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 92vw;
`;

export function ArtistDetailProductOngoingTable({ list }) {
  const Navigate = useNavigate();
  const goProductDetail = (id) => {
    Navigate(`/productDetail/${id}`)
  }
  console.log(list)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        borderBottom: "1px solid #ebebeb",
        paddingBottom: "20px",
      }}
    >
      <ProductTable>
        {list !== undefined ? list.map((product, idx) =>
          <div key={idx} onClick={() => goProductDetail(product.id)} style={{ padding: "10px 5px" }}>

            <HalfProductCard product={product} />
          </div>
        ) : <div></div>}
      </ProductTable>
    </div>
  );
}
