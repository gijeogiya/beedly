import { Box } from "grommet";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { CategoryBar } from "../components/MainCategoryBar";
import styled from "styled-components";
import { HorizonScrollRowTable } from "../components/HorizonScrollTable";
import { SortButtonArea } from "../components/SortButtonArea";
import { HalfProductCard } from "../components/HalfProductCard";
import { Bold } from "grommet-icons";
import SortIcon from "../assets/img/SortIcon.svg";
import { getOnairByCategoryApi, getProductByCategoryApi } from "../utils/apis/PersonalProductAPI";

const SortButton = styled.button`
  border: 0;
  background-color: white;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-weight: 700;
`;

const SortImg = styled.img`
  width: 13px;
  padding-left: 3px;
  padding-top: 2px;
`;

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
  justify-content: center;
  display: flex;
`;

export default function ProductListPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [onairList, setOnairList] = useState([]);
  const [newProductList, setNewProductList] = useState([]);
  const [popularProductList, setPopularProductList] = useState([]);
  const [loading, setloading] = useState(true);
  const [sortMethod, setSortMethod] = useState(["인기순"]);

  const [size, setSize] = useState({});
  const gottenCategory = location.state
    ? location.state.gottenCategory
    : "회화";
  const [nowCategory, setNowCategory] = useState(gottenCategory);
  const GoProductDetail = (id) => {
    navigate(`/productDetail/${id}`);
  };

  const HandleSortButton = () => {
    setloading(true);
    sortMethod === "인기순"
      ? setSortMethod((prev) => (prev = "최신순"))
      : setSortMethod((prev) => (prev = "인기순"))
  };

  useEffect(() => {
    if (loading) {
      //카테고리별 온에어 가져오기
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

      //카테고리별 신규 작품 목록 가져오기(최신순)
      getProductByCategoryApi(
        nowCategory,
        "0",
        "20",
        "createdDate,DESC",
        (res) => {
          console.log(res);
          setNewProductList(res.data.content);
        },
        (err) => {
          console.log(err);
        }
      );

      //카테고리별 신규 작품 목록 가져오기(인기순/최신순)
      getProductByCategoryApi(
        nowCategory,
        "0",
        "20",
        sortMethod === "인기순" ? "favoriteCount,DESC" : "createdDate,DESC",
        (res) => {
          console.log(res);
          setPopularProductList(res.data.content);
        },
        (err) => {
          console.log(err);
        }
      );

      setloading(false);
    }
    return () => setloading(false);
    // eslint-disable-next-line
  }, [nowCategory, onairList, sortMethod]);

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
        <StyledTableSubtitle>낙찰 전 개인 작품</StyledTableSubtitle>
        <div
          style={{
            width: "95vw",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingTop: "10px",
          }}
        >
          <SortButton
            onClick={(e) =>
              HandleSortButton()
            }
          >
            <div>{sortMethod}</div>
            <SortImg src={SortIcon} />
          </SortButton>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "0 5vw",
          }}
        >
          <ProductTable>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "95vw",
              }}
            >
              {popularProductList.map((product, idx) => (
                <div
                  key={idx}
                  onClick={(e) => GoProductDetail(product.id)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    padding: "2.5vw",
                  }}
                >
                  <HalfProductCard product={product} />
                </div>
              ))}
            </div>
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
