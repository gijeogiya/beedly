import styled from "styled-components";

const SizePickFrame = styled.div`
  padding-top: 14px;
  padding-right: 10px;
  padding-left: 10px;
`;

const SizePickButton = styled.button`
  background-color: white;
  border: 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 152px;
  height: 152px;
`;

const SizePickText = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
`;

export function SizePickCard({
  title,
  size,
  background_color,
  onClick,
  ...props
}) {
  return (
    <SizePickFrame onClick={onClick} {...props}>
      <SizePickButton style={background_color}>
        <SizePickText>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "900",
              color: "#1f1d1d",
              padding: "10px",
            }}
          >
            {title}
          </div>
          <div
            style={{ fontSize: "14px", fontWeight: "500", color: "#1f1d1d" }}
          >
            {size}
          </div>
        </SizePickText>
      </SizePickButton>
    </SizePickFrame>
  );
}
