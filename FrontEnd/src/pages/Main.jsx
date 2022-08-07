import React from "react";
import { useSelector } from "react-redux";

export default function Main() {
  const userid = useSelector(state => state.user.user.userId);
  return (
    <div>
      Main
      <button>옥션페이지로 이동</button>
      {userid}
    </div>
  );
}
