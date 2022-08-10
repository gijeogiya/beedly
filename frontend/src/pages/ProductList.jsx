import { Box } from "grommet";
import React from "react";
import { Link } from "react-router-dom";

export default function ProductListPage() {
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
        <Link to="/productDetail/40">40번 작품</Link>
      </button>
    </Box>
  );
}
