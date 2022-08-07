package com.ssafy.beedly.common.exception;

public class NotExistException extends RuntimeException{

    public NotExistException(String message) {
        super(message);
    }
}
