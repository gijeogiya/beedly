import React from "react";
import styled from "styled-components";
import { ArtistDetailBar } from "../components/ArtistDetailBar";
import { ArtistDetailCard } from "../components/ArtistDetailCard";
import { ArtistDetailProductOngoingTable } from "../components/ArtistDetailProductOngoingTable";
import { ArtistDetailProductClosedTable } from "../components/ArtistDetailProductClosedTable";


export default function ArtistDetailPage() {
    return (
        <div>
            <ArtistDetailBar/>
            <ArtistDetailCard/>
            <ArtistDetailProductOngoingTable/>
            <ArtistDetailProductClosedTable/>
        </div>


    )
}































// import React from 'react';
// import styled from "styled-components";
// import { SearchBar } from "../components/SearchBar";
// import { SizePickCard } from "../components/SizePickCard";
// import { RecommendKeywordTable, RecentlyKeywordTable } from "../components/KeywordTable";
// import { HorizonScrollColTable } from "../components/HorizonScrollTable";
// import { ProductCard } from "../components/ProductCard";

// const StyledTableTitle = styled.div`
//   font-size: 16px;
//   color: #1f1d1d;
//   padding-top: 20px;
//   padding-left: 20px;
//   font-weight: 900;
// `;


// const SizePickCardTable = styled.div`
//     display: flex;
//     justify-content:center;
// `;

// const ProductTable = styled.div`
//     display: flex;
//     // justify-content: space-around;
//     flex-wrap: wrap;
//     width: 348px;
// `;

// export default function SearchPage() {
//     return (
//         // 검색 전 화면
//         // <div style={{"paddingBottom":"40px"}}>
//         //     <SearchBar/>
//         //     <StyledTableTitle>최근 검색어</StyledTableTitle>
//         //     <RecentlyKeywordTable/>
//         //     <StyledTableTitle>추천 검색어</StyledTableTitle>
//         //     <RecommendKeywordTable/>
//         //     <StyledTableTitle>Size Pick!</StyledTableTitle>
//         //     <SizePickCardTable>
//         //         <SizePickCard title={"Small Size"} size={"~70cm"} background_color={{"background-color":"#EBF0F5"}}/>
//         //         <SizePickCard title={"Medium Size"} size={"70cm~90cm"} background_color={{"background-color":"#F6EEED"}}/>
//         //     </SizePickCardTable>
//         //     <SizePickCardTable>
//         //         <SizePickCard title={"Large Size"} size={"90cm~120cm"} background_color={{"background-color":"#F1F1EA"}}/>
//         //         <SizePickCard title={"XLarge Size"} size={"120cm~"} background_color={{"background-color":"#F5F5F5"}}/>
//         //     </SizePickCardTable>
//         //     <StyledTableTitle></StyledTableTitle>
//         // </div>


//         // 검색 후 화면
//             <div style={{"paddingBottom":"40px"}}>
//                 <SearchBar/>
//                 <StyledTableTitle>검색 결과</StyledTableTitle>
//                 <StyledTableTitle>Artist</StyledTableTitle>
//                 <HorizonScrollColTable />
//                 <StyledTableTitle>Product</StyledTableTitle>
//                     <div style={{"display":"flex", "justifyContent":"center"}}>
//                         <ProductTable>
//                             <ProductCard/>
//                             <ProductCard/>
//                             <ProductCard/>
//                             <ProductCard/>
//                             <ProductCard/>
//                             <ProductCard/>
//                             <ProductCard/>
//                         </ProductTable>
//                     </div>
//             </div>
//     )
// }
