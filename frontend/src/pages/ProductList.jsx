import { Box } from "grommet";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CategoryBar } from "../components/MainCategoryBar";
import styled from "styled-components";
import { HorizonScrollRowTable } from "../components/HorizonScrollTable";
import { SortButtonArea } from "../components/SortButtonArea"
import { ProductCard } from '../components/ProductCard'
import { getOnairApi, getPersonalProductListApi } from "../utils/api";


const StyledTableTitle = styled.div`
  font-size: 16px;
  color: #1f1d1d;
  padding-left: 20px;
  font-weight: 900;
`;

const StyledTableSubtitle = styled.div`
  font-size: 14px;
  padding-left: 20px;
  font-weight: 500;
  color: rgba(31, 29, 29, 0.4);
  `;


export default function ProductListPage() {
  const navigate = useNavigate();
  const [OnairList, setOnairList] = useState([]);
  const [NewProductList, setNewProductList] = useState([]);
  const [loading, setloading] = useState(true);

  const [Size, setSize] = useState({});
  useEffect(() => {
    if (loading) {

      // 진행중인 경매
      getOnairApi("0", "20", "", (res) => {
        console.log(res);
        setOnairList(res.data.content);
      }, (err) => {
        console.log(err);
      })

      //신규 작품 목록 가져오기
      getPersonalProductListApi("0", "20", "createdDate,DESC", (res) => {
        setNewProductList(res.data.content);
        console.log(res.data);
      }, (err) => {
        console.log(err);
      })

      setloading(false);
    }
    // eslint-disable-next-line
  }, [loading]);

  const purchaseTest = () => {
    navigate(`/purchase/27`, {
      state: {
        auctionType: "P",
        // soldId: 27,
        productId: 74,
      },
    });
  };

  const ProductTable = styled.div`
      justify-content: space-between;
      display: flex;
      flex-wrap: wrap;
  `;  
  
  return (
    <div>
      <CategoryBar/>
      <div style={{
        borderBottom: "1px solid #ebebeb",
        padding: "20px 0",
      }}>
        <StyledTableTitle>On Air</StyledTableTitle>
        <StyledTableSubtitle>지금 진행중인 개인경매</StyledTableSubtitle>
        <HorizonScrollRowTable list={OnairList} />
      </div>
      <div
        style={{
          borderBottom: "2px solid #ebebeb",
          padding: "20px 0",
        }}>
        <StyledTableTitle>New In</StyledTableTitle>
        <StyledTableSubtitle>신규 등록 작품</StyledTableSubtitle>
        <HorizonScrollRowTable list={NewProductList} />
      </div>
      <div
        style={{
          borderBottom: "2px solid #ebebeb",
          padding: "20px 0",
        }}>
        <StyledTableTitle>Products</StyledTableTitle>
        <StyledTableSubtitle>개인 경매 예정 작품</StyledTableSubtitle>
        <SortButtonArea/>
          <div style={{display:"flex", justifyContent:"center", padding: "0 5vw"}}>
            <ProductTable>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
            </ProductTable>
          </div>
      </div>
      
    </div>
    // <Box margin="small">
    //   ProductListPage
    //   <button>
    //     <Link to="/productRegister">상시경매 작품 등록화면</Link>
    //   </button>
    //   <button>
    //     <Link to="/specialAuction">기획전 경매 게시글 등록화면</Link>
    //   </button>
    //   <button>
    //     <Link to="/specialProduct">기획전 경매 상품 등록화면</Link>
    //   </button>
    //   <button>
    //     <Link to="/productDetail/39">39번 작품</Link>
    //   </button>
    //   <button onClick={purchaseTest}>27번 결제</button>
    // </Box>
  );
}
