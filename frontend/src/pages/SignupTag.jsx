import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logoClear.png";
import Button from "../components/Button";
import { FlexBox } from "../components/UserStyled";
import { getTagListApi, registerTagApi } from "../utils/api";
export default function SignupTag() {
  const [loading, setloading] = useState(true);
  const Navigate = useNavigate("");
  // 태그목록 불러오기
  const [tagList, setTagList] = useState([]);
  const [selectedTag, setSeletedTag] = useState([]);
  useEffect(() => {
    if (loading) {
      getTagListApi(
        (res) => {
          setTagList(res.data);
          console.log(tagList);
          setloading(false);
        },
        (err) => {
          console.log(err);
        }
      );
    }
    // eslint-disable-next-line
  }, [loading]);

  const Next = () => {
    Navigate("/");
  };

  const selectTag = () => {
    setSeletedTag(
      selectedTag.sort(function (a, b) {
        return a - b;
      })
    );
    for (let index = 0; index < selectedTag.length; index++) {
      selectedTag[index]++;
    }
    const data = selectedTag;
    registerTagApi(
      data,
      (res) => {
        console.log(res);
        console.log("성공");

        Navigate("/");
      },
      (err) => {
        console.log(err);
      }
    );
  };
  return loading ? (
    <div></div>
  ) : (
    <div>
      <br />
      <FlexBox MainContent2 style={{ padding: "4vh" }}>
        <div style={{ alignSelf: "flex-start", margin: "0px 10px" }}>
          <h3 style={{ margin: "3px" }}>마음에드는</h3>
          <h3 style={{ margin: "3px" }}>태그를 선택해주세요!</h3>
        </div>
        <br />
        <FlexBox Row_S style={{ alignSelf: "flex-start", margin: "3vw" }}>
          <img style={{ height: "5vh" }} src={logo} alt="beedly" />가 당신의
          취향을 추천해드릴게요.
        </FlexBox>
        <br />
        {/* 태그 선택 창 */}
        <FlexBox Row_SB style={{ flexWrap: "wrap", padding: "6px 10px" }}>
          {tagList.map((item, idx) => (
            <Button
              key={idx}
              onClick={() => {
                !selectedTag.includes(idx)
                  ? setSeletedTag((selectedTag) => [...selectedTag, idx])
                  : setSeletedTag(
                      selectedTag.filter((Button) => Button !== idx)
                    );
              }}
              TagGray={!selectedTag.includes(idx) ? true : false}
              TagYellow={selectedTag.includes(idx) ? true : false}
              style={{
                margin: "6px 3px ",
                flex: "1 1 20%",
                wordWrap: "break-word",
                maxWidth: "25%",
                padding: "5px 3px",
              }}
            >
              # {item.name}
            </Button>
          ))}
        </FlexBox>
        <br />
        <FlexBox Row_SB style={{ padding: "5vh" }}>
          <Button MediumBlack style={{ width: "38vw" }} onClick={Next}>
            다음에 할게요
          </Button>
          <Button MediumYellow style={{ width: "38vw" }} onClick={selectTag}>
            완료했어요
          </Button>
        </FlexBox>
      </FlexBox>
    </div>
  );
}
