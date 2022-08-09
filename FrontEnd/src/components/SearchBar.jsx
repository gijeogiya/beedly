import styled from "styled-components";
import SearchingIcon from '../assets/img/SearchingIcon.svg';


const SearchWarp = styled.div`
    padding: 12px 24px;
    border-bottom: 1px solid #ebebeb;
    
`;

const SearchArea = styled.div`
    height: 40px;
    background-color: #f4f4f4;
    border-radius 8px;
`;

const SearchForm = styled.form`
    display: flex;
    flex-direction: row
    justfiy-content: space-between;
`;

const SearchTextInput = styled.input`
    padding: 0 40px 0 20px;
    height: 40px;
    outline: none;
    flex: 1;
    border: 0;
    background-color: #f4f4f4;
    border-radius 8px;
    font-weight: 700;
    font-size: 15px;
    color: D9D9D9;
    `;

const SearchSummitButton = styled.button`
    display: inline-block;
    position: center;
    height: 40px;
    outline: none;
    flex: 1;
    border: 0;
    background-color: #f4f4f4;
    border-radius 8px;
    `;



export function SearchBar({ handleSubmit, value, setValue }) {
    const handleChange = (e) => {
      setValue(e.target.value);
    };
  
    return (
        <SearchWarp>
            <SearchArea>
                <SearchForm onSubmit={handleSubmit}>
                    <SearchTextInput 
                    type="text"
                    name="value"
                    placeholder="작품명, 작가명 등"
                    value={value}
                    onChange={handleChange}
                    />
                    <SearchSummitButton type="submit"><img src={SearchingIcon} style={{"height":"24px", "padding": "6px 0 6px 0"}}/></SearchSummitButton>
                </SearchForm>
            </SearchArea>

        </SearchWarp>
    );
  }