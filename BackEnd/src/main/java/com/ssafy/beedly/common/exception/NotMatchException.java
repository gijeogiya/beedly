package com.ssafy.beedly.common.exception;

public class NotMatchException extends RuntimeException {

    public static final String PRODUCT_OWNER_NOT_MATCH = "본인의 상품이 아닙니다.";
    public static final String SPECIAL_BOARD_OWNER_NOT_MATCH = "본인의 게시글이 아닙니다.";
    public static final String AUCTION_NOT_MATCH = "본인의 경매가 아닙니다.";
    public static final String CONTENT_TYPE_NOT_MATCH = "첨부파일 형식이 맞지 않습니다.";
    public static final String IMG_COUNT_NOT_MATCH = "이미지 최대 개수가 넘었습니다.";
    public static final String FAVORITE_NOT_MATCH = "본인의 찜하기가 아닙니다.";
    public static final String SOLD_NOT_MATCH = "본인의 낙찰 상품이 아닙니다.";

    public NotMatchException(String message) {
        super(message);
    }
}
