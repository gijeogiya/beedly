import { Spinner } from "grommet";
import { FlexBox } from "./UserStyled";

function Loading() {
  return (
    <FlexBox MainContent>
      <div>잠시만 기다려주세요:)</div>
      <br />
      <Spinner />
    </FlexBox>
  );
}

export default Loading;
