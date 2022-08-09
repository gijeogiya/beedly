import React from 'react'
import { SearchBar } from "../components/SearchBar";
import { SizePickCard } from "../components/SizePickCard"
import MugSize from '../assets/img/MugSize.png';
// import { LaptopSizeImg } from '../assets/img/LaptopSize.jpg';
// import { TVSizeImg } from '../assets/img/TVSize.png';
// import { BedSizeImg } from '../assets/img/BedSize.png';

export default function SearchPage() {
    return (
        <div>
            <SearchBar/>
            <SizePickCard title={"Mug Size"} size={"~30cm"} img_src={MugSize}/>
        </div>
    )
}
