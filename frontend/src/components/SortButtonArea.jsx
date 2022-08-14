import styled from "styled-components";
import SortIcon from '../assets/img/SortIcon.svg';

const SortButton = styled.button`
    border: 0;
    background-color: white;
    font-size: 12px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-weight: 700;
`;

const SortImg = styled.img`
    width: 13px;
    padding-left: 3px;
    padding-top: 2px;
`;

export function SortButtonArea() {
    return (
        <div style={{width:"90vw", display:"flex", flexDirection:"row", justifyContent:"flex-end", paddingTop:"10px"}}>
            <SortButton>
                <div>
                    인기순
                </div>
                <SortImg src={SortIcon} />
            </SortButton>
        </div>
    )
}