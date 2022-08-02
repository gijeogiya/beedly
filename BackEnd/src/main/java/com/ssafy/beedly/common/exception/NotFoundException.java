package com.ssafy.beedly.common.exception;

public class NotFoundException extends RuntimeException {

    public static final String USER_NOT_FOUND = "존재하지 않는 회원입니다.";
    public static final String PRODUCT_NOT_FOUND = "존재하지 않는 상품입니다.";
    public static final String AUCTION_NOT_FOUND = "존재하지 않는 경매입니다.";
    public static final String ARTIST_NOT_FOUND = "존재하지 않는 작가입니다.";
    public static final String SPECIAL_BOARD_NOT_FOUND = "존재하지 않는 게시글입니다.";

    public NotFoundException(String message) {
        super(message);
    }
}
