import { Box, FileInput, Grid, Grommet, Select } from "grommet";
import React, { forwardRef, useState } from "react";
import { useEffect } from "react";
import { StyledText } from "../components/Common";
import { Input2, SizeInput, STextArea } from "../components/UserStyled";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import styled from "styled-components";
import ImageInputPic from "../assets/images/imageInput.png";
import Button from "../components/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import CloseButton from "../assets/images/close.png";

const titleSize = "16px";

const HeaderDiv = styled.div`
  margin: 5px;
  display: flex;
  justify-content: space-between;
`;

const HeaderBox = ({ goBack }) => {
  return (
    <HeaderDiv>
      <div style={{ width: "10vw" }}></div>
      <StyledText size="20px" weight="bold" text="작품 등록" />
      <BackButton onClick={goBack}>
        <img src={CloseButton} />
      </BackButton>
    </HeaderDiv>
  );
};

const GrTheme = {
  global: {
    input: {
      font: {
        size: "12px",
        weight: 0,
      },
      fontSize: "10px",
      weight: 0,
      padding: "0px",
    },
    hover: {
      background: {
        color: "#ffffff",
        opacity: "medium",
      },
    },
  },
  select: {
    background: "white",
    options: {
      text: {
        size: "10px",
      },
      container: {
        backgroundColor: "#FFFFFF",
      },
    },
    container: {},
    icons: {
      color: "black",
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
      margin: "2px auto",
      padding: "0px",
      font: {
        margin: "0 auto",
        size: "xsmall",
        padding: "0px",
      },
    },
  },
};
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

const PreviewImg = styled.img`
  width: 25vw;
  height: 10vh;
  object-fit: cover;
  border-radius: 10px;
  src: ${(props) => props.src || ""};
`;

const PreviewDiv = styled.div`
  width: 25vw;
  height: 10vh;
  border-radius: 10px;
  margin: 3px;
`;

const BackButton = styled.button`
  background: none;
  font-size: 12px;
  font-family: Noto Sans KR, sans-serif;
  border: 0px;
  width: 10vw;
  margin-top: 15px;
`;

export const Preview = ({ src }) => {
  return (
    <PreviewDiv>
      <PreviewImg src={src} />
    </PreviewDiv>
  );
};

export const ImageBtn = styled.img`
  background: #fff;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  &:hover {
    background: rgb(77, 77, 77);
    color: #fff;
  }
`;

export const ImageInput = ({ ImageInputPic, titleSize, handleImageUpload }) => {
  return (
    <Box width="100%">
      <label
        htmlFor="image"
        style={{
          display: "flex",
          alignContent: "space-between",
        }}
      >
        <ImageBtn src={ImageInputPic} />
        <Box direction="row" justify="between" width="90%">
          <StyledText size={titleSize} weight="bold" text="사진 등록" />
          <StyledText
            size="10px"
            color="lightgray"
            text="최대 3장"
            alignSelf="end"
          />
        </Box>
      </label>
      <input
        id="image"
        type="file"
        multiple
        accept="image/jpg,image/png,image/jpeg,image/gif"
        onChange={handleImageUpload}
        style={{
          display: "none",
        }}
      />
    </Box>
  );
};

export const SpecialProductRegister = () => {
  const [productName, setProductName] = useState("");
  const [productArtist, setProductArtist] = useState("");
  const [category, setCategory] = useState("카테고리");
  const [startTime, setStartTime] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [prevs, setPrevs] = useState([]);
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [tags, setTags] = useState([
    "수채화",
    "유화",
    "정물화",
    "인물화",
    "팝아트",
    "풍경화",
  ]);
  const [select, setSelect] = useState([]);
  const [open, setOpen] = useState(false);
  // useEffect(() => {
  //   const t = ["수채화", "유화", "정물화", "인물화", "팝아트", "풍경화"];
  //   setTags(t);
  // }, []);
  const DateInputButton = forwardRef(({ value, onClick }, ref) => (
    <button onClick={onClick} ref={ref} style={style3}>
      {value === "" ? "날짜를 선택하세요" : value}
    </button>
  ));

  const handlePrev = (event, { files }) => {
    console.log("first files:", files);

    const fileList = [...files];

    const arr = [];
    fileList.map((file, idx) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        arr.push(e.target.result);
      };
    });
    setProductImages([...files]);
    setPrevs([...arr]);
    console.log(productImages);
  };

  const handleChangeFile = (event, { files }) => {
    console.log(files);
    setProductImages(files);
    //fd.append("file", event.target.files)
    setPrevs([]);
    for (var i = 0; i < files.length; i++) {
      if (files[i]) {
        let reader = new FileReader();
        reader.readAsDataURL(files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
        // 파일 상태 업데이트
        reader.onloadend = () => {
          // 2. 읽기가 완료되면 아래코드가 실행됩니다.
          const base64 = reader.result;
          // console.log(base64);
          if (base64) {
            //  images.push(base64.toString())
            var base64Sub = base64.toString();

            setPrevs((prevs) => [...prevs, base64Sub]);
            //  setImgBase64(newObj);
            // 파일 base64 상태 업데이트
            //  console.log(images)
          }
        };
      }
    }
  };

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

  const handleClickRegister = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Grommet theme={GrTheme}>
      <Box>
        <HeaderBox />
        <Box width="90vw" alignSelf="center">
          <Box margin="small" direction="row">
            <Box width="small" justify="center">
              <StyledText size={titleSize} weight="bold" text="작품명" />
            </Box>
            <Box width="medium" direction="row" justify="end">
              <Input2
                Thin
                placeholder="작품명을 입력하세요."
                value={productName}
                onChange={(e) => {
                  setProductName(e.target.value);
                }}
              />
            </Box>
          </Box>
          <Box margin="small" direction="row">
            <Box width="small" justify="center">
              <StyledText size={titleSize} weight="bold" text="작가명" />
            </Box>
            <Box width="medium" direction="row" justify="end">
              <Input2
                Thin
                placeholder="작가명을 입력하세요."
                value={productArtist}
                onChange={(e) => {
                  setProductArtist(e.target.value);
                }}
              />
            </Box>
          </Box>
          <Box margin="small" direction="row">
            <Box width="small" justify="center">
              <StyledText size={titleSize} weight="bold" text="카테고리" />
            </Box>
            <Box width="medium" direction="row" justify="end">
              <Select
                size="10px"
                options={["회화", "판화", "에디션", "사진", "입체"]}
                placeholder="선택하세요"
                value={category}
                onChange={({ option }) => {
                  setCategory(option);
                }}
              />
            </Box>
          </Box>
          <Box margin="small" direction="row">
            <Box width="small" justify="center">
              <StyledText size={titleSize} weight="bold" text="경매 시작가" />
            </Box>
            <Box width="medium" direction="row" justify="center">
              <Input2
                Thin
                placeholder="경매 시작가를 입력하세요."
                value={startPrice}
                onChange={(e) => {
                  setStartPrice(e.target.value);
                }}
              />
            </Box>
            <Box justify="center">
              <StyledText weight="bold" text="원" />
            </Box>
          </Box>
          <Box direction="row" justify="end">
            <StyledText
              text="등록 후에는 변경이 불가능합니다."
              size="10px"
              color="red"
            />
          </Box>
          <Box margin="small" justify="end" direction="row">
            <Box width="small" justify="center">
              <StyledText
                size={titleSize}
                weight="bold"
                text="경매 시작 일시"
              />
            </Box>
            <Box width="medium" direction="row" justify="end">
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                dateFormat="yyyy년 MM월 dd일 HH:mm"
                locale={ko}
                customInput={<DateInputButton />}
              />
            </Box>
          </Box>
          <Box margin="small">
            <Box>
              <StyledText size={titleSize} weight="bold" text="사이즈" />
            </Box>
            <Box direction="row" margin={{ left: "small" }}>
              <Box justify="center">
                <StyledText text="가로" />
              </Box>
              <Box direction="row" justify="end">
                <SizeInput
                  Thin
                  value={width}
                  onChange={(e) => {
                    setWidth(e.target.value);
                  }}
                />
              </Box>
              <Box justify="center">
                <StyledText text="cm" />
              </Box>
            </Box>
            <Box direction="row" margin={{ left: "small" }}>
              <Box justify="center">
                <StyledText text="세로" />
              </Box>
              <Box direction="row" justify="end">
                <SizeInput
                  Thin
                  value={height}
                  onChange={(e) => {
                    setHeight(e.target.value);
                  }}
                />
              </Box>
              <Box justify="center">
                <StyledText text="cm" />
              </Box>
            </Box>
            <Box direction="row" margin={{ left: "small" }}>
              <Box justify="center">
                <StyledText text="두께" />
              </Box>
              <Box direction="row" justify="end">
                <SizeInput
                  Thin
                  value={depth}
                  onChange={(e) => {
                    setDepth(e.target.value);
                  }}
                />
              </Box>
              <Box justify="center">
                <StyledText text="cm" />
              </Box>
            </Box>
          </Box>
          <Box margin="small">
            <StyledText text="작품 설명" size={titleSize} weight="bold" />
            <STextArea
              placeholder="작가님이 작품에 대해 하고싶은 
            이야기들을 작성해주세요"
              onChange={(e) => setProductDesc(e.target.value)}
              value={productDesc}
            />
            <Box justify="end" direction="row">
              <div>{productDesc.length} / 300</div>
            </Box>
          </Box>
          <ImageInput
            ImageInputPic={ImageInputPic}
            titleSize={titleSize}
            handleImageUpload={handleImageUpload}
          />
          {/* <input
              type="file"
              multiple
              accept="image/jpg,image/png,image/jpeg,image/gif"
              onChange={handleImageUpload}
            /> */}
          {/* <FileInput
              multiple={{
                aggregateThreshold: 3,
                max: 3,
              }}
              onChange={handleChangeFile}
              messages={{
                browse: "선택",
                dropPromptMultiple: "사진 등록",
                files: "사진",
                remove: "삭제",
                maxFile: "제한 : 3장",
              }}
            /> */}
          <Box direction="row" justify="around">
            {prevs.map((image, idx) => {
              return <Preview src={image} key={idx} />;
            })}
          </Box>

          {/* <Box margin={{ top: "20px" }}>
            <StyledText text="Tag" size={titleSize} weight="bold" />
            <Grid columns={{ count: 4, size: "auto" }} gap="xsmall">
              {tags.map((tag, idx) => {
                return (
                  <Button
                    key={idx}
                    onClick={() => {
                      !select.includes(idx)
                        ? setSelect((select) => [...select, idx])
                        : setSelect(select.filter((Button) => Button !== idx));
                    }}
                    SmallThinWhite={!select.includes(idx) ? true : false}
                    SmallThinYellow={select.includes(idx) ? true : false}
                  >
                    #{tag}
                  </Button>
                );
              })}
            </Grid>
          </Box> */}
          <Box alignSelf="center">
            <Button
              BigBlack
              children="작품 등록"
              onClick={handleClickRegister}
            ></Button>
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
                  <StyledText text="작품을 등록하시겠습니까?" weight="bold" />
                  <p />
                  <StyledText
                    text="경매 시작가는 수정이 불가능합니다."
                    color="red"
                    size="10px"
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Box direction="row" width="100%" justify="center">
                  <Button MediumBlack onClick={() => {}} autoFocus>
                    작품 등록
                  </Button>
                </Box>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </Box>
    </Grommet>
  );
};
