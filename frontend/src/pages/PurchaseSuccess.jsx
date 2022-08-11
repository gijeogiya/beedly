import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getPurchaseProduct } from "../utils/apis/UserAPI"

export const PurchaseSuccess = () => {
  const location = useLocation();
  const { soldId } = location.state;
  const { auctionType } = location.state;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) getPurchaseInfo();

    return () => setLoading(false);
  });

  const getPurchaseInfo = () => {
    const params = {
      productSoldId: soldId,
      auctionType: auctionType,
    };
    getPurchaseProduct(
      params,
      (response) => {
        console.log(response);
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  return <div>hi</div>;
};
