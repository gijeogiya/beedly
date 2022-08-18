import { Box, FileInput, Grid, Grommet } from "grommet";
import React, { forwardRef, useState } from "react";
import { useEffect } from "react";
import { StyledText } from "../components/Common";
import {
  FlexBox,
  Input2,
  SizeInput,
  STextArea,
} from "../components/UserStyled";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import styled from "styled-components";
import ImageInputPic from "../assets/images/imageInput.png";
import Button from "../components/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CloseButton from "../assets/images/close.png";
import ImInput from "../assets/icons/imageInput.svg";
import PlusIcon from "../assets/img/PlusIcon.svg";
import "codemirror-colorpicker/dist/codemirror-colorpicker.css";
import { Color, ColorPicker } from "codemirror-colorpicker";
import {
  getPersonalProduct,
  registerPersonalProduct,
  updatePersonalProduct,
} from "../utils/apis/PersonalProductAPI";
import { useLocation, useNavigate } from "react-router-dom";
import { Category } from "../stores/modules/basicInfo";
import { getSearchTag } from "../utils/apis/TagAPI";

const titleSize = "16px";

const HeaderDiv = styled.div`
  margin: 5px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
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
  width: 30vw;
  height: 12vh;
  object-fit: cover;
  border-radius: 10px;
  src: ${(props) => props.src || ""};
`;

const PreviewDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 30vw;
  height: 12vh;
  border-radius: 10px;
  margin: 3px;
  overflow: hidden;
`;

export const BackButton = styled.button`
  background: none;
  font-size: 12px;
  font-family: Noto Sans KR, sans-serif;
  border: 0px;
  width: 10vw;
  margin-top: 10px;
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
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    color: #fff;
  }
`;
const ImageInput = ({ handleImageUpload }) => {
  return (
    <Box width="100%" margin="small">
      <label
        htmlFor="image"
        style={{
          display: "flex",
          alignContent: "space-between",
        }}
      >
        <ImageBtn src={ImInput} />
        <Box direction="row" justify="between" width="90%">
          <Box direction="row">
            <StyledText size={titleSize} weight="bold" text="사진 등록" />
            <img
              src={PlusIcon}
              alt="사진추가"
              style={{
                paddingLeft: "10px",
                height: "15px",
                width: "15px",
                alignSelf: "center",
              }}
            />
          </Box>
          <StyledText
            size="10px"
            color="lightgray"
            text="최대 3장, 최대 1MB"
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
  const [tags, setTags] = useState([]);
  const [select, setSelect] = useState([]);
  const [open, setOpen] = useState(false);
  const [openFail, setOpenFail] = useState(false);
  const [openPostFail, setOpenPostFail] = useState(false);
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

    if (loading) {
      getSearchTag(
        (response) => {
          console.log(response);
          setTags([...response.data]);
        },
        (fail) => {
          console.log(fail);
        }
      );
      if (productId)
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
          urlToFile(data.productImgs);
          setSelect(data.searchTagDtos);
          // handleTags(data.searchTagDtos);
          // setRequest(req);
        });

      setLoading(false);
    }

    const req = {
      productName: productName,
      productDesc: productDesc,
      startPrice: startPrice,
      height: height,
      width: width,
      depth: depth,
      startTime: startTime,
      categoryId: category,
      brightness: brightness,
      saturation: saturation,
      temperature: temperature,
      searchTags: select,
    };
    setRequest(req);

    return () => setLoading(false);
  }, [saturation, temperature, brightness, prevs]);

  // const handleTags = (tagNames) => {
  //   console.log(tagNames);
  //   console.log(tags);
  //   for (let i = 0; i < tagNames.length; i++) {
  //     for (let j = 0; j < tags.length; j++) {
  //       if (tags[j].id === tagNames[i].id) {
  //         console.log(tags[j]);
  //         setSelect([...select, tags[j].id]);
  //       }
  //     }
  //   }
  //   console.log(select);
  // };

  const urlToFile = (urls) => {
    let arr = [];
    urls.map(async (url) => {
      // const response = await fetch(url);
      // const data = await response.blob();
      // const metadata = { type: `image/png`, crossOrigin: "anonymous" };
      var image = new Image();
      image.onload = function () {};
      image.crossOrigin = "Anonymous";
      image.src = url + "?not-from-cache-please";
      // let img = new File([data], metadata);
      // img.toBlob(() => {}, "image/png");
      arr.push(image);
    });
    console.log("arr : ", arr);
    setProductImages([...arr]);
  };

  const DateInputButton = forwardRef(({ value, onClick }, ref) => (
    <button onClick={onClick} ref={ref} style={style3}>
      {value === "" ? "날짜를 선택하세요" : value}
    </button>
  ));

  // const handlePrev = (event, { files }) => {
  //   // console.log("first files:", files);

  //   const fileList = [...files];

  //   const arr = [];
  //   fileList.map((file, idx) => {
  //     let reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = function (e) {
  //       arr.push(e.target.result);
  //     };
  //   });
  //   setProductImages([...files]);
  //   setPrevs([...arr]);
  //   // console.log(productImages);
  // };

  // const handleChangeFile = (event, { files }) => {
  //   // console.log(files);
  //   setProductImages(files);
  //   //fd.append("file", event.target.files)
  //   setPrevs([]);
  //   for (var i = 0; i < files.length; i++) {
  //     if (files[i]) {
  //       let reader = new FileReader();
  //       reader.readAsDataURL(files[i]); // 1. 파일을 읽어 버퍼에 저장합니다.
  //       // 파일 상태 업데이트
  //       reader.onloadend = () => {
  //         // 2. 읽기가 완료되면 아래코드가 실행됩니다.
  //         const base64 = reader.result;
  //         // console.log(base64);
  //         if (base64) {
  //           //  images.push(base64.toString())
  //           var base64Sub = base64.toString();

  //           setPrevs((prevs) => [...prevs, base64Sub]);
  //           //  setImgBase64(newObj);
  //           // 파일 base64 상태 업데이트
  //           //  console.log(images)
  //         }
  //       };
  //     }
  //   }
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

  // const fileToUrlFile = (arr) => {
  //   let fileURLs = [];
  //   let files = [];
  //   let file;
  //   console.log("convert : ", arr);
  //   for (let i = 0; i < arr.length; i++) {
  //     file = arr[i];
  //     files[i] = file;
  //     let reader = new FileReader();
  //     reader.onload = () => {
  //       // console.log(reader.result);
  //       fileURLs[i] = reader.result;
  //       setPrevs([...fileURLs]);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleClickRegister = () => {
    if (isValied())
      if (productId) {
        console.log("수정");
        let prev = productImages[0];
        let reader = new FileReader();
        reader.onload = () => {
          // console.log(reader.result);
          prev = reader.result;
          reader.readAsDataURL(prev);
        };
        setColor(prev);
        setOpen(true);
      } else {
        setColor(prevs[0]);
        setOpen(true);
      }
    else {
      setOpenFail(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenFail(false);
    setOpenPostFail(false);
  };

  const setColor = (url) => {
    // console.log("컬러 찾기 시작", url);
    // console.log("col", Color);
    // console.log(url);
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
      prevs[0] === ""
    )
      return false;
    else return true;
  };
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const handleTitle = (text) => {
    //  console.log(text);
    const MAX_LENGTH = 50;
    if (text.length <= MAX_LENGTH) setProductName(text);
  };

  // const handleSubTitle = (text) => {
  //   //  console.log(text);
  //   const MAX_LENGTH = 50;
  //   if (text.length <= MAX_LENGTH) setSubTitle(text);
  // };

  const handleText = (text) => {
    //  console.log(text);
    const MAX_LENGTH = 300;
    if (text.length <= MAX_LENGTH) setProductDesc(text);
  };

  const registerProduct = async () => {
    // setColor(prevs[0]);
    if (isValied()) {
      // console.log("작품 등록 호출!!");

      let tagsList = [];
      for (let i = 0; i < select.length; i++) {
        tagsList.push(select[i].id);
      }
      const request = {
        productName: productName,
        productDesc: productDesc,
        startPrice: startPrice,
        height: height,
        width: width,
        depth: depth,
        startTime: startTime,
        categoryId: category,
        brightness: brightness,
        saturation: saturation,
        temperature: temperature,
        searchTags: tagsList,
      };

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

      if (productId) {
        updatePersonalProduct(
          productId,
          formData,
          (response) => {
            console.log(response);
            //상세 페이지로 이동
            navigate(`/productDetail/${productId}`);
          },
          (fail) => {
            console.log(fail);
          }
        );
      } else {
        registerPersonalProduct(
          formData,
          (response) => {
            console.log(response);
            //상세 페이지로 이동
            navigate(`/productDetail/${response.data}`);
          },
          (fail) => {
            console.log(fail);
            if (fail.code === "ERR_NETWORK") setOpenPostFail(true);
          }
        );
      }
    } else {
      console.log(
        productName,
        productDesc,
        startPrice,
        height,
        width,
        depth,
        startTime,
        category,
        prevs[0],
        brightness,
        saturation,
        temperature
      );
    }
  };

  return (
    <Grommet theme={GrTheme}>
      <Box direction="row" justify="center" align="center">
        <Box width="85vw">
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
                    handleTitle(e.target.value);
                  }}
                />
              </Box>
            </Box>
            <Box margin="small" direction="row">
              <Box width="small" justify="center">
                <StyledText size={titleSize} weight="bold" text="카테고리" />
              </Box>
              <Box width="medium" direction="row" justify="end">
                {/* <Select
                size="10px"
                labelKey="label"
                valueKey={{ key: "value", reduce: true }}
                options={Category}
                placeholder="선택하세요"
                value={category}
                onChange={({ value: nextValue }) => {
                  setCategory(nextValue);
                }}
              /> */}
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="category">카테고리</InputLabel>
                  <Select
                    labelId="category"
                    id="category-select"
                    value={category}
                    label="카테고리"
                    onChange={(e) => {
                      setCategory(e.target.value);
                    }}
                  >
                    {Category.map((cat, idx) => (
                      <MenuItem key={idx} value={cat.value}>
                        {cat.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box margin="small" direction="row" style={{ marginRight: "3vw" }}>
              <Box width="small" justify="center">
                <StyledText size={titleSize} weight="bold" text="경매 시작가" />
              </Box>
              <Box width="medium" direction="row" justify="center">
                <Input2
                  Thin
                  disabled={productId ? true : false}
                  placeholder="경매 시작가를 입력하세요."
                  value={startPrice}
                  onChange={(e) => {
                    const onlyNumber = e.target.value.replace(/[^0-9]/g, "");
                    setStartPrice(onlyNumber);
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
            <Box
              margin={{
                vertical: "large",
                horizontal: "small",
              }}
              justify="end"
              direction="row"
            >
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
            <Box
              margin="small"
              direction="row"
              justify="between"
              align="center"
              style={{ marginTop: "15px", marginBottom: "15px" }}
            >
              <Box alignSelf="center">
                <StyledText size={titleSize} weight="bold" text="사이즈" />
              </Box>
              <Box direction="row">
                <Box direction="row" margin={{ left: "small" }}>
                  <Box justify="center">
                    <StyledText text="가로" />
                  </Box>
                  <Box direction="row" justify="end">
                    <SizeInput
                      Thin
                      value={width}
                      onChange={(e) => {
                        const onlyNumber = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        setWidth(onlyNumber);
                      }}
                    />
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
                        const onlyNumber = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        setHeight(onlyNumber);
                      }}
                    />
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
                        const onlyNumber = e.target.value.replace(
                          /[^0-9]/g,
                          ""
                        );
                        setDepth(onlyNumber);
                      }}
                    />
                  </Box>
                  <Box justify="center">
                    <StyledText text="(cm)" />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box margin="small">
              <StyledText text="작품 설명" size={titleSize} weight="bold" />
              <STextArea
                placeholder="작가님이 작품에 대해 하고싶은 이야기들을 작성해주세요"
                onChange={(e) => handleText(e.target.value)}
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
            <Box direction="row" justify="start">
              {prevs.map((image, idx) => {
                return <Preview src={image} key={idx} />;
              })}
            </Box>

            <Box margin={{ top: "20px", left: "15px" }}>
              <StyledText text="Tag" size={titleSize} weight="bold" />
              <FlexBox Column_C>
                <FlexBox
                  Row_S
                  style={{
                    flexWrap: "wrap",
                    padding: "6px 10px",
                    width: "88vw",
                  }}
                >
                  {tags.map((tag, idx) => (
                    <Button
                      key={idx}
                      onClick={() => {
                        !select.some((v) => v.id === tag.id)
                          ? setSelect((select) => [...select, tag])
                          : setSelect(
                              select.filter((Button) => Button.id !== tag.id)
                            );
                      }}
                      TagGray={
                        !select.some((v) => v.id === tag.id) ? true : false
                      }
                      TagYellow={
                        select.some((v) => v.id === tag.id) ? true : false
                      }
                      style={{
                        margin: "6px 3px ",
                        wordWrap: "break-word",
                        minWidth: "22%",
                        padding: "5px 3px",
                      }}
                    >
                      # {tag.searchTagName}
                    </Button>
                  ))}
                </FlexBox>
              </FlexBox>
              {/* <Grid columns={{ count: 4, size: "auto" }} gap="xsmall">
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
                    #{tag.searchTagName}
                  </Button>
                );
              })}
            </Grid> */}
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
                    <StyledText
                      text={`작품을 ${
                        productId ? "수정" : "등록"
                      }하시겠습니까?`}
                      weight="bold"
                    />
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
                    <StyledText
                      text={`모든 정보를 입력하세요.`}
                      weight="bold"
                    />
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
              <Dialog
                open={openPostFail}
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
                    <StyledText text={`등록 실패`} weight="bold" />
                    <p />
                    <StyledText
                      text="사진 크기가 너무 큽니다. (1MB 이하만 첨부 가능합니다)"
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
          </Box>
        </Box>
      </Box>
    </Grommet>
  );
};
