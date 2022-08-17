import styled from "styled-components";
import { HalfProductCard } from "../components/HalfProductCard";

const ProductTable = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 88vw;
`;

export function ArtistDetailProductClosedTable({ list }) {
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
          <div key={idx}>

            <HalfProductCard product={product} />
          </div>
        ) : <div></div>}
      </ProductTable>
    </div>
  );
}
