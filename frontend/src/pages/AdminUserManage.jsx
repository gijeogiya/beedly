import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import beforeIcon from "../assets/img/arrow-left.svg";
import { StyledHr } from "../components/Common";
import { FlexBox } from "../components/UserStyled";
import { applicationListApi, artistApproveApi } from "../utils/api";

export default function AdminUserManage() {
  // 이전으로 돌아가기
  const Navigate = useNavigate("");
  const GoBack = () => {
    Navigate(-1);
  };

  // 승인 안된 작가들 담을 배열
  const [ApplicationList, setApplicationList] = useState([]);

  // API 호출 함수
  const call = () => {
    applicationListApi((res) => {
      console.log(res);
      setApplicationList(res.data.content);
    });
  };

  useEffect(() => {
    call();
  }, []);

  // 작가 승인을 눌렀을 경우
  const Approve = (userid) => {
    artistApproveApi(
      userid,
      (res) => {
        console.log(res);
        call();
      },
      (err) => {
        console.log(err);
      }
    );
  };

  // 작가 승인을 거부했을 경우
  const Reject = (userid) => {
    console.log("reject");
    console.log(userid);
  };
  return (
    <div>
      {/* 유저관리 header */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "5vh",
            alignItems: "center",
            padding: "0px 10px",
          }}
        >
          <img alt="이전" src={beforeIcon} onClick={GoBack} />
          <h4>유저관리</h4>
          <h4 style={{ visibility: "hidden" }}>dd</h4>
        </div>
      </div>
      <div style={{ margin: "3vw" }}>
        <h5>작가님 승인</h5>
        {/* 승인 안된 작가들 보여주기 */}
        {ApplicationList.map((item, idx) => (
          <div key={idx}>
            <FlexBox Row_SB style={{ minHeight: "5vh" }}>
              <div style={{ fontSize: "12px" }}>
                {item.userName} ({item.userEmail})
              </div>
              <FlexBox
                Row_SB
                style={{ fontSize: "12px", width: "15vw", marginRight: "3vw" }}
              >
                <div onClick={(e) => Approve(item.userId)}>승인</div>
                <div
                  onClick={(e) => Reject(item.userId)}
                  style={{ color: "red" }}
                >
                  거부
                </div>
              </FlexBox>
            </FlexBox>
            <FlexBox Content>
              <StyledHr
                width="94vw"
                height="0.1px"
                color="lightgray"
                style={{ border: "0px" }}
              />
            </FlexBox>
          </div>
        ))}
      </div>
    </div>
  );
}
