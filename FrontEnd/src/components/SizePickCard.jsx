import styled from "styled-components";

const SizePickFrame = styled`div
    // display:flex;
    // flex-direction:column;
    // justify-content:center;
    // width:152px;
    // height:152px;
    // padding: 14px;
`;

const SizePickButton = styled`button

`;

const SizePickImg = styled`img
    border-radius: 50%;
`;

export function SizePickCard(title, size, img_src) {
    return(
        <SizePickFrame>
            <SizePickButton>
                <SizePickImg src={img_src}>
                    <div>${title}</div>
                    <div>${size}</div>
                </SizePickImg>
            </SizePickButton>
        </SizePickFrame>
    )
}