import { Box, FileInput, Grommet, Select } from "grommet";
import React, { forwardRef, useState } from "react";
import { useEffect } from "react";
import { StyledText } from "../components/Common";
import { Input2, STextArea } from "../components/UserStyled";
import { HeaderBox } from "./SpecialProduct";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";

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
export const ProductRegister = () => {
  const [productName, setProductName] = useState("");
  const [productArtist, setProductArtist] = useState("");
  const [category, setCategory] = useState("카테고리");
  const [startTime, setStartTime] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [prevs, setPrevs] = useState([]);
  useEffect(() => {
    setProductImages([]);
    setPrevs([]);
  }, []);
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

  return (
    <Grommet theme={GrTheme}>
      <Box>
        <HeaderBox />
        <Box width="90vw" alignSelf="center">
          <Box margin="small" direction="row">
            <Box width="small" justify="center">
              <StyledText weight="bold" text="작품명" />
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
              <StyledText weight="bold" text="카테고리" />
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
              <StyledText weight="bold" text="경매 시작가" />
            </Box>
            <Box width="medium" direction="row" justify="center">
              <Input2
                Thin
                placeholder="경매 시작가를 입력하세요."
                value={productArtist}
                onChange={(e) => {
                  setProductArtist(e.target.value);
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
              <StyledText weight="bold" text="경매 시작 일시" />
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
          <Box width="60vw">
            {/* <input
              type="file"
              multiple="multiple"
              onChange={handleChangeFile}
            /> */}
            <FileInput
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
            />
          </Box>
        </Box>
        <Box>
          {prevs.map((image) => {
            return <img src={image} />;
          })}
        </Box>
        <div>태그</div>
        <div>버튼</div>
      </Box>
    </Grommet>
  );
};
