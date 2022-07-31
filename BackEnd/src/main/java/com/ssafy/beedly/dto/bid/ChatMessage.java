package com.ssafy.beedly.dto.bid;

import com.ssafy.beedly.dto.bid.type.MessageType;
import lombok.Data;

@Data
public class ChatMessage {

    private MessageType type;
    private String roomId;
    private String sender;
    private String message;

}
