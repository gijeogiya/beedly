package com.ssafy.beedly.common.exception;

public class NotMatchException extends RuntimeException {

    public static final String PRODUCT_OWNER_NOT_MATCH = "본인의 상품이 아닙니다.";
    public static final String SPECIAL_BOARD_OWNER_NOT_MATCH = "본인의 게시글이 아닙니다.";

    public NotMatchException(String message) {
        super(message);
    }
}
