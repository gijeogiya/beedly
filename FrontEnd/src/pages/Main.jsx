import React from 'react'
import { CategoryBar } from '../components/MainCategoryBar'
import { BannerTable } from '../components/MainBanner'
import { ProductCard, ArtistCard } from '../components/ScrollableCard'


export function MainPage() {
  return (
    <div>
      <CategoryBar/>
      <BannerTable/>
      <ProductCard/>
      <ArtistCard/>
      
    </div>
  )
}