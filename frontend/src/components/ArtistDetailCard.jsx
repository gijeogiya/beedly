import styled from "styled-components";
import SampleProfile from '../assets/img/SampleProfile.png';
import SampleBackground from '../assets/img/SampleBackground.png';

const ArtistDetailBackgroundImg = styled.img`
    object-fit: cover;
    width: 100%;
    height: 180px;
    
}

`;

const ArtistDetailMainInf = styled.div`

`;

const ArtistDetailSubInf = styled.div`

`;

export function ArtistDetailCard() {

    return (
        <div>
            <ArtistDetailBackgroundImg src={SampleBackground}/>
            <ArtistDetailMainInf></ArtistDetailMainInf>
            <ArtistDetailSubInf></ArtistDetailSubInf>
        </div>
    );
}