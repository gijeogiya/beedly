import styled from "styled-components";
import { ProductCard } from "../components/ProductCard";

const ProductTable = styled.div`
    display: flex;
    // justify-content: space-around;
    flex-wrap: wrap;
    width: 348px;
`;



export function ArtistDetailProductOngoingTable() {

    return (
        <div style={{"display":"flex", "justifyContent":"center", borderBottom: "1px solid #ebebeb", paddingBottom: "20px",}}>
                         <ProductTable>
                             <ProductCard/>
                             <ProductCard/>
                             <ProductCard/>
                             <ProductCard/>
                             <ProductCard/>
                         </ProductTable>
                     </div>
    );
}