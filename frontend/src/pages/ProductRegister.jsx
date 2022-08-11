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

import "codemirror-colorpicker/dist/codemirror-colorpicker.css";
import { Color, ColorPicker } from "codemirror-colorpicker";
import {
  getPersonalProduct,
  registerPersonalProduct,
} from "../utils/apis/PersonalProductAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { Category } from "../stores/modules/basicInfo";

const titleSize = "16px";

const HeaderDiv = styled.div`
  margin: 5px;
  display: flex;
  justify-content: space-between;
`;

const HeaderBox = ({ productId, goBack }) => {
  return (
    <HeaderDiv>
      <div style={{ width: "10vw" }}></div>
      <StyledText
        size="20px"
        weight="bold"
        text={productId === null ? "작품 등록" : "작품 수정"}
      />
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

export const BackButton = styled.button`
  background: none;
  font-size: 12px;
  font-family: Noto Sans KR, sans-serif;
  border: 0px;
  width: 10vw;
  margin-top: 15px;
`;

const Preview = ({ src }) => {
  return (
    <PreviewDiv>
      <PreviewImg src={src} />
    </PreviewDiv>
  );
};

const ImageBtn = styled.img`
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

export const ProductRegister = () => {
  const location = useLocation();
  const productId = location.state !== null ? location.state.productId : null;
  const [productName, setProductName] = useState("");
  const [productArtist, setProductArtist] = useState("");
  const [category, setCategory] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [startPrice, setStartPrice] = useState("");
  const [productDesc, setProductDesc] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [prevs, setPrevs] = useState([]);
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");
  const [depth, setDepth] = useState("");
  const [tags, setTags] = useState([
    { name: "수채화", id: 0 },
    { name: "유화", id: 1 },
    { name: "정물화", id: 2 },
    { name: "인물화", id: 3 },
    { name: "팝아트", id: 4 },
    { name: "풍경화", id: 5 },
  ]);
  const [select, setSelect] = useState([]);
  const [open, setOpen] = useState(false);
  const [paletteColors, setPaletteColors] = useState([]);
  const [saturation, setSaturation] = useState();
  const [brightness, setBrightness] = useState();
  const [temperature, setTemperature] = useState();
  const [request, setRequest] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // const t = ["수채화", "유화", "정물화", "인물화", "팝아트", "풍경화"];
    // setTags(t);

    // setBrightness(brightness);
    // setTemperature(temperature);
    // setSaturation(saturation);
    // console.log("useEffect ", brightness, saturation, temperature);

    // personalProductDto": {
    //   "artistId": 0,
    //   "artistImg": "string",
    //   "categoryId": 0,
    //   "categoryName": "string",
    //   "depth": 0,
    //   "favoriteCount": 0,
    //   "height": 0,
    //   "id": 0,
    //   "productDesc": "string",
    //   "productImgs": [
    //     "string"
    //   ],
    //   "productName": "string",
    //   "soldStatus": "FAIL",
    //   "startPrice": 0,
    //   "startTime": "2022-08-11T04:28:13.781Z",
    //   "userId": 0,
    //   "userName": "string",
    //   "userNickname": "string",
    //   "weight": 0
    // },

    if (productId) {
      if (loading)
        getPersonalProduct(productId, (response) => {
          console.log(response);
          let data = response.data.personalProductDto;

          setProductName(data.productName);
          setProductDesc(data.productDesc);
          setStartPrice(data.startPrice);
          setHeight(data.height);
          setWidth(data.width || 0);
          setDepth(data.depth);
          setStartTime(new Date(data.startTime));
          setCategory(data.categoryId);
          setBrightness(data.brightness);
          setSaturation(data.saturation);
          setTemperature(data.temperature);
          setPrevs([...data.productImgs]);
          setProductImages([...data.productImgs]);
          // setRequest(req);
        });
    }

    // const req = {
    //   productName: productName,
    //   productDesc: productDesc,
    //   startPrice: startPrice,
    //   height: height,
    //   width: width,
    //   depth: depth,
    //   startTime: startTime,
    //   categoryId: category,
    //   brightness: brightness,
    //   saturation: saturation,
    //   temperature: temperature,
    // };
    // setRequest(req);
    return () => setLoading(false);
  }, [saturation, temperature, brightness]);

  const urlToFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
    const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
    const metadata = { type: `image/png` };
    return new File([data], filename, metadata);
  };

  const DateInputButton = forwardRef(({ value, onClick }, ref) => (
    <button onClick={onClick} ref={ref} style={style3}>
      {value === "" ? "날짜를 선택하세요" : value}
    </button>
  ));

  const handlePrev = (event, { files }) => {
    // console.log("first files:", files);

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
    // console.log(productImages);
  };

  const handleChangeFile = (event, { files }) => {
    // console.log(files);
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

  const ImageInput = ({ handleImageUpload }) => {
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
    setColor(prevs[0]);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const setColor = (url) => {
    // console.log("컬러 찾기 시작", url);
    // console.log("col", Color);
    Color.ImageToRGB(url, { maxWidth: 100 }, (results) => {
      // colorCount 만큼의 색상 추출
      // console.log(results);
      // console.log("애로우 시작");
      // Color.palette(results, 5).map((color) => {

      //   // console.log("대비 : ", s);

      // });

      // console.log(saturations, saturations.length);

      let saturations = 0;
      let brightnesses = 0;
      Color.palette(results, 5).map((color) => {
        // console.log(color);
        const s = Color.contrast(color);
        saturations = saturations + s;
        // console.log(color);
        color = color.replace("#", "");
        let bigint = parseInt(color, 16);
        // console.log("밝기 인트 : ", bigint);
        let r = (bigint >> 16) & 255;
        let g = (bigint >> 8) & 255;
        let b = bigint & 255;
        // console.log(r, g, b);
        const br = Math.ceil(r * 0.2126 + g * 0.7152 + b * 0.0722);

        brightnesses = brightnesses + br;
      });
      // console.log("밝기 : ", brightnesses, brightnesses.length);
      let saturation = parseInt(saturations / 5.0);
      saturation = ((saturation + 1) * 10.0) / 256.0 - 5;
      setSaturation(saturation);
      let brightness = parseInt(brightnesses / 5.0);
      brightness = ((brightness + 1) * 10.0) / 256.0 - 5;
      setBrightness(brightness);
      // console.log(brightnesses);

      let temp = { red: 0, blue: 0 };
      Color.palette(results, 100).map((color) => {
        color = color.replace("#", "");
        var bigint = parseInt(color, 16);
        // console.log("온드 인트 : ", bigint);
        var r = (bigint >> 16) & 255;
        var g = (bigint >> 8) & 255;
        var b = bigint & 255;
        // console.log(r, g, b);
        let red;
        let blue;
        if (r < 200 && b < 200 && g < 200) {
          red = r > b ? 1 : 0;
          blue = b > r ? 1 : 0;
          temp.red = temp.red + red;
          temp.blue = temp.blue + blue;
        }
        return {
          red,
          blue,
        };
      });
      // console.log(temp);
      let temperature = parseInt(
        (temp.red * ((temp.red + temp.blue) / 100) -
          temp.blue * ((temp.red + temp.blue) / 100)) *
          0.05
      );
      // console.log("color 안에서 ", saturation, brightness, temperature);
      // setPaletteColors([...colors]);
      // console.log(colors);

      setTemperature(temperature);
    });
    // console.log(paletteColors);
  };

  const isValied = () => {
    if (
      productName === "" ||
      productDesc === "" ||
      startPrice === "" ||
      height === "" ||
      width === "" ||
      depth === "" ||
      startTime === "" ||
      category === "" ||
      prevs[0] === "" ||
      brightness === 0 ||
      saturation === 0 ||
      temperature === 0
    )
      return false;
    else return true;
  };
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const registerProduct = async () => {
    // setColor(prevs[0]);
    // if (isValied()) {
    // console.log("작품 등록 호출!!");

    // const request = {
    //   productName: productName,
    //   productDesc: productDesc,
    //   startPrice: startPrice,
    //   height: height,
    //   width: width,
    //   depth: depth,
    //   startTime: startTime,
    //   categoryId: category,
    //   brightness: brightness,
    //   saturation: saturation,
    //   temperature: temperature,
    // };

    // console.log(request);
    const formData = new FormData();
    console.log(productImages);
    for (let i = 0; i < productImages.length; i++) {
      formData.append("images", productImages[i]);
    }
    // formData.append("images", productImages);
    // console.log(productImages);
    const blob = new Blob([JSON.stringify(request)], {
      type: "application/json",
    });
    formData.append("request", blob);

    registerPersonalProduct(
      formData,
      (response) => {
        console.log(response);
        //상세 페이지로 이동
        navigate(`/productDetail/${response.data}`);
      },
      (fail) => {
        console.log(fail);
      }
    );

    // } else {
    //   alert("모든 정보를 입력하세요.");
    // }
  };

  return (
    <Grommet theme={GrTheme}>
      <Box>
        <HeaderBox productId={productId} goBack={goBack} />
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
              <StyledText size={titleSize} weight="bold" text="카테고리" />
            </Box>
            <Box width="medium" direction="row" justify="end">
              <Select
                size="10px"
                labelKey="label"
                valueKey={{ key: "value", reduce: true }}
                options={Category}
                placeholder="선택하세요"
                value={category}
                onChange={({ value: nextValue }) => {
                  setCategory(nextValue);
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
          <ImageInput handleImageUpload={handleImageUpload} />
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

          <Box margin={{ top: "20px" }}>
            <StyledText text="Tag" size={titleSize} weight="bold" />
            <Grid columns={{ count: 4, size: "auto" }} gap="xsmall">
              {tags.map((tag, idx) => {
                return (
                  <Button
                    key={tag.id}
                    onClick={() => {
                      !select.includes(tag.id)
                        ? setSelect((select) => [...select, tag.id])
                        : setSelect(
                            select.filter((Button) => Button !== tag.id)
                          );
                    }}
                    SmallThinWhite={!select.includes(tag.id) ? true : false}
                    SmallThinYellow={select.includes(tag.id) ? true : false}
                  >
                    #{tag.name}
                  </Button>
                );
              })}
            </Grid>
          </Box>
          <Box alignSelf="center">
            <Button
              BigBlack
              children={productId ? "작품 수정" : "작품 등록"}
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
                  <Button
                    MediumBlack
                    onClick={registerProduct}
                    children="작품 등록"
                    autoFocus
                  ></Button>
                </Box>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      </Box>
    </Grommet>
  );
};
