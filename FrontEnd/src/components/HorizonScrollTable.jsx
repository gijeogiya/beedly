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

export function HorizonScrollRowTable() {
  return (
    <StyledHorizonTable>
      <div className='card'><ProductCard/></div>
      <div className='card'><ProductCard/></div>
      <div className='card'><ProductCard/></div>
      <div className='card'><ProductCard/></div>
      <div className='card'><ProductCard/></div>
      <div className='card'><ProductCard/></div>
      <div className='card'><ProductCard/></div>
      <div className='card'><ProductCard/></div>
      <div className='card'><ProductCard/></div>
      <div className='card'><ProductCard/></div>
      <div className='card'><ProductCard/></div>
      <div className='card'><ProductCard/></div>
      <div className='card'><ProductCard/></div>
      <div className='card'><ProductCard/></div>
      <div className='card'><ProductCard/></div>
      <div className='card'><ProductCard/></div>
      <div className='card'><ProductCard/></div>
      <div className='card'><ProductCard/></div>
      <div className='card'><ProductCard/></div>
      <div className='card'><ProductCard/></div>
      <div className='card'><ProductCard/></div>
    </StyledHorizonTable>
  )
}

export function HorizonScrollColTable() {
  return (
    <StyledHorizonTable>
      <div className='card'><ArtistCard/></div>
      <div className='card'><ArtistCard/></div>
      <div className='card'><ArtistCard/></div>
      <div className='card'><ArtistCard/></div>
      <div className='card'><ArtistCard/></div>
      <div className='card'><ArtistCard/></div>
      <div className='card'><ArtistCard/></div>
      <div className='card'><ArtistCard/></div>
      <div className='card'><ArtistCard/></div>
      <div className='card'><ArtistCard/></div>
      <div className='card'><ArtistCard/></div>
      <div className='card'><ArtistCard/></div>
      <div className='card'><ArtistCard/></div>
      <div className='card'><ArtistCard/></div>
      <div className='card'><ArtistCard/></div>
      <div className='card'><ArtistCard/></div>
      <div className='card'><ArtistCard/></div>
      <div className='card'><ArtistCard/></div>
      <div className='card'><ArtistCard/></div>
      <div className='card'><ArtistCard/></div>
      <div className='card'><ArtistCard/></div>
    </StyledHorizonTable>
  )
}

