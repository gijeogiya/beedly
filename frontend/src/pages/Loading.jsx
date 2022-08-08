import React from 'react'
import { Spinner } from 'grommet'
import { FlexBox } from '../components/UserStyled'

export default function Loading() {
    return (
        <FlexBox MainContent>
            <h4>로그인 중입니다.</h4>
            <br />
            <Spinner />

        </FlexBox>
    )
}
