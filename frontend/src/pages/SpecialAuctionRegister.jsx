import {
  Box,
  DateInput,
  FileInput,
  FormField,
  Grid,
  TextArea,
  TextInput,
  Grommet,
} from "grommet";
import React, { useState, useEffect, forwardRef } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import CloseButton from "../assets/images/close.png";
import Button from "../components/Button";
import { StyledText } from "../components/Common";
import { Link, useLocation, useNavigate } from "react-router-dom";
import product1 from "../assets/images/product1.png";
import { STextArea, Input, Input2 } from "../components/UserStyled";
import BackButtonImage from "../assets/images/backButton.png";
import ImInput from "../assets/icons/imageInput.svg";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import {
  getSpecialBoard,
  registerSpecialBoard,
  updateSpecialBoard,
} from "../utils/apis/SpecialBoardAPI";
import { ImageBtn, ImageInput, Preview } from "./SpecialProductRegister";
import ImageInputPic from "../assets/images/imageInput.png";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
const HeaderDiv = styled.div`
  margin: 5px;
  display: flex;
  justify-content: space-between;
`;

const BackButton = styled.button`
  background: none;
  font-size: 12px;
  font-family: Noto Sans KR, sans-serif;
  border: 0px;
  width: 10vw;
`;

const HeaderBox = ({ goBack, boardId }) => {
  return (
    <HeaderDiv>
      <BackButton onClick={goBack}>
        <img src={BackButtonImage} />
      </BackButton>
      <StyledText
        size="20px"
        weight="bold"
        text={boardId ? "기획전 수정" : "기획전 등록"}
      />
      <div style={{ width: "10vw" }}></div>
    </HeaderDiv>
  );
};

const MainDiv = styled.div`
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const GrTheme = {
  global: {
    focus: {
      border: {
        color: "none",
      },
    },
    input: {
      font: {
        size: "small",
        height: "small",
        weight: "normal",
      },
      weight: 0,
      padding: "0px",
    },
  },
  fileInput: {
    border: "bottom",
    hover: {
      border: false,
    },
    label: {
      margin: "none",
      size: "xsmall",
    },
    message: { margin: "none", size: "xsmall" },
    button: {
      margin: "0 auto",
      padding: "3px",
      font: {
        margin: "0 auto",
        size: "xsmall",
      },
    },
  },
};

const BottomLineTextInput = styled(TextInput)`
  border: none;
  border-radius: 0px;
  border-bottom: 1px solid black;
  &:focus {
    outline: none;
  }
`;

const style3 = {
  height: "42px",
  borderRadius: "5px",
  border: "0px",
  fontSize: "12px",
  fontFamily: "'Noto Sans KR', 'sans-serif'",
  fontWeight: "500",
  margin: "'10px' '5px'",
  color: "white",
  background: "#1F1D1D",
  width: "100%",
};

const MainContent = ({
  startDate,
  handleDate,
  locale,
  textValue,
  handleText,
  title,
  subTitle,
  handleTitle,
  handleSubTitle,
  setFile,
  ImageInputPic,
  titleSize,
  handleImageUpload,
  prevs,
  boardId,
}) => {
  const DateInputButton = forwardRef(({ value, onClick }, ref) => (
    <button onClick={onClick} ref={ref} style={style3}>
      {value == "" ? "날짜를 선택하세요" : value}
    </button>
  ));
  return (
    <Box width="90vw" alignSelf="center">
      <Box margin="small" direction="row">
        <Box width="xsmall" justify="center" align="center">
          제목
        </Box>
        <Box width="medium" direction="row" justify="end">
          <Input2
            Thin
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => handleTitle(e.target.value)}
          />
        </Box>
      </Box>
      <Box margin="small" direction="row">
        <Box width="xsmall" justify="center" align="center">
          부제
        </Box>
        <Box width="medium" direction="row" justify="end">
          <Input2
            Thin
            placeholder="부제를 입력하세요."
            value={subTitle}
            onChange={(e) => handleSubTitle(e.target.value)}
          />
        </Box>
      </Box>
      <Box margin="small" justify="end" direction="row">
        <Box width="small" justify="center" align="center">
          <StyledText weight="bold" text="경매 시작 일시" />
        </Box>
        <Box width="medium" direction="row" justify="end">
          <DatePicker
            selected={startDate}
            onChange={(date) => handleDate(date)}
            showTimeSelect
            dateFormat="yyyy년 MM월 dd일 HH:mm"
            locale={locale}
            customInput={<DateInputButton />}
          />
          {/* <Button MediumBlack onClick={toggleShow}></Button>
          {showDate && (
            <Calendar
              onChange={(item) => handleDate2(item)}
              locale={locales["ko"]}
              date={startDate}
            />
          )} */}
        </Box>
      </Box>
      <div>
        <Box margin="small">
          {/* <TextArea
            placeholder="기획전에 대한 설명을 적어주세요"
            value={textValue}
            onChange={(e) => handleText(e.target.value)}
            resize={false}
            size="small"
            focusIndicator={false}
            rows="10"
          ></TextArea> */}
          <STextArea
            placeholder="기획전에 대한 설명을 적어주세요"
            onChange={(e) => handleText(e.target.value)}
            value={textValue}
          />
          <Box justify="end" direction="row">
            <div>{textValue.length} / 300</div>
          </Box>
        </Box>
      </div>
      <Box width="100%">
        <label
          htmlFor="image"
          style={{
            display: "flex",
            alignContent: "space-between",
          }}
        >
          <ImageBtn src={ImInput} />
          <Box direction="row" justify="between" width="90%">
            <StyledText size={titleSize} weight="bold" text="배경 사진 등록" />
            <StyledText
              size="10px"
              color="lightgray"
              text="최대 1장"
              alignSelf="end"
            />
          </Box>
        </label>
        <input
          id="image"
          type="file"
          accept="image/jpg,image/png,image/jpeg,image/gif"
          onChange={handleImageUpload}
          style={{
            display: "none",
          }}
        />
      </Box>
      <Box direction="row" justify="around">
        {/* <Preview src={prevs[0]} /> */}
        {prevs.map((image, idx) => {
          return <Preview src={image} key={idx} />;
        })}
        {/* <FileInput
          onChange={(event, { files }) => {
            const fileList = files;
            for (let i = 0; i < fileList.length; i += 1) {
              const file = fileList[i];
              console.log(file.name);
              setFile(file);
            }
          }}
          multiple={false}
          messages={{
            browse: "선택",
            dropPrompt: "배경사진 등록",
            files: "사진",
            remove: "삭제",
            maxFile: "사진 용량이 너무 큽니다.",
          }}
        /> */}
      </Box>
    </Box>
  );
};

const ProductImg = styled.img`
  border-radius: 10px;
  width: 100px;
  height: 40px;
  src: ${(props) => props.src || ""};
`;

const ProductGrid = ({ products }) => {
  console.log(products);

  return (
    <Grid columns={{ count: 3, size: "auto" }} gap="small">
      {products.map((product) => (
        <Box key={product.name}>
          <ProductImg src={product.src} />
        </Box>
      ))}
      <Link to="/specialProduct">
        <Button SmallGray>+</Button>
      </Link>
    </Grid>
  );
};

const ProductDiv = styled.div``;

export const SpecialAuctionRegister = () => {
  const location = useLocation();
  const boardId = location.state !== null ? location.state.boardId : null;
  const [startDate, setStartDate] = useState(undefined);
  // const [products, setProducts] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [file, setFile] = useState([]);
  const [board, setBoard] = useState({});
  const [showDate, toggleShowDate] = useState(false);
  const [productImages, setProductImages] = useState([]);
  const [prevs, setPrevs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  let pr = [];
  useEffect(() => {
    if (boardId !== null) {
      if (loading) handleBoardData();
    }
    return () => setLoading(false);
  }, []);
  const handleClose = () => {
    setOpen(false);
    setOpenFail(false);
  };
  const handleBoardData = () => {
    getSpecialBoard(
      boardId,
      (response) => {
        console.log(response);
        let data = response.data;
        setStartDate(new Date(data.startTime));
        setTextValue(data.boardDesc);
        setTitle(data.boardTitle);
        setPrevs((prev) => [...prev, data.mainImgUri]);
        setSubTitle(data.boardSubtitle);
        urlToFile(data.mainImgUri);
        setLoading(false);
      },
      (fail) => {
        console.log(fail);
        setLoading(false);
      }
    );
  };

  const urlToFile = (url) => {
    // const response = await fetch(url);
    // const data = await response.blob();
    // const metadata = { type: `image/png`, crossOrigin: "anonymous" };
    var image = new Image();
    image.onload = function () {};
    image.crossOrigin = "Anonymous";
    image.src = url + "?not-from-cache-please";
    // let img = new File([data], metadata);
    // img.toBlob(() => {}, "image/png");
    setProductImages((prev) => [...prev, image]);
  };

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const handleDate2 = (date) => {
    setStartDate(date);
    console.log(date);
    toggleShowDate(false);
  };
  const handleDate = (date) => {
    setStartDate(date);
    console.log(startDate);
  };

  const handleTitle = (text) => {
    console.log(text);
    const MAX_LENGTH = 50;
    if (text.length <= MAX_LENGTH) setTitle(text);
  };

  const handleSubTitle = (text) => {
    console.log(text);
    const MAX_LENGTH = 50;
    if (text.length <= MAX_LENGTH) setSubTitle(text);
  };

  const handleText = (text) => {
    console.log(text);
    const MAX_LENGTH = 300;
    if (text.length <= MAX_LENGTH) setTextValue(text);
  };

  function isValid() {
    if (
      title === "" ||
      subTitle === "" ||
      startDate === "" ||
      file === "" ||
      textValue === ""
    )
      return false;
    else return true;
  }

  const handleRegister = () => {
    if (isValid()) {
      setOpen(true);
    } else {
      setOpenFail(true);
    }
  };

  function registerSpecialAuction() {
    console.log(title, subTitle, file, startDate);
    if (isValid()) {
      const board = {
        boardTitle: title,
        boardSubTitle: subTitle,
        boardDesc: textValue,
        startTime: startDate,
      };

      const formData = new FormData();
      formData.append("image", productImages[0]);

      const blob = new Blob([JSON.stringify(board)], {
        type: "application/json",
      });

      formData.append("request", blob);

      console.log(board);
      if (boardId !== null)
        updateSpecialBoard(
          boardId,
          formData,
          (success) => {
            console.log(success);
            navigate(`/specialAuctionDetail/${boardId}`);
          },
          (fail) => {
            console.log(fail);
          }
        );
      else
        registerSpecialBoard(
          formData,
          (response) => {
            console.log(response);
            navigate(`/specialAuctionDetail/${response.data}`);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
    }
  }

  // const handleImageUpload = (e) => {
  //   const fileArr = e.target.files;
  //   setFile(fileArr[0]);
  //   let reader = new FileReader();
  //   reader.onload = () => {
  //     // console.log(reader.result);
  //     let fileURLs = reader.result;
  //     setPrevs(fileURLs);
  //   };
  //   reader.readAsDataURL(fileArr[0]);
  //   // let fileURLs = [];
  //   // let files = [];
  //   // let file;
  //   // let filesLength = fileArr.length > 3 ? 3 : fileArr.length;

  //   // for (let i = 0; i < filesLength; i++) {
  //   //   file = fileArr[i];
  //   //   files[i] = file;
  //   //   setFile([...files]);
  //   //   let reader = new FileReader();
  //   //   reader.onload = () => {
  //   //     // console.log(reader.result);
  //   //     fileURLs[i] = reader.result;
  //   //     setPrevs([...fileURLs]);
  //   //   };
  //   //   reader.readAsDataURL(file);
  //   // }
  // };

  const handleImageUpload = (e) => {
    const fileArr = e.target.files;

    let fileURLs = [];
    let files = [];
    let file;
    let filesLength = fileArr.length > 3 ? 3 : fileArr.length;

    for (let i = 0; i < filesLength; i++) {
      file = fileArr[i];
      files[i] = file;
      setProductImages([...files]);
      let reader = new FileReader();
      reader.onload = () => {
        // console.log(reader.result);
        fileURLs[i] = reader.result;
        setPrevs([...fileURLs]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Grommet theme={GrTheme}>
      <Box>
        <HeaderBox goBack={goBack}></HeaderBox>
        <MainContent
          startDate={startDate}
          handleDate={handleDate}
          locale={ko}
          textValue={textValue}
          handleText={handleText}
          title={title}
          subTitle={subTitle}
          handleSubTitle={handleSubTitle}
          handleTitle={handleTitle}
          setFile={setFile}
          handleDate2={handleDate2}
          showDate={showDate}
          toggleShow={toggleShowDate}
          ImageInputPic={ImageInputPic}
          titleSize="16px"
          handleImageUpload={handleImageUpload}
          prevs={prevs}
          boardId={boardId}
        />
        {/* <StyledText weight="bold" size="18px" text="작품 목록"></StyledText>
      {products.length > 1 && <ProductGrid products={products}></ProductGrid>} */}
        <Box justify="center" direction="row">
          <Button
            BigBlack
            onClick={handleRegister}
            children={boardId !== null ? "기획전 수정" : "기획전 등록"}
          ></Button>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Box direction="row" width="100%" justify="end">
            <BackButton onClick={handleClose}>
              <img src={CloseButton} />
            </BackButton>
          </Box>

          <DialogContent>
            <Box align="center">
              <StyledText
                text={`기획전을 ${
                  boardId !== null ? "수정" : "등록"
                }하시겠습니까?`}
                weight="bold"
              />
              <p />
            </Box>
          </DialogContent>
          <DialogActions>
            <Box direction="row" width="100%" justify="center">
              <Button
                MediumBlack
                onClick={registerSpecialAuction}
                children={boardId !== null ? "수정" : "등록"}
                autoFocus
              ></Button>
            </Box>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openFail}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Box direction="row" width="100%" justify="end">
            <BackButton onClick={handleClose}>
              <img src={CloseButton} />
            </BackButton>
          </Box>

          <DialogContent>
            <Box align="center">
              <StyledText text={`모든 정보를 입력하세요.`} weight="bold" />
              <p />
              <StyledText
                text="입력하지 않은 정보가 있습니다. 모든 정보를 입력하세요."
                color="red"
                size="10px"
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Box direction="row" width="100%" justify="center">
              <Button
                MediumBlack
                onClick={handleClose}
                children="닫기"
                autoFocus
              ></Button>
            </Box>
          </DialogActions>
        </Dialog>
      </Box>
    </Grommet>
  );
};
