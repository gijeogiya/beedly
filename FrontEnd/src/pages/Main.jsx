import React from 'react'

export default function Main() {
  return (
    <div>Main</div>
  )
}

const CategoryBarStyle = {
  margin: "10px"
}

const CategoryTableStyle = {
  // listStyle: "none",
  // text_align: "center",
  // border_top: "1px solid black",
  // border_bottom: "1px solid black",
  padding: "10px 0"
}

const CategoryStyle = {
  textDecoration: "none",
  color: "black"
}

export function CategoryBar() {
  return (
      <nav style={CategoryBarStyle}>
        <ul style={CategoryTableStyle}>
          <li style={CategoryStyle}>회화</li>
          <li style={CategoryStyle}>판화</li>
          <li style={CategoryStyle}>에디션</li>
          <li style={CategoryStyle}>사진</li>
          <li style={CategoryStyle}>입체</li>
        </ul>
      </nav>
  );
}