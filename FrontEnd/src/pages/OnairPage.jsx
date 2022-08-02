import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Common";

export default function OnairPage() {
  return (
    <div>
      <Link to="/auctionSeller">
        <Button SmallGray>셀러</Button>
      </Link>
      <Link to="/auctionBuyer">
        <Button SmallGray>버이어</Button>
      </Link>
    </div>
  );
}
