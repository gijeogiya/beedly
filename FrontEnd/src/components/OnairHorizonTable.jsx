import { Product } from '../components/Common';
import styled from 'styled-components';
import SampleProduct from '../assets/img/SampleProduct.png';
import SampleProfile from '../assets/img/SampleProfile.png';

const StyledTableTitle = styled.div`
  font-size: 16px;
  color: #1F1D1D;
  padding-left: 14px;
  padding-top: 14px;
  font-weight: 900;
`;

const StyledTableSubtitle = styled.div`
    font-size: 16px;
    padding-left: 14px;
    font-weight: 500;
    color: rgba(31, 29, 29, 0.4);
`;

const StyledHorizonTable = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  &::-webkit-scrollbar {
    display: none;
  }

  .card {
    display: inline-block;
    padding-left: 14px;
  }
`;

const SampleDueDate = {
  year: "2022",
  month: "8",
  day: "22",
  hour: "8"
}

export function OnairHorizonTable() {
    return (
      <div>
        <StyledTableTitle>On Air</StyledTableTitle>
        <StyledTableSubtitle>지금 진행중인 개인경매</StyledTableSubtitle>
        <StyledHorizonTable>
          <Product title="Sample Title" productSrc={SampleProduct} artistSrc={SampleProfile} artist="Artist Name" dueDate={SampleDueDate} dueTime="10" isStart={false} people="0"/>
          <div className="card"><h2>Card</h2></div>
          <div className="card"><h2>Card</h2></div>
          <div className="card"><h2>Card</h2></div>
          <div className="card"><h2>Card</h2></div>
          <div className="card"><h2>Card</h2></div>
          <div className="card"><h2>Card</h2></div>
          <div className="card"><h2>Card</h2></div>
          <div className="card"><h2>Card</h2></div>
          <div className="card"><h2>Card</h2></div>
        </StyledHorizonTable>
      </div>
    )
  }

  