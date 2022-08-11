import React, { useEffect } from 'react'
import beforeIcon from "../assets/img/arrow-left.svg";
import { StyledHr, StyledProfile } from '../components/Common';
import { FlexBox } from '../components/UserStyled';
import SampleProfile from '../assets/img/SampleProfile.png'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getUserInfoApi, getUserTagApi } from '../utils/api';
import Button from '../components/Button';

const styledp = {
    fontSize: "14px",
}

export default function MypageDetail() {
    const Navigate = useNavigate('');
    const [user, setUser] = useState({
        userName: '',
        userRole: '',
        userEmail: '',
    });
    const [loading, setloading] = useState(true);
    const [taglist, setTagList] = useState([]);
    useEffect(() => {
        // 아직 로그인 된 상태가 아니라면
        if (localStorage.getItem("token") === null) {
            // 로그인하라고 보내주기
            Navigate('/login');
        } else {
            if (loading) {
                // 내 정보 조회
                getUserInfoApi((res) => {
                    console.log(res);
                    setUser(res.data);
                    setTagList(res.data.recommendationTagDtos);
                    setloading(false);
                }, (err) => {
                    console.log(err);
                })
            }

        }

    }, []);

    // 뒤로가기
    const Goback = () => {
        Navigate(-1);
    }
    // 로그아웃
    const Logout = () => {
        localStorage.removeItem("token");
        Navigate("/");
    }

    //로그아웃 confirm 함수
    const useConfirm = (message = null, onConfirm, onCancel) => {
        if (!onConfirm || typeof onConfirm !== "function") {
            return;
        }
        if (onCancel && typeof onCancel !== "function") {
            return;
        }

        const confirmAction = () => {
            if (window.confirm(message)) {
                onConfirm();
            } else {
                onCancel();
            }
        };

        return confirmAction;
    };
    const deleteConfirm = () => Logout();
    const cancelConfirm = () => console.log("취소했습니다.");

    const confirmLogout = useConfirm(
        "로그아웃하시겠습니까?",
        deleteConfirm,
        cancelConfirm
    );
    return (
        <div>
            <img alt="이전" src={beforeIcon} style={{ padding: "15px" }} onClick={Goback} />
            <FlexBox MainContent>

                <h3>마이페이지</h3>
                <StyledProfile src={SampleProfile}></StyledProfile>
                <div style={{ width: "80vw" }}>
                    <FlexBox Row_SB>
                        <h4>프로필 정보</h4>
                        <Link to="/updateMypage" style={{ textDecoration: "none", color: "black" }}><p>편집</p></Link>
                    </FlexBox>
                    <div>
                        <h5>이름</h5>
                        <div style={styledp}>{user.userName}</div>
                        <StyledHr
                            width="80vw"
                            height="0.5px"
                            color="lightgray"
                        />
                    </div>
                    <div>
                        <h5>Role</h5>
                        <div style={styledp}>{user.userRole === "ROLE_ARTIST" ? "작가님" : "구매자"}</div>
                        <StyledHr
                            width="80vw"
                            height="0.5px"
                            color="lightgray"
                        />
                    </div>
                    <div>
                        <h5>닉네임</h5>
                        <div style={styledp}>{user.userNickname}</div>
                        <StyledHr
                            width="80vw"
                            height="0.5px"
                            color="lightgray"
                        />
                    </div>
                    <div>
                        <h5>전화번호</h5>
                        <div style={styledp}>{user.userTel}</div>
                        <StyledHr
                            width="80vw"
                            height="0.5px"
                            color="lightgray"
                        />
                    </div>
                    <div>
                        <h5>생년월일 / 성별</h5>
                        <div style={styledp}>{user.userBirthday} / {user.userGender === "M" ? "남" : "여"}</div>
                        <StyledHr
                            width="80vw"
                            height="0.5px"
                            color="lightgray"
                        />
                    </div>
                    <div>
                        <h5>주소</h5>
                        <div style={styledp}>{user.userAddr}</div>
                        <StyledHr
                            width="80vw"
                            height="0.5px"
                            color="lightgray"
                        />
                    </div>
                    <div>
                        <h5>태그</h5>
                        <FlexBox Row_SB style={{ flexWrap: "wrap", padding: "6px 10px" }}>

                            {taglist.map((item, idx) =>
                                <Button

                                    key={idx}
                                    TagYellow
                                    style={{ margin: "6px 3px ", flex: '1 1 20%', wordWrap: "break-word", maxWidth: "25%", padding: "5px 3px" }}># {item.name}</Button>
                            )}
                        </FlexBox>

                    </div>
                </div>
                <br />
                <Button SmallBlack onClick={confirmLogout}>로그아웃</Button>
                <br />

            </FlexBox >
        </div >
    )
}
