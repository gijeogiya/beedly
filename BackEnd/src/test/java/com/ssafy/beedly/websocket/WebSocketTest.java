package com.ssafy.beedly.websocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.beedly.config.security.util.JwtUtil;
import com.ssafy.beedly.dto.bid.response.BidMessageResponse;
import com.ssafy.beedly.service.PersonalBidService;
import lombok.SneakyThrows;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;
import org.springframework.messaging.converter.MappingJackson2MessageConverter;
import org.springframework.messaging.simp.stomp.StompFrameHandler;
import org.springframework.messaging.simp.stomp.StompHeaders;
import org.springframework.messaging.simp.stomp.StompSession;
import org.springframework.messaging.simp.stomp.StompSessionHandlerAdapter;
import org.springframework.web.socket.client.standard.StandardWebSocketClient;
import org.springframework.web.socket.messaging.WebSocketStompClient;
import org.springframework.web.socket.sockjs.client.SockJsClient;
import org.springframework.web.socket.sockjs.client.Transport;
import org.springframework.web.socket.sockjs.client.WebSocketTransport;

import java.lang.reflect.Type;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.TimeUnit;

import static com.ssafy.beedly.websocket.TestInfo.*;
import static java.util.Collections.singletonList;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyMap;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.times;

@SpringBootTest(webEnvironment =  SpringBootTest.WebEnvironment.RANDOM_PORT)
public class WebSocketTest {

    @LocalServerPort
    private int port;

    @MockBean
    private PersonalBidService personalBidService;

    @MockBean
    private JwtUtil jwtUtil;

    @Autowired
    private ObjectMapper objectMapper;

    private WebSocketStompClient webSocketStompClient;

    private StompSession session;

    private BlockingQueue<String> messageResponses;

    @BeforeEach
    void setUp() {
        StandardWebSocketClient standardWebSocketClient = new StandardWebSocketClient();
        WebSocketTransport webSocketTransport = new WebSocketTransport(standardWebSocketClient);
        List<Transport> transports = singletonList(webSocketTransport);
        SockJsClient sockJsClient = new SockJsClient(transports);
        webSocketStompClient = new WebSocketStompClient(sockJsClient);
        webSocketStompClient.setMessageConverter(new MappingJackson2MessageConverter());
        messageResponses = new LinkedBlockingDeque<>();
    }

    @Test
    @DisplayName("입찰하기")
    void productBidding() throws Exception {
        // given
        given(jwtUtil.getSubject(any()))
                .willReturn("1");

        given(personalBidService.createBid(any(), any()))
                .willReturn(TEST_BID_MESSAGE_RESPONSE);

        // when
        StompHeaders stompHeaders = new StompHeaders();
        stompHeaders.add(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION);
        session = webSocketStompClient
                .connect("ws://localhost:" + port + "/ws-stomp", null, stompHeaders, new StompSessionHandlerAdapter() {
                }, new Object[0]).get(60, TimeUnit.SECONDS);

        stompHeaders = new StompHeaders();
        stompHeaders.add(StompHeaders.DESTINATION, "/sub/auction/personal/1");
        stompHeaders.add(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION);
        session.subscribe(stompHeaders, new StompFrameHandlerImpl<>(messageResponses));

        stompHeaders = new StompHeaders();
        stompHeaders.add(StompHeaders.DESTINATION, String.format("/pub/auction/personal/product/bidding"));
        stompHeaders.add(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION);
        session.send(stompHeaders, TEST_BIDDING_BID_MESSAGE_REQUEST);

        String connect = messageResponses.poll(5, TimeUnit.SECONDS);
        BidMessageResponse result = objectMapper.readValue(connect, BidMessageResponse.class);

        // then
        assertThat(result.getBidPrice()).isEqualTo(TEST_BID_MESSAGE_RESPONSE.getBidPrice());
//        assertThat(result.getUserName()).isEqualTo(TEST_BID_MESSAGE_RESPONSE.getUserName());
//        assertThat(result.getUserNickname()).isEqualTo(TEST_BID_MESSAGE_RESPONSE.getUserNickname());
        then(personalBidService).should(times(1)).createBid(any(), any());
    }

    @Test
    @DisplayName("경매방 첫 입장")
    void enterAuctionRoom() throws Exception {
        // given
        given(jwtUtil.getSubject(any()))
                .willReturn("1");

        given(personalBidService.getLatestBidInfo(any()))
                .willReturn(TEST_BID_MESSAGE_RESPONSE);

        // when
        StompHeaders stompHeaders = new StompHeaders();
        stompHeaders.add(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION);
        session = webSocketStompClient
                .connect("ws://localhost:" + port + "/ws-stomp", null, stompHeaders, new StompSessionHandlerAdapter() {
                }, new Object[0]).get(60, TimeUnit.SECONDS);

        stompHeaders = new StompHeaders();
        stompHeaders.add(StompHeaders.DESTINATION, "/sub/auction/personal/1");
        stompHeaders.add(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION);
        session.subscribe(stompHeaders, new StompFrameHandlerImpl<>(messageResponses));

        stompHeaders = new StompHeaders();
        stompHeaders.add(StompHeaders.DESTINATION, String.format("/pub/auction/personal/product/bidding"));
        stompHeaders.add(HttpHeaders.AUTHORIZATION, TEST_AUTHORIZATION);
        session.send(stompHeaders, TEST_ENTER_BID_MESSAGE_REQUEST);

        String connect = messageResponses.poll(5, TimeUnit.SECONDS);
        BidMessageResponse result = objectMapper.readValue(connect, BidMessageResponse.class);

        // then
        assertThat(result.getBidPrice()).isEqualTo(TEST_BID_MESSAGE_RESPONSE.getBidPrice());
//        assertThat(result.getUserName()).isEqualTo(TEST_BID_MESSAGE_RESPONSE.getUserName());
//        assertThat(result.getUserNickname()).isEqualTo(TEST_BID_MESSAGE_RESPONSE.getUserNickname());
        then(personalBidService).should(times(1)).getLatestBidInfo(any());
    }

    static class StompFrameHandlerImpl<T> implements StompFrameHandler {

        private ObjectMapper objectMapper;
        private BlockingQueue<String> messageResponses;

        public StompFrameHandlerImpl(BlockingQueue<String> messageResponses) {
            this.objectMapper = new ObjectMapper();
            this.messageResponses = messageResponses;
        }

        // payload 를 받을 클래스 타입을 지정
        @Override
        public Type getPayloadType(StompHeaders headers) {
            return byte[].class;
        }

        // payload 가 담길 BlockingQueue 지정
        @SneakyThrows
        @Override
        public void handleFrame(StompHeaders headers, Object payload) {
            String content = new String((byte[]) payload);
            messageResponses.offer(content);
        }
    }
}
