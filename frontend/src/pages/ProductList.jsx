import { Box } from "grommet";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { CategoryBar } from "../components/MainCategoryBar";
import styled from "styled-components";
import { HorizonScrollRowTable } from "../components/HorizonScrollTable";
import { SortButtonArea } from "../components/SortButtonArea";
import { HalfProductCard } from "../components/HalfProductCard";
import { getOnairByCategoryApi, getPersonalProductListApi } from "../utils/api";
import { Bold } from "grommet-icons";

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

const StyledCategoryTable = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  border-bottom: 2px solid #ebebeb;
`;

const StyledCategoryButton = styled.button`
  display: inline;
  padding: 0 10px;
  justify-content: center;
  font-size: 16px;
  border: 0;
  background-color: white;
  font-weight: ${(props) => (props.isActive ? "bold" : "0" || "0")};
`;
const ProductTable = styled.div`
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
`;

export default function ProductListPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [onairList, setOnairList] = useState([]);
  const [newProductList, setNewProductList] = useState([]);
  const [loading, setloading] = useState(true);

  const [size, setSize] = useState({});
  const [nowCategory, setNowCategory] = useState([]);

  useEffect(() => {
    const gottenCategory =
      location.state === null ? null : location.state.gottenCategory;
    if (loading) {
      // if(gottenCategory !== undefined) setNowCategory(prev => prev = gottenCategory);
      // 진행중인 경매
      getOnairByCategoryApi(
        nowCategory,
        "0",
        "20",
        "",
        (res) => {
          console.log(res);
          setOnairList(res.data.content);
        },
        (err) => {
          console.log(err);
        }
      );

      //신규 작품 목록 가져오기
      getPersonalProductListApi(
        "0",
        "20",
        "createdDate,DESC",
        (res) => {
          setNewProductList(res.data.content);
          console.log(res.data);
        },
        (err) => {
          console.log(err);
        }
      );
      setloading(false);
    }
    return () => setloading(false);
    // eslint-disable-next-line
  }, [nowCategory, onairList]);

  // useEffect(() => {
  //   setNowCategory(gottenCategory);
  //   // 진행중인 경매
  //   getOnairByCategoryApi(NowCategory, "0", "20", "", (res) => {
  //     console.log(res);
  //     setOnairList(res.data.content);
  //   }, (err) => {
  //     console.log(err);
  //   })

  //   //신규 작품 목록 가져오기
  //   getPersonalProductListApi("0", "20", "createdDate,DESC", (res) => {
  //     setNewProductList(res.data.content);
  //     console.log(res.data);
  //   }, (err) => {
  //     console.log(err);
  //   })
  // },
  // [NowCategory]
  // )

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
    <div>
      <nav>
        <StyledCategoryTable>
          <StyledCategoryButton
            onClick={() => {
              setloading(true);
              setNowCategory((prev) => (prev = "회화"));
            }}
            isActive={nowCategory === "회화"}
          >
            회화
          </StyledCategoryButton>
          <StyledCategoryButton
            onClick={() => {
              setloading(true);
              setNowCategory((prev) => (prev = "판화"));
            }}
            isActive={nowCategory === "판화"}
          >
            판화
          </StyledCategoryButton>
          <StyledCategoryButton
            onClick={() => {
              setloading(true);
              setNowCategory((prev) => (prev = "에디션"));
            }}
            isActive={nowCategory === "에디션"}
          >
            에디션
          </StyledCategoryButton>
          <StyledCategoryButton
            onClick={() => {
              setloading(true);
              setNowCategory((prev) => (prev = "사진"));
            }}
            isActive={nowCategory === "사진"}
          >
            사진
          </StyledCategoryButton>
          <StyledCategoryButton
            onClick={() => {
              setloading(true);
              setNowCategory((prev) => (prev = "입체"));
            }}
            isActive={nowCategory === "입체"}
          >
            입체
          </StyledCategoryButton>
        </StyledCategoryTable>
      </nav>
      <div
        style={{
          borderBottom: "1px solid #ebebeb",
          padding: "20px 0",
        }}
      >
        <StyledTableTitle>On Air</StyledTableTitle>
        <StyledTableSubtitle>지금 진행중인 개인경매</StyledTableSubtitle>
        <HorizonScrollRowTable list={onairList} />
      </div>
      <div
        style={{
          borderBottom: "2px solid #ebebeb",
          padding: "20px 0",
        }}
      >
        <StyledTableTitle>New In</StyledTableTitle>
        <StyledTableSubtitle>신규 등록 작품</StyledTableSubtitle>
        <HorizonScrollRowTable list={newProductList} />
      </div>
      <div
        style={{
          borderBottom: "2px solid #ebebeb",
          padding: "20px 0",
        }}
      >
        <StyledTableTitle>Products</StyledTableTitle>
        <StyledTableSubtitle>개인 경매 예정 작품</StyledTableSubtitle>
        <SortButtonArea />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "0 5vw",
          }}
        >
          <ProductTable>
            {/* <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/> */}
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
