import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import SearchingIcon from '../assets/img/SearchingIcon.svg';
import XIcon from '../assets/img/XIcon.svg';


const SearchWarp = styled.div`
    padding: 12px 24px;
    border-bottom: 1px solid #ebebeb;
    display: flex;
    
`;

const SearchArea = styled.div`
    height: 40px;
    background-color: #f4f4f4;
    border-radius: 8px;
    display: flex;
    width: 90%;
`;

const SearchForm = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const SearchTextInput = styled.input`
    font-color: black;
    padding: 0 40px 0 10px;
    height: 40px;
    outline: none;
    flex: 1;
    border: 0;
    background-color: #f4f4f4;
    border-radius: 8px;
    font-weight: 700;
    font-size: 15px;
    color: black;
    `;

// const SearchSummitButton = styled.button`
//     display: inline-block;
//     position: center;
//     height: 40px;
//     outline: none;
//     flex: 1;
//     border: 0;
//     background-color: #f4f4f4;
//     border-radius 8px;
//     `;



export function SearchBar() {
    const Navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const handleChange = (e) => {
        console.log(e.target.value)
        setKeyword(e.target.value);
    };
    const HandleSubmit = (e) => {
        e.preventDefault();
        const data = {
            searchCategory: "keyword",
            keyword: keyword,
        };
        Navigate("/searchResult", { state: data });
    }
    return (
        <SearchWarp>
            <SearchArea>
                <SearchForm onSubmit={(e) => HandleSubmit(e)}>
                    <img src={SearchingIcon} alt='Searching Icon' style={{ "height": "20px", "padding": "10px 0 10px 10px" }} />
                    <SearchTextInput
                        type="text"
                        placeholder="작품명, 작가명 등"
                        value={keyword}
                        onChange={handleChange}
                    />
                </SearchForm>
            </SearchArea>
            <button style={{"border":"0", "backgroundColor":"white", "paddingLeft":"15px"}}>
                <img src={XIcon} style={{"width":"18px"}}/>
            </button>
        </SearchWarp>
    );
}