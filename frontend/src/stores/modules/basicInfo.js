export const Category = [
  { label: "선택하세요", value: 0 },
  { label: "회화", value: 1 },
  { label: "판화", value: 2 },
  { label: "에디션", value: 3 },
  { label: "사진", value: 4 },
  { label: "입체", value: 5 },
];

export const moneyFormat = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const stringToDate = (string) => {
  // console.log(string);
  const date = string.split("T");
  const yyyyMMdd = date[0].split("-");
  const HHmm = date[1].split(":");
  return `${yyyyMMdd[0]}년 ${parseInt(yyyyMMdd[1])}월 ${parseInt(
    yyyyMMdd[2]
  )}일  ${parseInt(HHmm[0])}시 ${
    parseInt(HHmm[1]) !== 0 ? `${parseInt(HHmm[1])}분` : ``
  } 예정`;
  // return date.toString("yyyy년 MM월 dd일 HH시 mm분 예정");
};
