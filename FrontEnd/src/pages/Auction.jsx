import Reac, { useState, useEffect } from 'react'
import { AuctionArtistFrame } from "../components/Common";


const MainContent = styled.div`
  width: 100%;
  height: 100%;
`

export const Auction = () => {
    return (
        <MainContent>
            <AuctionArtistFrame />
        </MainContent>
    )
}
