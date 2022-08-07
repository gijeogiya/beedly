import React, { useState } from 'react'
import Button from "../components/Button"
import { FlexBox, Input } from "../components/UserStyled"
import qs from 'qs';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import DaumPostcode from 'react-daum-postcode';
import { actionCreators as userActions } from "../stores/modules/user";
import { Calendar } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { checkNicknameApi, updateUserInfoApi } from '../utils/api';

const SignupInput = {
    display: "flex",
    margin: "1vw 3vw",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "40vh",
    flexWrap: "wrap"
}

const tableStyle = {
    width: "70vw",
    border: "0px",
    marginBottom: "15px",
}

const heading2 = {
    fontWeight: "500",
    fontSize: "16px",
    margin: "7px 0px",
}

const flexrowbox = {
    alignSelf: "auto",
    justifySelf: "baseline",
    flexDirection: "row",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    margin: "10px 0px",
}
const postmodal = {
    background: "rgba(0, 0, 0, 0.25)",
    position: "fixed",
    left: "0",
    top: "0",
    height: "100%",
    width: "100%",
}

export default function Signup() {
    //datepicker
    const [locale, setLocale] = React.useState('ko');
    const [date, setDate] = useState(new Date());
    const [showCalender, setShowCalender] = useState(false);

    // redux에 있는 데이터 가져오기. state.(module).(data)
    const user = useSelector(state => state.user.user);

    //다시 redux와 통신해야 하므로
    const dispatch = useDispatch();

    //url에 있는 쿼리 가져와서 어떤 role로 회원가입하려는지 확인.
    const { search } = useLocation();
    const userRole = qs.parse(search, { ignoreQueryPrefix: true }).role
    const role = (userRole === 'ROLE_ARTIST') ? '작가님' : '구매자';

    //회원가입 버튼 눌렀을 때
    const Join = () => {
        // 유효성 검사
        if (userName == '') { window.alert("이름을 입력해주세요"); }
        else if (userTel == '') { window.alert("전화번호를 입력해주세요"); }
        else if (userEmail == '') { window.alert("이메일를 입력해주세요"); }
        else if (userBirthdate == '') { window.alert("생년월일를 입력해주세요"); }
        else if (userNickname == '' || !isNicknameCheck) { window.alert("닉네임 중복체크를 완료해주세요"); }
        else if (userAddr == '') { window.alert("주소를 입력해주세요"); }
        else {
            //회원가입을 하려고 하면 해당 데이터를 state에 저장하려고 함.
            const user = {
                addr: userAddr + " " + userDetailaddr,
                // user_gender: userGender,
                birthday: userBirthdate,
                name: userName,
                nickname: userNickname,
                // userRole: userRole,
                tel: userTel,
            }
            console.log(user);
            // 회원가입
            updateUserInfoApi(user, (res) => {
                console.log(res);
            }, (err) => {
                console.log(err);
            })
            // 회원가입 하는 사람이 작가님이라면
            console.log("test");
            if (userRole === 'ROLE_ARTIST') {
                // 증빙서류 제출 페이지로 가야함 ( user 객체 가지고 가야함.) 
            } else { // 구매자라면 회원가입 성공
                //태그 선택 페이지로 이동
            }

        }



    }


    // 닉네임 중복 체크
    const [isNicknameCheck, setNicknameCheck] = useState(false);
    const [checkalert, setcheckalert] = useState('');
    const [response, setResponse] = useState();
    const CheckNickname = () => {
        if (userNickname == '') {
            setcheckalert("닉네임을 입력해주세요")
        } else {
            checkNicknameApi(userNickname, (res) => {
                setResponse(res.data.available);
                if (res.data.available === true) {
                    setcheckalert("해당 닉네임을 가진 사용자가 있습니다.");
                } else {
                    setcheckalert("사용 가능합니다.");
                    setNicknameCheck(true);
                }
            }, (err) => {
                console.log("엥");
                console.log(err);
            })
        }

    }

    // useState
    const [userAddr, setAddr] = useState('');
    const [userDetailaddr, setdetailAddr] = useState('');
    const [userEmail, setEmail] = useState(user.userEmail);
    // const [userGender, setGender] = useState(user.userGender);
    const [userName, setName] = useState('');
    const [userNickname, setNickName] = useState('');
    const [userTel, setTel] = useState('');
    const [userBirthdate, setBirthDate] = useState('');
    //daum 주소찾기 api
    const [isOpenPost, setIsOpenPost] = useState(false);

    // onChange 함수
    const onChangeDetailAddr = (e) => { setdetailAddr(e.target.value); }
    // const onChangeEmail = (e) => { setEmail(e.target.value); console.log(userEmail); }
    // const onChangeGender = (e) => { setGender(e.target.value); console.log(userGender); }
    const onChangeName = (e) => { setName(e.target.value); }
    const onChangeNickName = (e) => { setNickName(e.target.value); setNicknameCheck(false); setcheckalert("") }
    const onChangeTel = (e) => { setTel(e.target.value); }

    //주소찾기를 완료하면
    const onCompletePost = (data) => {
        let fullAddr = data.address;
        let extraAddr = '';

        if (data.addressType == 'R') {
            if (data.bname !== '') {
                extraAddr += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddr += (extraAddr !== '' ? `,${data.buildingName}` : data.buildingName);
            }
            fullAddr += (extraAddr !== '' ? `(${extraAddr})` : '');
        }
        setAddr(fullAddr);
    }

    const handleComplete = (e) => {
        e.currentTarget.disabled = true;
        setIsOpenPost(!isOpenPost);
    }

    const birthday = (item) => {
        setShowCalender(!showCalender);
        const year = item.getFullYear(item);
        const month = item.getMonth(item) + 1 < 10 ? '0' + (item.getMonth(item) + 1) : item.getMonth(item) + 1;
        const date = item.getDate(item) < 10 ? '0' + (item.getDate(item)) : item.getDate(item);
        setBirthDate(`${year}-${month}-${date}`);
    }
    return (
        <FlexBox MainContent>

            <h3>{role} 회원가입</h3>
            <div style={SignupInput}>

                <table style={tableStyle}>
                    <tbody>
                        <tr>
                            <td>Role</td>
                            <td>{role}</td>
                        </tr>
                        <tr>
                            <td>이름</td>
                            <td><Input width="40vw" height="30px" onChange={onChangeName} value={userName}></Input></td>
                        </tr>
                        <tr>
                            <td>전화번호</td>
                            <td><Input width="40vw" height="30px" onChange={onChangeTel} value={userTel}></Input></td>
                        </tr>
                    </tbody>
                </table>

                <div>
                    <h3 style={heading2}>Email</h3>
                    <Input value={userEmail} readOnly />
                </div>

                {/* <div style={flexrowbox}>
                    <h3 style={heading2}>성별</h3>
                    <div style={flexrowbox2}>
                        <RadioButton
                            name="gender"
                            label="남"
                            value="M"
                            checked={userGender === "M"}
                            onChange={onChangeGender}
                        />
                        <RadioButton
                            name="gender"
                            label="여"
                            value="W"
                            checked={userGender === "W"}
                            onChange={onChangeGender}
                        />
                    </div>
                </div> */}

                <div style={flexrowbox}>
                    <div style={{ display: "flex", justifyContent: "flex-start" }}>
                        <h3 style={heading2}>생년월일</h3>
                        <div style={{ marginLeft: "10px" }}>
                            {!showCalender && <Button XsmallBlack onClick={() => { setShowCalender(!showCalender); setDate(date); }} disabled="">날짜선택</Button>}
                        </div>

                    </div>

                    <p style={{ fontSize: "14px", fontWeight: "bold", wordBreak: "break-all", maxWidth: "68vw" }}>{userBirthdate}</p>

                </div>
                {showCalender && // 클릭 등으로 토글상태 값이 true 이 되면 달력이 보여진다
                    <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
                        <Calendar onChange={item => {
                            birthday(item);
                        }}
                            locale={locales[locale]} date={date} style={{ width: "70vw" }} />
                    </div>
                }
                <div>
                    <div style={flexrowbox}>
                        <h3 style={heading2} >닉네임</h3>
                        {!isNicknameCheck && <Button XsmallBlack onClick={CheckNickname} disabled="">중복검사</Button>}
                    </div>
                    <Input onChange={onChangeNickName} value={userNickname} />
                    <div style={{ color: "red", fontSize: "12px" }}>{checkalert}</div>
                </div>

                {/* 주소착지 API 창 */}
                {isOpenPost && <DaumPostcode style={postmodal} autoClose onComplete={onCompletePost} />}

                <div>
                    <div style={flexrowbox}>
                        <h3 style={heading2}>주소</h3>
                        <Button XsmallBlack onClick={handleComplete} disabled="">주소찾기</Button>
                    </div>
                    <div style={{ backgroundColor: "rgba(31,29,29,0.1)", padding: "1px 10px" }}>
                        <p style={{ fontSize: "14px", fontWeight: "bold", wordBreak: "break-all", maxWidth: "68vw" }}>{userAddr}</p>
                    </div>
                </div>
                <div style={{ margin: "0px 0px 10px 0px" }}>
                    <h3 style={heading2}>상세주소</h3>
                    <Input onChange={onChangeDetailAddr} value={userDetailaddr} />
                </div>

                <Button BigBlack onClick={Join}>회원가입</Button>
            </div>
        </FlexBox>
    )
}
