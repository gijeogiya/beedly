import React, { useState } from "react";
import styled from "styled-components";
import { SearchBar } from "../components/SearchBar";
import { SizePickCard } from "../components/SizePickCard";
import {
  RecommendKeywordTable,
  RecentlyKeywordTable,
} from "../components/KeywordTable";
import { getProductListBySizeApi } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Spinner } from "grommet";
import SearchingIcon from "../assets/img/SearchingIcon.svg";
import XIcon from "../assets/img/XIcon.svg";
import { getSearchTagListAPI } from "../utils/apis/SearchTagAPI";

const StyledTableTitle = styled.div`
  font-size: 16px;
  color: #1f1d1d;
  padding-top: 20px;
  padding-left: 20px;
  font-weight: 900;
`;

const SizePickCardTable = styled.div`
  display: flex;
  justify-content: center;
`;

const SearchWarp = styled.div`
  padding: 12px 24px;
  border-bottom: 1px solid #ebebeb;
  display: flex;
`;

const SearchArea = styled.div`
  height: 40px;
  background-color: #f4f4f4;
  border-radius: 8px;
  display: flex;
  width: 90%;
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SearchTextInput = styled.input`
  padding: 0 40px 0 10px;
  height: 40px;
  outline: none;
  flex: 1;
  border: 0;
  background-color: #f4f4f4;
  border-radius: 8px;
  font-weight: 700;
  font-size: 15px;
  color: black;
`;
export default function SearchPage() {
  const Navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [RecommendSearchList, setRecommendSearchList] = useState([]);
  //searchCatefoy는 검색 방법 -> keyword / size
  const SearchBySize = (size) => {
    const data = {
      searchCategory: "size",
      keyword: size,
    };
    Navigate("/searchResult", { state: data });
  };
  useEffect(() => {
    if (loading) {
      //최근 검색어 리스트 가져오기]
      if (
        localStorage.getItem("SearchList") !== null &&
        localStorage.getItem("SearchList") !== undefined
      ) {
        setsearchList(JSON.parse(localStorage.getItem("SearchList")));
      }
      //추천 검색어 리스트 가져오기
      //인기많은 작가, 인기많은 작품, 모르겠다~
      getSearchTagListAPI((res) => {
        console.log(res);
        setRecommendSearchList(res.data);
      }, (err) => {
        console.log(err);
      })
      setloading(false);
    }
  }, [loading]);
  const [keyword, setKeyword] = useState("");
  const [searchList, setsearchList] = useState(
    JSON.parse(localStorage.getItem("SearchList"))
  );
  const handleChange = (e) => {
    console.log(keyword);
    setKeyword(e.target.value);
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    GoSearchResult();
  };
  const GoSearchResult = () => {
    const data = {
      searchCategory: "keyword",
      keyword: keyword,
    };
    Navigate("/searchResult", { state: data });
  };
  return (
    <div style={{ paddingBottom: "20px" }}>
      <SearchWarp>
        <SearchArea>
          <SearchForm onSubmit={HandleSubmit}>
            <img
              src={SearchingIcon}
              alt="Searching Icon"
              style={{ height: "20px", padding: "10px 0 10px 10px" }}
            />
            <SearchTextInput
              type="text"
              placeholder="작품명, 작가명 등"
              value={keyword}
              onChange={(e) => handleChange(e)}
            />
          </SearchForm>
        </SearchArea>
        <button
          style={{ border: "0", backgroundColor: "white", paddingLeft: "15px" }}
        >
          <img src={XIcon} style={{ width: "18px" }} />
        </button>
      </SearchWarp>
      <StyledTableTitle>최근 검색어</StyledTableTitle>
      <RecentlyKeywordTable list={searchList} />
      <StyledTableTitle>추천 검색어</StyledTableTitle>
      <RecommendKeywordTable list={RecommendSearchList} />
      <StyledTableTitle>Size Pick!</StyledTableTitle>
      <SizePickCardTable>
        <SizePickCard
          title={"Small Size"}
          size={"~70cm"}
          background_color={{ backgroundColor: "#EBF0F5" }}
          onClick={(e) => SearchBySize("small")}
        />
        <SizePickCard
          title={"Medium Size"}
          size={"70cm~90cm"}
          background_color={{ backgroundColor: "#F6EEED" }}
          onClick={(e) => SearchBySize("medium")}
        />
      </SizePickCardTable>
      <SizePickCardTable>
        <SizePickCard
          title={"Large Size"}
          size={"90cm~120cm"}
          background_color={{ backgroundColor: "#F1F1EA" }}
          onClick={(e) => SearchBySize("large")}
        />
        <SizePickCard
          title={"XLarge Size"}
          size={"120cm~"}
          background_color={{ backgroundColor: "#F5F5F5" }}
          onClick={(e) => SearchBySize("xlarge")}
        />
      </SizePickCardTable>
      <StyledTableTitle></StyledTableTitle>
    </div>
  );
}
