import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { OnairProductCard } from "../components/OnairProductCard";
import { SortButtonArea } from "../components/SortButtonArea";

const OnairProductCardTable = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 30px;
`;

export function OnairPageTable({ list }) {
  const Navigate = useNavigate("");
  const GoProductDetail = (id) => {
    Navigate(`/productDetail/${id}`);
  };
  return (
    <OnairProductCardTable>
      <SortButtonArea />
      {list.map((product, idx) => (
        <div
          className="card"
          key={idx}
          onClick={(e) => GoProductDetail(product.id)}
          value={product.id}
        >
          <OnairProductCard product={product} />
        </div>
      ))}
    </OnairProductCardTable>
  );
}
