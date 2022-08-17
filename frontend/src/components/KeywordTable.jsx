import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import XIcon from "../assets/img/XIcon.svg";

const RecentlyKeywordFrame = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 15px;
  &::-webkit-scrollbar {
    display: none;
  }

  .card {
    display: inline-block;
  }
`;

const RecentlyKeywordButton = styled.button`
  background-color: #ffffff;
  padding: 8px 3px 8px 8px;
  font-size: 14px;
  margin: 0px 8px 12px 0px;
  border: 1px solid #ebebeb;
  border-radius: 16px;
  display: flex;
`;

const RecentlyKeywordRemoveButton = styled.button`
  border: 0;
  background-color: #ffffff;
`;

const RecentlyKeywordRemoveImg = styled.img`
  width: 8px;
  height: 8px;
`;

const RecommendKeywordFrame = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
`;

const RecommendKeywordButton = styled.button`
  background-color: #f4f4f4;
  padding: 8px;
  font-size: 14px;
  margin: 0px 8px 12px 0px;
  border: 1px solid #ebebeb;
  border-radius: 16px;
`;

export function RecentlyKeywordTable({ list }) {
  const Navigate = useNavigate();
  const [RecentKeywordList, setRecentKeywordList] = useState([]);
  useEffect(() => {
    setRecentKeywordList(list);
  }, [list]);

  const SearchByKeyword = (keyword) => {
    const data = {
      searchCategory: "keyword",
      keyword: keyword,
    };
    Navigate("/searchResult", { state: data });
  };

  const DeleteKeyword = (keyword) => {
    console.log(keyword);
    const nextlist = [];
    for (let index = 0; index < RecentKeywordList.length; index++) {
      if (RecentKeywordList[index] !== keyword) {
        nextlist.push(RecentKeywordList[index]);
      }
    }
    localStorage.setItem("SearchList", JSON.stringify(nextlist));
    setRecentKeywordList(nextlist);
  };

  return (
    <div>
      {list !== null ? (
        <RecentlyKeywordFrame>
          {RecentKeywordList.map((keyword, idx) => (
            <RecentlyKeywordButton key={idx}>
              <div onClick={(e) => SearchByKeyword(keyword)}>{keyword}</div>

              <RecentlyKeywordRemoveButton>
                <RecentlyKeywordRemoveImg
                  src={XIcon}
                  onClick={(e) => DeleteKeyword(keyword)}
                />
              </RecentlyKeywordRemoveButton>
            </RecentlyKeywordButton>
          ))}
        </RecentlyKeywordFrame>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export function RecommendKeywordTable({ list }) {
  console.log(typeof (list));
  const Navigate = useNavigate();
  const [RecommendKeywordList, setRecommendKeywordList] = useState([]);
  useEffect(() => {
    setRecommendKeywordList(list);
  }, [list]);

  const SearchByKeyword = (keyword) => {
    const data = {
      searchCategory: "tag",
      keyword: keyword,
    };
    Navigate("/searchResult", { state: data });
  };

  return (
    <div>
      {list !== null ? (
        <RecommendKeywordFrame>
          {RecommendKeywordList.map((keyword, idx) =>
            <RecommendKeywordButton key={idx}>
              <div onClick={(e) => SearchByKeyword(keyword.searchTagName)}>{keyword.searchTagName}</div>
            </RecommendKeywordButton>
          )}
        </RecommendKeywordFrame>) : <div></div>}
    </div>
  );
}
