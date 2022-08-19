import React, { useEffect } from "react";

export const Payment = (effect, deps) => {
  const onClickPayMent = () => {
    const { IMP } = window;
    IMP.init("imp10157701");
    const data = {
      pg: "kakaopay",
      pay_method: "card", //생략 가능
      merchant_uid: "order_no_0001", // 상점에서 관리하는 주문 번호
      name: "주문명:결제테스트",
      amount: 14000,
      buyer_email: "iamport@siot.do",
      buyer_name: "구매자이름",
      buyer_tel: "010-1234-5678",
      buyer_addr: "서울특별시 강남구 삼성동",
      buyer_postcode: "123-456",
    };
    IMP.request_pay(data, callback);
  };

  const callback = (response) => {
    console.log(response);
    const {
      success,
      error_msg,
      imp_uid,
      merchant_uid,
      pay_method,
      paid_amount,
      status,
    } = response;
    if (success) {
      //결제 성공
      alert("결제 성공");
    } else {
      alert(`결제 실패 : ${error_msg}`);
    }
  };

  return <div>Payment</div>;
};
