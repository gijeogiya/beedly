import styled from 'styled-components';

const StyledCategoryTable = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  border-bottom:2px solid #ebebeb;
`;

const StyledCategory = styled.div`
  display: inline;
  padding: 0 10px;
  justify-content: center;
  font-size: 16px;
`;

export function OnairPageCategoryBar() {
    return (
        <nav>
          <StyledCategoryTable>
            <StyledCategory>ALL</StyledCategory>
            <StyledCategory>회화</StyledCategory>
            <StyledCategory>판화</StyledCategory>
            <StyledCategory>에디션</StyledCategory>
            <StyledCategory>사진</StyledCategory>
            <StyledCategory>입체</StyledCategory>
          </StyledCategoryTable>
        </nav>
    );
  }