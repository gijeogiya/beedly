import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ProductCard, ArtistCard } from '../components/ScrollableCard'

const StyledHorizonTable = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  padding-left: 20px;
  padding-right: 120px;
  &::-webkit-scrollbar {
    display: none;
  }

  .card {
    display: inline-block;
  }
`;

export function HorizonScrollRowTable({ list }) {
  const Navigate = useNavigate('');
  const GoProductDetail = (id) => {
    Navigate(`/productDetail/${id}`)
  }
  return (
    <StyledHorizonTable>
      {list.map((product, idx) =>
        <div className='card' key={idx} onClick={(e) => GoProductDetail(product.id)} value={product.id}><ProductCard product={product} /></div>
      )}
    </StyledHorizonTable>
  )
}

export function HorizonScrollColTable({ list }) {
  const Navigate = useNavigate('');
  const GoArtistDetail = (id) => {
    // Navigate(`/productDetail/${id}`)
  }
  return (
    <StyledHorizonTable>
      {list.map((artist, idx) =>
        <div className='card' key={idx} onClick={(e) => GoArtistDetail(artist.id)}><ArtistCard artist={artist} /></div>
      )}
    </StyledHorizonTable>
  )
}

