import { Box } from "grommet";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function ProductListPage() {
  const navigate = useNavigate();

  const purchaseTest = () => {
    navigate(`/purchase/27`, {
      state: {
        auctionType: "P",
        // soldId: 27,
        productId: 74,
      },
    });
  };
  return (
    <Box margin="small">
      ProductListPage
      <button>
        <Link to="/productRegister">상시경매 작품 등록화면</Link>
      </button>
      <button>
        <Link to="/specialAuction">기획전 경매 게시글 등록화면</Link>
      </button>
      <button>
        <Link to="/specialProduct">기획전 경매 상품 등록화면</Link>
      </button>
      <button>
        <Link to="/productDetail/81">81번 작품</Link>
      </button>
      <button>
        <Link to="/specialAuctionDetail/17">17번 기획전 게시글</Link>
      </button>
      <button onClick={purchaseTest}>27번 결제</button>
    </Box>
  );
}
