package com.ssafy.beedly.common.exception;

public class NotFoundException extends RuntimeException {

    public static final String USER_NOT_FOUND = "존재하지 않는 회원입니다.";
    public static final String PRODUCT_NOT_FOUND = "존재하지 않는 상품입니다.";
    public static final String AUCTION_NOT_FOUND = "존재하지 않는 경매입니다.";
    public static final String ARTIST_NOT_FOUND = "존재하지 않는 작가입니다.";
    public static final String SPECIAL_BOARD_NOT_FOUND = "존재하지 않는 게시글입니다.";
    public static final String ABSENTEE_BID_NOT_FOUND = "존재하지 않는 정보입니다.";
    public static final String CATEGORY_NOT_FOUND = "존재하지 않는 카테고리입니다.";
    public static final String TAG_NOT_FOUND = "존재하지 않는 태그입니다.";
    public static final String BOARD_NOT_FOUND = "존재하지 않는 게시물입니다.";
    public static final String FAVORITE_NOT_FOUND = "존재하지 않는 찜하기 입니다.";
    public static final String APPROVAL_NOT_FOUND = "존재하지 않는 신청정보입니다.";
    public static final String SOLD_NOT_FOUND = "존재하지 않는 낙찰정보 입니다.";
    public NotFoundException(String message) {
        super(message);
    }
}
