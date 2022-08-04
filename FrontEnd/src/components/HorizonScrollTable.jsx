export function HorizonScrollTable(Table) {
    return (
      <div>
        <StyledHorizonTable>
          <Product title="Sample Title" productSrc={SampleProduct} artistSrc={SampleProfile} artist="Artist Name" dueDate={SampleDueDate} dueTime="10" isStart={false} people="0"/>
          <div className="card"><h2>Card</h2></div>
          <div className="card"><h2>Card</h2></div>
          <div className="card"><h2>Card</h2></div>
          <div className="card"><h2>Card</h2></div>
          <div className="card"><h2>Card</h2></div>
          <div className="card"><h2>Card</h2></div>
          <div className="card"><h2>Card</h2></div>
          <div className="card"><h2>Card</h2></div>
          <div className="card"><h2>Card</h2></div>
        </StyledHorizonTable>
      </div>
    )
  }

  export function Product({ title, productSrc, artistSrc, artist, dueDate, dueTime, isStart, people }) {
    return <Box>
        <ProductFrame>
            <ProductImg src={productSrc}></ProductImg>
            <TimeTable>{isStart ? { dueTime } : "실시간"}</TimeTable>
        </ProductFrame>
        <Box direction="row">
            <ArtistImg src={artistSrc}></ArtistImg>
            <div>
                <h2>{artist}</h2>
                <p>{title}</p>
                <p>{isStart ? `${people}명 시청중` : `${dueDate.year}년 ${dueDate.month}월 ${dueDate.day}일 ${dueDate.hour}시 예정`}</p>
            </div>
        </Box>
    </Box>
}