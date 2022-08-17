import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HalfProductCard } from "../components/HalfProductCard";
import { FlexBox } from "./UserStyled";

const ProductTable = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 92vw;
`;

export function ArtistDetailProductOngoingTable({ list }) {
  const Navigate = useNavigate();
  const [productList, setProductList] = useState("");

  const goProductDetail = (id) => {
    Navigate(`/productDetail/${id}`)
  }
  console.log(list)
  useEffect(() => {
    setProductList(list);
    console.log(typeof (list));
    console.log(!list);
  }, [list])
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
        {list !== undefined && list.length === 0 && <h5 style={{ width: "100vw", textAlign: "center" }}>진행중인 작품이 없습니다.</h5>}
        {list !== undefined ? list.map((product, idx) =>
          <div>
            <div key={idx} onClick={() => goProductDetail(product.id)} style={{ padding: "10px 5px" }}>
              <HalfProductCard product={product} />
            </div>
          </div>
        ) : <h4></h4>}
      </ProductTable>
    </div>
  );
}
