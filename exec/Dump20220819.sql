-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: i7a601.p.ssafy.io    Database: beedly
-- ------------------------------------------------------
-- Server version	8.0.30-0ubuntu0.20.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `absentee_bid`
--

DROP TABLE IF EXISTS `absentee_bid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `absentee_bid` (
  `absentee_bid_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `absentee_bid_price` int DEFAULT NULL,
  `p_product_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`absentee_bid_id`),
  KEY `FKffbixnhdfo4tqav8g3bcl94pt` (`p_product_id`),
  KEY `FKk6m7fsyhsa5domtoj0jsqe770` (`user_id`),
  CONSTRAINT `FKffbixnhdfo4tqav8g3bcl94pt` FOREIGN KEY (`p_product_id`) REFERENCES `personal_product` (`p_product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKk6m7fsyhsa5domtoj0jsqe770` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `absentee_bid`
--

LOCK TABLES `absentee_bid` WRITE;
/*!40000 ALTER TABLE `absentee_bid` DISABLE KEYS */;
INSERT INTO `absentee_bid` VALUES (16,'2022-08-18 15:37:10','2022-08-18 15:37:10',1400000,107,17),(18,'2022-08-19 00:23:09','2022-08-19 00:23:09',350000,99,1),(19,'2022-08-19 01:24:08','2022-08-19 01:24:08',150000,144,27),(20,'2022-08-19 01:33:32','2022-08-19 01:33:56',1000000,108,16);
/*!40000 ALTER TABLE `absentee_bid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artist`
--

DROP TABLE IF EXISTS `artist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artist` (
  `artist_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `artist_bg_img` varchar(200) DEFAULT NULL,
  `artist_desc` varchar(1000) DEFAULT NULL,
  `artist_profile_img` varchar(200) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `favorite_count` int DEFAULT NULL,
  PRIMARY KEY (`artist_id`),
  KEY `FKefakh2px4coqqt25pja7bhvhw` (`user_id`),
  CONSTRAINT `FKefakh2px4coqqt25pja7bhvhw` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist`
--

LOCK TABLES `artist` WRITE;
/*!40000 ALTER TABLE `artist` DISABLE KEYS */;
INSERT INTO `artist` VALUES (1,'2022-08-12 15:27:45','2022-08-19 00:58:50','https://beedly-img.s3.ap-northeast-2.amazonaws.com/5e70a34f-90c0-41c2-b3c9-a58fbc40ff7d','안녕하세요. 저는 여행을 좋아해요.\n풍경과 자연을 자주 그린답니다.','https://beedly-img.s3.ap-northeast-2.amazonaws.com/d3639f19-bc4b-4009-b5cc-b9b89f8dfebc',1,4),(14,'2022-08-11 04:06:38','2022-08-18 07:08:55','https://beedly-img.s3.ap-northeast-2.amazonaws.com/eb9e40d9-a9f9-41cd-9c5c-75a916eb4342','안녕하세요✨\n행복을 그리는 작가 쥴리입니다! :)??      \n제그림으로 온 세상을 따듯하게 만들고 싶어요?‍♀️','https://beedly-img.s3.ap-northeast-2.amazonaws.com/bb4bff2e-7cf5-4725-bd40-b56259f2937a',8,4),(17,'2022-08-11 05:03:33','2022-08-19 01:39:04','https://beedly-img.s3.ap-northeast-2.amazonaws.com/fb7ac6db-9594-4e21-99c6-665458242155','안녕하세요, 즐거운 작품 활동을 하고 있는 신인 아티스트 차유입니다:) 우리 자주 만나요?','https://beedly-img.s3.ap-northeast-2.amazonaws.com/49979e41-063f-44ee-b075-219d21f1bf20',16,4),(19,'2022-08-18 02:52:26','2022-08-19 01:02:42','https://beedly-img.s3.ap-northeast-2.amazonaws.com/5cb28bce-fd8c-4d6d-b9c8-87f4faa0185d','안녕하세요 저는 미술작품을 사러 들어왔다가. 엥? 저도 할 수 있겠는데? 라는 마음에 작가 생활을 시작하게 된 자취생 에릭입니다!!!','https://beedly-img.s3.ap-northeast-2.amazonaws.com/4599002e-8ee6-491d-a75e-f6d49d78b240',17,1),(22,'2022-08-18 14:39:30','2022-08-18 16:17:39','https://beedly-img.s3.ap-northeast-2.amazonaws.com/17756da2-a66e-4bda-809b-969f1b2e4ae5','안녕하세요 햄토리입니다?','https://beedly-img.s3.ap-northeast-2.amazonaws.com/c83d7e04-a496-48e6-b530-af5b04daaa4a',25,1),(23,'2022-08-19 01:56:01','2022-08-19 01:56:01','https://beedly-img.s3.ap-northeast-2.amazonaws.com/defaultbg.jpg',NULL,'https://beedly-img.s3.ap-northeast-2.amazonaws.com/default.jpg',27,0);
/*!40000 ALTER TABLE `artist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artist_approval`
--

DROP TABLE IF EXISTS `artist_approval`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artist_approval` (
  `artist_approval_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `artist_approval_flag` tinyint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`artist_approval_id`),
  KEY `FKnjscmdgvy0c0lrqj3o04sw4qw` (`user_id`),
  CONSTRAINT `FKnjscmdgvy0c0lrqj3o04sw4qw` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist_approval`
--

LOCK TABLES `artist_approval` WRITE;
/*!40000 ALTER TABLE `artist_approval` DISABLE KEYS */;
INSERT INTO `artist_approval` VALUES (22,'2022-08-11 02:47:58','2022-08-11 04:06:38',1,8),(27,'2022-08-11 05:03:26','2022-08-11 05:03:33',1,16),(28,'2022-08-18 01:50:42','2022-08-18 02:52:26',1,17),(32,'2022-08-18 14:39:22','2022-08-18 14:39:30',1,25),(33,'2022-08-19 01:49:02','2022-08-19 01:54:00',1,1),(34,'2022-08-19 01:55:10','2022-08-19 01:56:01',1,27);
/*!40000 ALTER TABLE `artist_approval` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artist_favorite`
--

DROP TABLE IF EXISTS `artist_favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artist_favorite` (
  `artist_favorite_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `artist_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`artist_favorite_id`),
  KEY `FKafumrbaavuwth46pejhai8qs0` (`artist_id`),
  KEY `FKpmivni4qk20lod40a8h4p5y3p` (`user_id`),
  CONSTRAINT `FKafumrbaavuwth46pejhai8qs0` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`artist_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKpmivni4qk20lod40a8h4p5y3p` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artist_favorite`
--

LOCK TABLES `artist_favorite` WRITE;
/*!40000 ALTER TABLE `artist_favorite` DISABLE KEYS */;
INSERT INTO `artist_favorite` VALUES (18,'2022-08-14 19:10:21','2022-08-14 19:10:21',14,1),(59,'2022-08-18 07:07:13','2022-08-18 07:07:13',14,17),(60,'2022-08-18 10:33:52','2022-08-18 10:33:52',1,17),(61,'2022-08-18 10:33:54','2022-08-18 10:33:54',17,17),(64,'2022-08-18 14:55:53','2022-08-18 14:55:53',1,8),(66,'2022-08-18 15:45:17','2022-08-18 15:45:17',22,17),(67,'2022-08-19 00:55:10','2022-08-19 00:55:10',17,25),(68,'2022-08-19 00:55:15','2022-08-19 00:55:15',1,25),(69,'2022-08-19 01:02:37','2022-08-19 01:02:37',17,1),(70,'2022-08-19 01:02:42','2022-08-19 01:02:42',19,1);
/*!40000 ALTER TABLE `artist_favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `board`
--

DROP TABLE IF EXISTS `board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `board` (
  `board_id` bigint NOT NULL AUTO_INCREMENT,
  `board_title` varchar(255) DEFAULT NULL,
  `board_content` text,
  `board_type` varchar(10) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`board_id`),
  KEY `FKfyf1fchnby6hndhlfaidier1r` (`user_id`),
  CONSTRAINT `FKfyf1fchnby6hndhlfaidier1r` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `board`
--

LOCK TABLES `board` WRITE;
/*!40000 ALTER TABLE `board` DISABLE KEYS */;
INSERT INTO `board` VALUES (14,'[공지] 이용약관 변경 안내','안녕하세요, Beedly 입니다.\n\n항상 Beedly 서비스를 이용해주시는 여러분께 진심으로 감사드리며, 새로운 \'이용약관\' 적용에 대한 사전 안내 말씀 드립니다.\n\n1. 주요 변경 사항\n변경되는 이용약관의 주요 내용은 아래와 같습니다.\n\n제 30조 (청약철회의 제한)\n\n<변경 전>\n1. \"서비스\"에서 \"회원\" 상호 간 이뤄진 \"상품\"의 매매는 개인 간에 이뤄지는 거래로 전자상거래법 제17조에서 정한 청약철회에 따른 환불, 교환이 적용되지 않기 때문에 \"거래체결\" 이후에는 다른 일반 전자 상거래와 달리 단순 변심에 따른 계약 철회, 취소 등이 불가능하고, \"상품\"에 하자가 있는 경우에만 계약 취소 및 환불 청구가 가능합니다. 구매자는 구매 시에 이 점에 대해 반드시 유의하여 진행해 주시기 바랍니다.\n\n<변경 후>\n1. \"서비스\"에서 \"회원\" 상호 간 이뤄진 \"상품\"의 매매는 개인 간에 이뤄지는 거래로 전자상거래법 제17조에서 정한 청약철회에 따른 환불, 교환이 적용되지 않기 때문에 \"거래체결\" 이후에는 다른 일반 전자 상거래와 달리 단순 변심에 따른 계약 철회, 취소 등이 불가능하고, 검수기준을 충족하지 못하는 \"이상 상품\"인 경우만 계약 취소 및 환불 청구가 가능합니다. 구매자는 구매 시에 이 점에 대해 반드시 유의하여 진행해 주시기 바랍니다.\n\n2. 적용 시기\n새롭게 개정된 약관은 2022년 8월 4일(목)을 기준으로 적용될 예정입니다. 이에 따라 현재 적용 중인 약관은 개정일을 기준으로 효력을 상실하고 새로운 약관으로 대체됩니다.\n\n3. 이의제기 및 문의\n변경된 이용약관에 대한 이의제기 및 관련 문의가 있으신 경우 고객센터 1588-0000 또는 앱 1:1문의로 접수해 주시면 확인 후, 안내해 드리도록 하겠습니다. 변경된 이용약관에 동의하지 않으시는 경우에는 서비스 제공에 제약이 발생할 수 있으며, 공지일자부터 적용일자 전까지 별도의 의사표시를 하지 않으시면 변경된 약관에 동의한 것으로 간주합니다.\n\n공지일자: 2022년 8월 14일\n적용일자: 2022년 9월 1일\n\n앞으로도 회원 여러분께서 안전하고 편리하게 Beedly 서비스를 이용하실 수 있도록 최선을 다하겠습니다.\n감사합니다.','NOTICE',16,'2022-08-14 03:55:03','2022-08-14 03:55:03'),(15,'[공지] 택배 없는 날 및 공휴일에 따른 거래 일정 안내','안녕하세요, Beedly 입니다.\n\n택배업계의 \'택배 없는 날\' 시행 및 광복절 공휴일에 따라 변경되는 거래 관련 일정 안내드립니다.\n\n1. 판매자의 발송 마감기한 연장\n- 8월 11일 체결 건: 8월 16일까지 연장\n(ex. 11일 13:00 체결 - 16일 13:00 마감)\n- 8월 12일 체결 건: 8월 17일까지 연장\n(ex. 12일 13:00 체결 - 17일 13:00 마감)\n- 8월 13일 - 8월 15일 체결건: 8월 18일 00:00까지 연장\n\n2. 입고 마감기한 연장\n- 8월 8일 발송 건: 8월 17일 00:00까지 연장\n- 8월 9일 발송 건: 8월 18일 00:00까지 연장\n- 8월 10일 발송 건: 8월 19일 00:00까지 연장\n- 8월 11일 발송 건: 8월 20일 00:00까지 연장\n- 8월 12일 발송 건: 8월 21일 00:00까지 연장\n\n이에 따라 검수 합격 상품의 출고 및 배송에도 자소 지연이 발생할 수 있으므로 회원 여러분들의 너른 양해 부탁드립니다.\n\n자세한 택배사의 휴무 일정은 이용하시는 택배사의 공지 내용 참고 부탁드립니다.\n\n감사합니다.','NOTICE',16,'2022-08-14 04:47:36','2022-08-14 04:47:36'),(16,'[공지] 폭우로 인한 배송 지연 안내','안녕하세요, Beedly 입니다.\n\n현재 기록적인 폭우로 인하여 일부 지역의 상품 집하 및 배송 지연이 발생하고 있습니다.\n이로 인하여 판매 거래 체결 후, 발송 마감 기한 내에 발송하였으나 집하 거부 또는 지연되어 거래가 취소되는 상황이 예상됩니다.\n\n택배사 집하 거부 및 지연으로 인해 거래가 취소될 경우에는 아래와 같이 페널티 취소를 도와드릴 예정입니다.\n\n\n◎ 페널티 취소 대상\n택배사 집하 거부 또는 지연으로 인하여 거래 취소된 판매 건\n\n◎ 페널티 취소 방법\n1. 택배사의 귀책으로 인한 사고 내용 및 운송장 정보가 기재된 증빙 자료를 배송사로 요청 후 고객센터 메일로 제출\n2. 증빙 자료 확인 후, 택배사 과실로 인한 배송 지연 인정될 경우 페널티 취소\n*택배사 귀책이 아니거나 증빙 자료를 허위로 제출할 경우, 페널티가 취소되지 않을 수 있습니다.\n\n\n아울로 현재 상황과 관련하여 검수 완료 후, 출고되는 일반 및 빠른배송 택배 역시 일부 지역에서 지연이 발생하고 있어 구매 시 참고 부탁드립니다.\n\nBeedly에서는 택배사 상황을 지속 모니터링하고 있으며, 상황에 따라 적절히 조치하도록 하겠습니다.\n\n감사합니다.','NOTICE',16,'2022-08-14 05:01:15','2022-08-14 05:01:15'),(17,'[공지] 서비스 수수료 안내','안녕하세요, Beedly 입니다.\n\n약관법 제 6조에 따라 이용약관 내 서비스 수수료 관련 조항의 개정을 미리 공지드린 바 있습니다.\n이와 함께 추후 적용될 서비스 수수료 세부 사항은 아래와 같습니다.\n\n\n◎ 기간\n- 2022년 8월 1일 (월) 00:00:00 부터 (체결 일시 기준)\n\n◎ 판매 및 구매 수수료\n- 구매자: 최종 낙찰가의 5%\n- 판매자: 최종 낙찰가의 5%\n\n\n안전하고 편리한 서비스 이용환경 구축을 위해 상기 서비스 수수료를 적용할 예정이오나 해당 내용에 동의하지 않으실 경우, 아래 방법을 통해 서비스 이용 계약 해제를 요청하실 수 있습니다.\n-홈 > My Page > 프로필 상세 > 회원 탈퇴\n- 고객센터 1588-0000 또는 메일 service@beedly.com 문의\n\n감사합니다.','NOTICE',16,'2022-08-14 05:14:41','2022-08-14 05:14:41'),(18,'[특별] 5월 특별 경매 일정 안내','안녕하세요, Beedly 입니다.\n\n2022년 5월 특별경매 일정 안내 드립니다.\n\n- 5/11 (수) 19:30 : 국내 수묵화 특집\n	이수연 작가, 문석희 작가 외 17점\n- 5/28 (토) 14:00 : 미니 조각 특집\n	박재권 작가 외 12점\n\n많은 관심 부탁드립니다.','NOTICE',16,'2022-08-14 05:54:47','2022-08-14 05:54:47'),(19,'[특별] 6월 특별 경매 일정 안내','안녕하세요, Beedly 입니다.\n\n2022년 6월 특별경매 일정 안내 드립니다.\n\n- 6/11 (토) 14:00 : 수채화 특집\n	 차유진 작가, 권기정 작가 외 20점\n- 6/22 (수) 20:00 : 유화 특집\n	이아현 작가 외 23점\n\n많은 관심 부탁드립니다.','NOTICE',16,'2022-08-14 06:33:20','2022-08-14 06:33:20'),(20,'[특별] 7월 특별 경매 일정 안내','안녕하세요, Beedly 입니다.\n\n2022년 7월 특별경매 일정 안내 드립니다.\n\n- 7/13 (수) 19:00 : 여름에 잘 어울리는 시원시원한 작품 특집\n- 7/30 (토) 14:00 : 사진 특집\n\n많은 관심 부탁드립니다.','NOTICE',16,'2022-08-14 06:37:15','2022-08-14 06:37:15'),(21,'[이벤트] 여름 이벤트 안내','안녕하세요, Beedly 입니다.\n\n무더운 여름이 지나니 긴 장마로 다들 지쳐갈 요즘, Beedly 회원분들을 위한 특별 이벤트를 마련하였습니다.\n\n이벤트 기간 동안 최종 응찰한 금액의 합계가 50만원 이상인 회원분들을 대상으로 추첨하여 문석희 작가의 <안정>을 드립니다.\n\n\n* 기간: 2022.07.01 ~ 2022.08.15\n*대상: 이벤트 기간 동안 참여한 각 경매에서 응찰한 최고가의 총 합계가 50만원 이상인 모든 회원\n*경품: <안정> 문석희 作, 2021\n\n응찰가가 높을 수록 당첨 확률이 높아집니다. 많은 참여 바랍니다.','NOTICE',16,'2022-08-14 07:03:42','2022-08-14 07:03:42'),(22,'[특별] 8월 특별 경매 일정 안내','안녕하세요, Beedly 입니다.\n\n2022년 8월 특별경매 일정 안내 드립니다.\n\n- 8/10 (수) 19:30 : 거장 소장품 특집\n	<투계> 이중섭 作 외 8점\n- 8/27 (토) 14:00 : 2022년 주목받는 신인 작가 특집\n	이수연 작가 외 25점\n\n많은 관심 부탁드립니다.','NOTICE',16,'2022-08-14 07:14:55','2022-08-14 07:14:55'),(23,'상품을 직접 픽업하고싶어요','Beedly에서는 택배 발송을 통해서만 상품을 전달해 드리고 있습니다.\n오프라인 쇼룸을 통한 직접 픽업은 현재 준비중이며, 모든 사항이 준비되기 전까지 택배 기사님께서 안전하고 빠르게 상품을 배송해 주실 예정입니다.','FAQ',16,'2022-08-14 07:20:16','2022-08-14 07:20:16'),(24,'해외 배송이 가능한가요?','Beedly는 현재 국내 사용자를 대상으로 운영중입니다.\n해외 판매자의 발송정보 입력 및 해외 구매자를 위한 국외 배송과 조회 기능을 제공하지 않으며, 원활한 거래를 위한 발송/입고 마감 기한 정책으로 인하여 해외 거주자의 판매와 구매는 원칙적으로 불가합니다.','FAQ',16,'2022-08-14 07:21:30','2022-08-14 07:21:30'),(25,'배송 사고 보상 프로세스가 어떻게 되나요?','배송 과정 중 분실/도난/파손 등 사고 발생 시, 아래 프로세스에 따라 보상이 진행될 수 있습니다.\n\n\n1. 분실/도난\n\n① 유형 예시\n•  집화일 이후 배송 과정 중 최대 7일 이상 흐름이 멈춰 있음\n•  상품이 도착한 것으로 조회되나 실물 상품을 수령한 바 없음\n•  상품 수령 시 택배 박스를 개봉한 흔적이 확인되고 주문 상품이 포함되어 있지 않음\n\n② 사고 접수 필요 사항\n•  주문서\n•  운송장\n* 분실 유형에 따라 사고 접수 시, 도착지 CCTV 영상 등이 요구될 수 있음\n\n③ 접수 기한\n집화일로부터 10일 이내\n\n\n2. 파손/손상\n\n① 유형 예시\n•  택배 박스가 외력에 의해 파손된 것이 육안으로 확인되며, 본품 박스/내용물 또한 파손이 확인됨\n•  택배 박스가 젖어 있으며, 본품 박스/내용물 또한 젖어있음\n\n② 사고 접수 필요 사항\n•  주문서\n•  운송장\n•  운송장 확인이 가능한 택배 박스 사진 1장 및 파손/손상 부위 디테일 사진 3장 (다각도 촬영)\n•  상품 식별이 가능한 박스 라벨 포함 사진 1장\n* 사고 접수 후 파손/손상에 해당하는 실물 상품을 회수하여 파손/손상 정도를 확인함\n\n③ 접수 기한\n배송 완료일로부터 7일 이내\n\n\n주의사항\n•  접수 기한이 경과하였거나 구비 사항이 미비할 경우 사고 접수가 불가합니다.\n•  사고 확인, 보상금 확정 및 지급까지는 사고 배송 업체 사정에 따라 약 30일 가량 소요될 수 있습니다.\n•  구체적인 보상의 범위는 사고 배송 업체의 보상 정책을 따르며, 거래 체결 금액을 초과하지 않습니다.','FAQ',16,'2022-08-14 07:26:27','2022-08-14 07:26:27'),(26,'판매 대금은 언제 정산이 되나요?','보내주신 상품이 검수에 합격한 후 다음 영업일에 정산처리가 됩니다. 예를 들어, 검수 합격일이 금요일이라면 다음 영업일인 월요일에 정산처리됩니다. 대금은 판매시 입력하신 계좌로 즉시 입금됩니다.','FAQ',16,'2022-08-14 07:28:22','2022-08-14 07:28:22'),(27,'상시경매와 기획경매가 무엇인가요?','상시경매란, 작가가 직접 본인의 작품에 대해 경매를 진행하는 것을 일컫습니다. 한 경매 라이브 당 하나의 작품만 등록이 가능합니다.\n\n기획경매란, Beedly에서 선별한 작품들을 모아 월에 1~2회 진행되는 경매입니다. Beedly에서 초빙한 전문 경매사의 진행 하에 여러 작품을 연속하여 만나보실 수 있습니다.','FAQ',16,'2022-08-14 07:45:17','2022-08-14 07:45:17'),(28,'서면응찰이 무엇인가요?','라이브 경매에 참여하기 어렵다면 서면응찰을 활용해 보세요. 라이브 경매가 시작하기 전, 내가 응찰할 수 있는 상한가를 미리 입력할 수 있는 제도입니다. 본 라이브 경매에서 서면응찰의 최고 금액보다 높은 금액의 입찰이 이루어지지 않을 경우, 서면응찰가 중 최고가를 제시한 회원님이 낙찰받게 됩니다. 이 때, 낙찰가는 본 라이브 경매에서 제시된 최고 입찰가 만큼이 됩니다.\n\n예를 들어, 서면응찰에 제시된 최고 금액이 100만원, 본 라이브 경매에서 제시된 최고 금액이 80만원일 경우, 해당 라이브 경매의 낙찰은 서면응찰에서 100만원을 제시한 고객이 받게 됩니다. 이때, 낙찰자는 라이브 경매에서 제시된 최고 금액인 80만원으로 낙찰 받습니다.\n\n서면응찰에서 같은 최고가를 여러 인원이 제시했을 경우, 먼저 서면응찰을 진행한 회원이 낙찰받습니다.','FAQ',16,'2022-08-14 07:55:19','2022-08-14 07:55:19'),(29,'도착한 상품이 가품같아요.','도착한 상품이 가품으로 의심될 경우, 고객센터로 즉시 연락 해 주시기 바랍니다.\n가품이 입증된 경우에는 결제 취소를 포함하여 체결금액의 300%를 보상해 드립니다.\n\n고객센터 : 1588-0000 또는 service@beedly.com 으로 문의주시기 바랍니다.','FAQ',16,'2022-08-14 07:58:24','2022-08-14 07:58:24');
/*!40000 ALTER TABLE `board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `category_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `category_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'2022-08-05 22:03:05','2022-08-05 22:03:05','회화'),(2,'2022-08-08 02:07:28','2022-08-08 02:07:28','판화'),(3,'2022-08-08 02:07:42','2022-08-08 02:07:42','에디션'),(4,'2022-08-08 02:07:49','2022-08-08 02:07:49','사진'),(5,'2022-08-08 02:07:54','2022-08-08 02:07:54','입체');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_auction`
--

DROP TABLE IF EXISTS `personal_auction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_auction` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `p_active_flag` bit(1) DEFAULT NULL,
  `p_product_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `p_product_id_UNIQUE` (`p_product_id`),
  KEY `FK8h3ela55ovqbmirbja9cd8rlh` (`user_id`),
  CONSTRAINT `FK8h3ela55ovqbmirbja9cd8rlh` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKea32lgv0ts6aml2qpnje690n0` FOREIGN KEY (`p_product_id`) REFERENCES `personal_product` (`p_product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_auction`
--

LOCK TABLES `personal_auction` WRITE;
/*!40000 ALTER TABLE `personal_auction` DISABLE KEYS */;
INSERT INTO `personal_auction` VALUES (9,'2022-08-11 06:40:11','2022-08-18 02:01:27',_binary '\0',53,16),(10,'2022-08-11 06:41:54','2022-08-18 02:03:05',_binary '\0',52,16),(11,'2022-08-11 06:42:08','2022-08-11 06:42:08',_binary '',51,16),(12,'2022-08-11 06:42:19','2022-08-18 02:03:47',_binary '\0',50,16),(40,'2022-08-18 01:55:37','2022-08-18 01:57:54',_binary '\0',44,16),(43,'2022-08-18 07:29:45','2022-08-18 07:29:45',_binary '',137,8),(44,'2022-08-18 10:43:16','2022-08-18 10:43:16',_binary '',153,17),(45,'2022-08-18 10:49:48','2022-08-18 10:49:48',_binary '',154,17),(46,'2022-08-18 11:24:15','2022-08-18 11:24:15',_binary '',155,17),(48,'2022-08-18 11:28:28','2022-08-19 01:27:59',_binary '\0',90,8),(56,'2022-08-18 15:48:16','2022-08-18 15:48:16',_binary '',165,17),(57,'2022-08-18 15:53:59','2022-08-18 15:53:59',_binary '',85,1),(59,'2022-08-19 01:18:33','2022-08-19 01:18:33',_binary '',105,8);
/*!40000 ALTER TABLE `personal_auction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_bid`
--

DROP TABLE IF EXISTS `personal_bid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_bid` (
  `p_bid_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `p_bid_price` int DEFAULT NULL,
  `p_product_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`p_bid_id`),
  KEY `FKcup1eff82qx8nd6ul7b09updv` (`p_product_id`),
  KEY `FKjuofv5ihp70ls34tsth5wbv7v` (`user_id`),
  CONSTRAINT `FKcup1eff82qx8nd6ul7b09updv` FOREIGN KEY (`p_product_id`) REFERENCES `personal_product` (`p_product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKjuofv5ihp70ls34tsth5wbv7v` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=334 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_bid`
--

LOCK TABLES `personal_bid` WRITE;
/*!40000 ALTER TABLE `personal_bid` DISABLE KEYS */;
INSERT INTO `personal_bid` VALUES (269,'2022-08-18 02:02:56','2022-08-18 02:02:56',210000,52,8),(270,'2022-08-18 02:02:56','2022-08-18 02:02:56',220000,52,8),(271,'2022-08-18 02:02:57','2022-08-18 02:02:57',230000,52,8),(272,'2022-08-18 02:02:58','2022-08-18 02:02:58',240000,52,8),(273,'2022-08-18 02:02:58','2022-08-18 02:02:58',250000,52,8),(274,'2022-08-18 02:02:59','2022-08-18 02:02:59',260000,52,8),(275,'2022-08-18 02:02:59','2022-08-18 02:02:59',275000,52,8),(276,'2022-08-18 02:03:40','2022-08-18 02:03:40',493500,50,8),(277,'2022-08-18 02:03:41','2022-08-18 02:03:41',517000,50,8),(278,'2022-08-18 02:03:41','2022-08-18 02:03:41',540500,50,8),(279,'2022-08-18 02:03:42','2022-08-18 02:03:42',564000,50,8),(280,'2022-08-18 02:03:43','2022-08-18 02:03:43',587500,50,8),(281,'2022-08-18 02:03:44','2022-08-18 02:03:44',611000,50,8),(318,'2022-08-18 16:12:45','2022-08-18 16:12:45',262500,51,25),(324,'2022-08-19 01:26:27','2022-08-19 01:26:27',210000,90,17),(325,'2022-08-19 01:27:02','2022-08-19 01:27:02',220000,90,27),(326,'2022-08-19 01:27:03','2022-08-19 01:27:03',230000,90,27),(327,'2022-08-19 01:27:11','2022-08-19 01:27:11',240000,90,25),(328,'2022-08-19 01:27:13','2022-08-19 01:27:13',250000,90,25),(329,'2022-08-19 01:27:14','2022-08-19 01:27:14',260000,90,25),(330,'2022-08-19 01:27:15','2022-08-19 01:27:15',275000,90,25),(331,'2022-08-19 01:27:24','2022-08-19 01:27:24',285000,90,27),(332,'2022-08-19 01:27:27','2022-08-19 01:27:27',300000,90,27),(333,'2022-08-19 01:27:28','2022-08-19 01:27:28',315000,90,27);
/*!40000 ALTER TABLE `personal_bid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_favorite`
--

DROP TABLE IF EXISTS `personal_favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_favorite` (
  `p_favorite_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `p_product_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`p_favorite_id`),
  KEY `FK9u7swkpymhnvq2ucfxnnwowy0` (`p_product_id`),
  KEY `FKjxrcxrletw89urnuhlllpc1tp` (`user_id`),
  CONSTRAINT `FK9u7swkpymhnvq2ucfxnnwowy0` FOREIGN KEY (`p_product_id`) REFERENCES `personal_product` (`p_product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKjxrcxrletw89urnuhlllpc1tp` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_favorite`
--

LOCK TABLES `personal_favorite` WRITE;
/*!40000 ALTER TABLE `personal_favorite` DISABLE KEYS */;
INSERT INTO `personal_favorite` VALUES (30,'2022-08-14 18:56:20','2022-08-14 18:56:20',44,1),(47,'2022-08-18 01:56:36','2022-08-18 01:56:36',44,8),(50,'2022-08-18 05:44:06','2022-08-18 05:44:06',51,16),(52,'2022-08-18 10:15:34','2022-08-18 10:15:34',143,17),(53,'2022-08-18 10:15:46','2022-08-18 10:15:46',144,17),(54,'2022-08-18 10:16:38','2022-08-18 10:16:38',51,17),(57,'2022-08-18 10:34:38','2022-08-18 10:34:38',125,17),(58,'2022-08-18 10:34:52','2022-08-18 10:34:52',128,17),(59,'2022-08-18 10:56:29','2022-08-18 10:56:29',93,8),(61,'2022-08-18 11:17:00','2022-08-18 11:17:00',137,1),(62,'2022-08-18 11:17:05','2022-08-18 11:17:05',153,1),(63,'2022-08-18 11:17:10','2022-08-18 11:17:10',154,1),(64,'2022-08-18 11:30:45','2022-08-18 11:30:45',51,1),(66,'2022-08-18 14:25:25','2022-08-18 14:25:25',113,8),(67,'2022-08-18 14:38:33','2022-08-18 14:38:33',147,8),(68,'2022-08-18 14:38:37','2022-08-18 14:38:37',126,8),(70,'2022-08-18 14:38:44','2022-08-18 14:38:44',150,8),(71,'2022-08-18 14:38:49','2022-08-18 14:38:49',125,8),(72,'2022-08-18 14:40:44','2022-08-18 14:40:44',51,8),(73,'2022-08-18 14:40:55','2022-08-18 14:40:55',129,8),(74,'2022-08-18 14:41:02','2022-08-18 14:41:02',133,8),(75,'2022-08-18 14:41:13','2022-08-18 14:41:13',109,8),(76,'2022-08-18 14:41:17','2022-08-18 14:41:17',106,8),(81,'2022-08-19 01:24:16','2022-08-19 01:24:16',144,27),(82,'2022-08-19 01:24:50','2022-08-19 01:24:50',90,27),(83,'2022-08-19 01:31:23','2022-08-19 01:31:23',137,16),(84,'2022-08-19 01:33:05','2022-08-19 01:33:05',108,16),(85,'2022-08-19 01:34:48','2022-08-19 01:34:48',107,16);
/*!40000 ALTER TABLE `personal_favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_history`
--

DROP TABLE IF EXISTS `personal_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_history` (
  `p_history_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `p_action_status` int DEFAULT NULL,
  `p_auction_id` bigint DEFAULT NULL,
  `p_user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`p_history_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_history`
--

LOCK TABLES `personal_history` WRITE;
/*!40000 ALTER TABLE `personal_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_product`
--

DROP TABLE IF EXISTS `personal_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_product` (
  `p_product_id` bigint NOT NULL AUTO_INCREMENT,
  `p_product_name` varchar(255) DEFAULT NULL,
  `p_product_desc` varchar(1000) DEFAULT NULL,
  `artist_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `p_product_h` int DEFAULT NULL,
  `p_product_w` int DEFAULT NULL,
  `p_product_d` int DEFAULT NULL,
  `p_sold_status` varchar(255) DEFAULT NULL,
  `p_start_price` int DEFAULT NULL,
  `p_start_time` datetime DEFAULT NULL,
  `p_favorite_count` int DEFAULT NULL,
  `p_brightness` int DEFAULT NULL,
  `p_saturation` int DEFAULT NULL,
  `p_temperature` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`p_product_id`),
  KEY `FK51d6klts1a11ghase7ywyldqo` (`category_id`),
  KEY `FKeu55c21w4k7c88lpq5qn2iplj` (`artist_id`),
  KEY `FKj5mypn0ejll49j4wc4vpl3t4j` (`user_id`),
  CONSTRAINT `FK51d6klts1a11ghase7ywyldqo` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKeu55c21w4k7c88lpq5qn2iplj` FOREIGN KEY (`artist_id`) REFERENCES `artist` (`artist_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKj5mypn0ejll49j4wc4vpl3t4j` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=173 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_product`
--

LOCK TABLES `personal_product` WRITE;
/*!40000 ALTER TABLE `personal_product` DISABLE KEYS */;
INSERT INTO `personal_product` VALUES (44,'로이','지수네 집 고양이 로이를 그린 그림입니다.\n품종은 노르웨이 숲 입니다.\n아주 예쁘지만 사가지가 업습니다.',17,16,4,30,40,1,'SUCCESS',600000,'2022-08-12 05:30:00',2,0,0,3,'2022-08-11 05:09:19','2022-08-18 01:57:49'),(50,'Modern People','신상우 작가의 목판화를 모티프로 만든 판화입니다.\n\n소재: Rubber-cut on Canvas, Acrylic Paint\n제작: 2014.03.10',17,16,2,30,40,2,'SUCCESS',470000,'2022-08-11 06:00:01',0,-1,-1,1,'2022-08-11 05:34:17','2022-08-18 02:03:45'),(51,'One Early Summer Day','초여름의 풍경을 그린 그림입니다.\n제가 개인적으로 굉장히 아끼는 그림인데요,\n붉게 물들은 꽃잎을 보고있자면 첫사랑이 떠오르는 듯 합니다.\n\n소재: 캔버스, 수성 물감\n제작: 2021.04.02',17,16,1,30,40,1,'STANDBY',250000,'2022-08-11 06:00:00',4,1,1,0,'2022-08-11 05:37:57','2022-08-18 14:40:44'),(52,'New York City Walking in the Rain','Acrylic on Wood',17,16,1,25,20,2,'SUCCESS',200000,'2022-08-11 06:00:01',1,-1,-1,0,'2022-08-11 05:46:19','2022-08-18 02:03:00'),(53,'Hoze','1.5kg\nResin\n야외 전시 시 파손이 될 우려가 있으니 실내 보관을 추천드립니다.\n',17,16,4,40,20,20,'SUCCESS',1700000,'2022-08-11 05:00:00',2,1,1,0,'2022-08-11 05:51:12','2022-08-18 02:01:24'),(83,'학교 가는 길','그 때, 그 시절... 학교에서는 무슨일이....?',1,1,1,100,120,3,'STANDBY',100000,'2022-09-01 10:00:00',1,3,4,3,'2022-08-14 04:54:14','2022-08-17 10:22:22'),(84,'식사','까치와 올빼미의 행복한 식사시간',1,1,1,120,150,3,'STANDBY',100000,'2022-09-02 10:00:00',0,0,1,2,'2022-08-14 04:56:51','2022-08-14 04:56:51'),(85,'우주인','우주, 그 미지의 세계로',1,1,1,50,70,3,'STANDBY',300000,'2022-08-18 10:00:00',0,-3,0,-3,'2022-08-14 04:58:54','2022-08-14 04:58:54'),(86,'왕의 길','왕이 가는 곳. 그 곳이 바로 길이다.',1,1,1,100,150,2,'STANDBY',1500000,'2022-09-04 03:00:00',0,2,-1,2,'2022-08-14 05:02:26','2022-08-14 05:02:26'),(87,'모두의 마블','땅따먹기',1,1,1,90,130,3,'STANDBY',500000,'2022-09-07 03:00:00',0,3,4,3,'2022-08-14 05:04:20','2022-08-14 05:04:20'),(88,'새','상쾌한 아침, 밖에서 지지귀는 작은 새',1,1,1,50,50,3,'STANDBY',130000,'2022-09-03 03:00:00',0,4,4,4,'2022-08-14 05:13:03','2022-08-14 05:13:03'),(89,'인생','인생이란 이런 것일까',1,1,5,60,60,3,'STANDBY',130000,'2022-09-07 03:00:00',0,3,4,3,'2022-08-14 05:15:50','2022-08-14 05:15:50'),(90,'바다','바다를 그린 그림이다.',14,8,1,50,50,1,'SUCCESS',200000,'2022-08-18 11:00:00',2,3,2,-2,'2022-08-14 05:23:13','2022-08-19 01:27:29'),(91,'꽃병','예쁜 꽃이 그려져있다.',14,8,1,80,50,1,'STANDBY',100000,'2022-09-06 18:00:00',0,-3,-3,-3,'2022-08-14 05:25:19','2022-08-18 10:51:30'),(92,'뱃놀이','뱃놀이를 하는 사람들이 그려져있다.',14,8,1,40,100,1,'STANDBY',150000,'2022-09-07 00:00:00',0,1,-3,-1,'2022-08-14 05:26:26','2022-08-18 10:51:59'),(93,'소녀','금발소녀가 혼자 놀고있다.',14,8,1,60,60,1,'STANDBY',200000,'2022-09-06 18:00:00',1,-4,-3,3,'2022-08-14 05:27:31','2022-08-18 10:56:29'),(94,'숲새','숲새 두마리가 그려져있다.',14,8,1,40,40,1,'STANDBY',130000,'2022-09-07 07:00:00',0,3,3,2,'2022-08-14 05:28:29','2022-08-18 13:15:48'),(95,'시계탑','시계탑이 그려져있다.',14,8,1,50,50,1,'STANDBY',100000,'2022-09-06 18:00:00',1,0,0,0,'2022-08-14 05:30:22','2022-08-18 13:14:10'),(96,'여인','여인이그려져있다.',14,8,1,130,130,1,'STANDBY',300000,'2022-09-06 03:00:00',0,1,5,5,'2022-08-14 05:33:59','2022-08-14 05:33:59'),(97,'하와이','하와이 그림이다.',14,8,1,130,130,1,'STANDBY',300000,'2022-09-04 18:00:00',0,1,3,1,'2022-08-14 05:35:09','2022-08-18 13:16:32'),(99,'Blue_Monaco','모나코의 오후.',14,8,1,80,130,1,'STANDBY',300000,'2022-10-04 18:00:00',0,1,3,1,'2022-08-14 07:19:01','2022-08-18 13:16:55'),(100,'Chef\'s_Nap','낮잠을 자는 요리사.',14,8,1,70,70,1,'STANDBY',260000,'2022-12-04 18:00:00',1,-1,3,4,'2022-08-14 07:23:54','2022-08-18 16:33:16'),(101,'Nectar','넥타.',14,8,1,50,50,1,'STANDBY',260000,'2022-08-04 18:00:00',1,3,3,4,'2022-08-14 07:25:34','2022-08-18 13:37:01'),(104,'감상','파란 감상을 나타낸다.',14,8,1,80,40,1,'STANDBY',1600000,'2022-09-14 19:00:00',0,3,4,-3,'2022-08-14 07:45:11','2022-08-18 13:37:29'),(105,'greenMoon','녹색 달 속에 보름달이 그려져 있다.',14,8,1,80,40,1,'STANDBY',1500000,'2022-08-19 01:00:00',0,3,4,-3,'2022-08-14 07:46:31','2022-08-19 01:18:31'),(106,'낚시','낚시를 하는 사람을 그린 수묵화이다.',14,8,1,50,80,1,'STANDBY',1400000,'2022-09-11 23:00:00',1,0,0,0,'2022-08-14 07:49:04','2022-08-18 14:41:17'),(107,'몽상','작가의 몽상을 그려넣은 작품이다..',14,8,1,100,60,1,'STANDBY',1250000,'2022-09-10 17:00:00',1,4,3,3,'2022-08-14 07:51:46','2022-08-19 01:34:48'),(108,'불빛','도시의 불빛을 그려넣은 작품이다.',14,8,1,100,60,1,'STANDBY',1000000,'2022-09-11 03:00:00',1,4,5,3,'2022-08-14 07:52:51','2022-08-19 01:33:05'),(109,'꿈을 꾸는 소년','소년의 모습.',14,8,5,60,40,30,'STANDBY',800000,'2022-08-31 03:00:00',1,0,0,0,'2022-08-14 07:55:34','2022-08-18 14:41:13'),(110,'말을 타는 소년','말을 타는 소년의 모습.',14,8,5,60,40,20,'STANDBY',560000,'2022-08-30 21:00:00',0,0,0,0,'2022-08-14 08:14:03','2022-08-18 13:40:56'),(111,'곤충 세계','곤충들을 판화로 그려내었다.',14,8,2,60,40,3,'STANDBY',480000,'2022-08-29 21:00:00',0,0,0,0,'2022-08-14 08:18:38','2022-08-18 13:46:02'),(113,'따듯한풍경','따듯한 유화를 그려넣었다.',14,8,1,30,80,1,'STANDBY',1000000,'2022-08-29 21:00:00',1,3,2,4,'2022-08-17 07:45:34','2022-08-18 14:25:34'),(114,'푸른밤','푸른밤을 연상시키는 그림이다.',14,8,1,60,30,1,'STANDBY',1300000,'2022-08-29 21:00:00',0,2,1,-3,'2022-08-17 07:46:32','2022-08-18 14:25:14'),(116,'솜사탕','꿈속의 솜사탕같은 그림.',14,8,1,30,80,1,'STANDBY',1200000,'2022-08-29 21:00:00',0,4,2,3,'2022-08-17 08:35:40','2022-08-18 14:24:51'),(117,'유화1','유화를 이용한 그림입니다..',14,8,1,60,30,1,'STANDBY',1000000,'2022-08-30 06:00:00',0,5,2,3,'2022-08-17 08:48:25','2022-08-17 08:48:25'),(118,'유화2','유화를 이용한 그림입니다..',14,8,1,60,30,1,'STANDBY',1000000,'2022-08-29 21:00:00',0,5,2,3,'2022-08-17 08:49:07','2022-08-18 13:46:17'),(125,'그리즐 베어','블랙 원단으로 제작한 그리즐 베어입니다. 탱커 시리즈 에디션의 스테디 셀러인 그리즐 베어를 2022년 버전으로 재출시합니다. 2022년 특별 패키징이 적용됩니다.',19,17,3,50,50,50,'STANDBY',490000,'2022-08-19 08:30:00',2,2,2,0,'2022-08-18 03:20:03','2022-08-18 14:38:49'),(126,'햄버거의 악몽','햄버거는 맛있는 음식이라고요? 햄버거를 많이 드신 당신의 꿈에 햄버거가 악몽으로 찾아갑니다. 나이트메어 에디션으로 제작된 센스있는 조명으로 당신의 방을 밝히세요.',19,17,3,50,50,50,'STANDBY',280000,'2022-08-20 12:00:00',1,-2,-2,1,'2022-08-18 03:39:28','2022-08-18 14:38:37'),(127,'크리스탈 라이즈드 꼬부기','크리스탈 라이즈드 포켓몬 에디션의 8월 작품 꼬부기를 소개합니다. 내가 좋아하는 포켓몬이 크리스탈이라면 어떨까요? 수 많은 포켓몬과의 대결 속에 깨져버린 꼬부기의 등껍질을 확인하세요.',19,17,3,50,50,50,'STANDBY',3900000,'2022-08-21 04:00:00',0,1,1,4,'2022-08-18 03:45:14','2022-08-18 06:49:46'),(128,'ㅠ: 의자','금속에 대한 남다른 해석으로 전개하고 있는 박스 온더 한글의 ㅠ 에디션을 소개합니다. 한글 ㅠ를 형상화한 박스들이 겹쳐진 의자는 당신의 공간을 특별하게 만들거에요.',19,17,3,50,50,50,'STANDBY',500000,'2022-08-20 19:00:00',1,2,2,0,'2022-08-18 03:47:56','2022-08-18 10:34:52'),(129,'미쉴린 오스','미쉴린의 그 캐릭터를 오마주한 콜린 에디션의 형광 버전 작품입니다. 동글동글 귀여운 오브제로 귀여운 분위기를 선물하세요.',19,17,3,30,50,50,'STANDBY',200000,'2022-08-22 04:30:00',1,3,3,0,'2022-08-18 03:51:47','2022-08-18 14:40:55'),(130,'원숭이 브릭','이 녀석은 원숭이일까요? 아니면 귀여운 곰일까요? 정답은 둘 다 맞습니다. 무엇이든지 합쳐버리는 브릭의 2022년 세번째 에디션 원숭이 브릭을 소개합니다.',19,17,3,90,60,100,'STANDBY',389000,'2022-08-20 10:00:00',0,1,1,1,'2022-08-18 03:55:06','2022-08-18 03:55:06'),(131,'배터리슬레이브클럽','우리는 모두 배터리의 노예. 지난해 7월부터 전개하고 있는 배터리 슬레이브 클럽 에디션의 4번째 에디션을 소개 합니다. 어디서나 우리는 배터리를 필요로 하죠. 방전된 배터리를 충전하고 푹신하고 센스있는 쿠션의에서 여러분을 충전하세요. *이 상품은 3개의 쿠션을 포함하고 있습니다.',19,17,3,80,50,50,'STANDBY',359000,'2022-08-23 04:00:00',0,1,1,0,'2022-08-18 04:01:28','2022-08-18 04:01:28'),(132,'토토','당신의 가장 친한 친구 토토를 소개합니다. 너무 귀엽죠? 당신이 기쁠때나 바쁠때나 힘들때나 당신 곁을 지켜주는 토토는 가장 소중한 친구에요. 토토를 위해서 오늘도 화이팅!',19,17,3,20,40,30,'STANDBY',130000,'2022-08-26 04:30:00',0,0,0,0,'2022-08-18 04:06:24','2022-08-18 04:06:24'),(133,'Mother Sea','어머니같은 바다의 느낌을 따뜻한 펠트 소재와 시원한 블루톤의 조화로 표현한 작품입니다. 세상에 하나뿐인 수제 펠트 작품으로 사계절 모두 잘 어울리는 인테리어를 해보시길 바랍니다.',17,16,3,35,47,4,'STANDBY',250000,'2022-08-19 05:00:00',1,0,0,-1,'2022-08-18 04:36:18','2022-08-18 14:41:02'),(134,'Turn Me Around','Acryl on canvas.\n2022.05.10.',17,16,1,39,50,1,'STANDBY',160000,'2022-08-19 06:00:00',0,0,0,0,'2022-08-18 04:41:07','2022-08-18 04:41:07'),(135,'Among Us','Print on wood with oil paint.\n2021.04.17',17,16,2,20,30,1,'STANDBY',90000,'2022-08-19 06:30:00',0,0,0,0,'2022-08-18 04:47:53','2022-08-18 04:47:53'),(136,'Paris Walking in the Rain','Walking in the rain 시리즈의 두번째 작품입니다:)',17,16,1,30,40,1,'STANDBY',80000,'2022-08-19 07:30:00',0,1,1,0,'2022-08-18 04:51:15','2022-08-18 04:51:15'),(137,'키스ll','사랑하는 연인들을 그린 판화이다. 양각과 음각 기법이 있으며, 강한 흑과 백의 대비가 선명하다. 판과 찍힌 면의 좌우가 바뀐다.\n\n',14,8,2,60,40,2,'STANDBY',500000,'2022-08-18 12:30:00',3,0,0,1,'2022-08-18 07:24:35','2022-08-19 01:31:23'),(138,'호랑이 걸음','호랑이 탈을 쓴 전통적인 걸음 입니다. 무서워하지말아요 당신을 지킬거에요',19,17,2,50,125,80,'STANDBY',230000,'2022-08-22 09:00:00',0,0,0,1,'2022-08-18 09:26:14','2022-08-18 09:26:14'),(139,'찍어낸 새','한마리의 새를 판화기법으로 찍어냈습니다. 여러 색상을 따로 제작하여 합하는 기법입니다. ',19,17,2,90,20,40,'STANDBY',119000,'2022-08-19 10:00:00',0,0,0,0,'2022-08-18 09:30:13','2022-08-18 09:30:13'),(141,'이 구역 포식자','고양이는 귀엽지만은 않아요. 이 구역의 포식자라구요!!',19,17,4,80,50,30,'STANDBY',50000,'2022-08-20 09:30:00',0,0,0,2,'2022-08-18 09:58:01','2022-08-18 09:58:01'),(142,'비상','높이 날으는 새가 멀리 봅니다. 멀리멀리 비상!!!!!!',19,17,4,50,50,50,'STANDBY',35000,'2022-08-19 14:30:00',0,0,0,-2,'2022-08-18 09:58:52','2022-08-18 09:58:52'),(143,'어두운 표범','표범은 야행성 동물이에요. 어두운 밤 표범을 마주쳤다면 도망치기에 늦었을걸요?',19,17,4,80,80,80,'STANDBY',38000,'2022-08-20 09:30:00',1,-2,-2,0,'2022-08-18 10:01:08','2022-08-18 10:15:34'),(144,'천공의 섬','하늘 위에 떠있는 섬을 상상해 본적이 있나요? 애니매이션에나 나오는 섬이라구요? 아니요. 여기있습니다.',19,17,4,110,100,100,'STANDBY',75000,'2022-08-20 11:00:00',2,-2,-2,0,'2022-08-18 10:02:37','2022-08-19 01:24:16'),(145,'제주도','이 사진에 제주도는 없어요. 그냥 이 비행기는 제주도를 향하고 있는것 것 같은. 그랬으면 해요',19,17,4,90,30,30,'STANDBY',42000,'2022-08-20 15:00:00',0,1,1,-1,'2022-08-18 10:03:59','2022-08-18 10:03:59'),(146,'놀이터','저기 멀리 놀이터에 아이들이 없네요. 다들 저녁먹으러 갔나봐. 철수야 영희야 이게 아닌가?',19,17,4,50,50,40,'STANDBY',52000,'2022-08-23 10:00:00',0,-2,-2,0,'2022-08-18 10:05:08','2022-08-18 10:05:08'),(147,'얼굴','동그란 달을 보고 있으니 얼굴이 생각나고 그 얼굴은 누구의 얼굴일까? 동글동글 동그라미? 우투더 영투더 우',19,17,4,70,60,80,'STANDBY',26000,'2022-08-26 10:00:00',1,-1,-1,1,'2022-08-18 10:06:28','2022-08-18 14:38:33'),(148,'은도끼','금도끼 은도끼 동도끼 나무도끼 중에 제일 좋은건 은도끼가 아닐까요?',19,17,4,80,50,10,'STANDBY',53000,'2022-08-21 10:30:00',0,0,0,-1,'2022-08-18 10:07:51','2022-08-18 10:07:51'),(149,'거울','태양을 비추는 거울은 바다일까 호수일까 아니면 저기 넓은 밭일까?',19,17,4,100,80,9,'STANDBY',71000,'2022-08-20 10:30:00',0,0,0,0,'2022-08-18 10:08:57','2022-08-18 10:08:57'),(150,'도깨비불','도깨비불이 보이면 즉시 멈추고 지나가는 사람이 없는지 차는 없는지 확인하세요.!!!',19,17,4,40,40,10,'STANDBY',35000,'2022-08-21 10:30:00',1,-2,-2,0,'2022-08-18 10:09:52','2022-08-18 14:38:44'),(153,'노란 등교길','등교길에는 유난히 노란 물건이 많네요. 삐약삐약 병아리들이 지나가는 길이여서 그런거겠죠?',19,17,4,70,60,130,'STANDBY',36000,'2022-08-18 09:00:00',2,-1,-1,0,'2022-08-18 10:43:14','2022-08-18 16:26:38'),(154,'본인센트','뼛속까지 타오르는 열정은 무엇일까요. 힙한 공간 힙한 향으로 새로운 공간을 연출하세요.',19,17,3,60,50,40,'STANDBY',49000,'2022-08-18 09:30:00',1,0,0,3,'2022-08-18 10:49:45','2022-08-18 11:17:10'),(155,'네모난 칼날','날카로운 칼만 칼일까? 아니다 네모난 칼도 있다. 네모난 칼은 안정적이다. 브론즈로 제작된 이 입체 작품은 묵직한 분위기이다.',19,17,5,90,90,90,'STANDBY',590000,'2022-08-18 05:30:00',0,-1,-1,0,'2022-08-18 11:24:13','2022-08-18 11:24:13'),(164,'동양화','꽃을 그린 수묵화 입니다.',14,8,1,50,50,1,'STANDBY',100000,'2022-08-31 04:30:00',0,1,1,0,'2022-08-18 14:36:06','2022-08-18 14:36:18'),(165,'야간 고궁','야간에 고궁을 방문해보셨나요? 아마도 옛날에 진짜 고궁은 이렇게 밝지 못했을거에요. 고궁이긴하지만 현대적인 배경이 아닐까요.',19,17,4,80,80,80,'STANDBY',45000,'2022-08-18 15:00:00',0,-2,-2,3,'2022-08-18 15:48:14','2022-08-18 15:48:14'),(166,'Joe cool','Joe처럼 cool한 인생을 살자! ',14,8,1,20,30,2,'STANDBY',50000,'2022-08-21 00:30:00',0,0,0,0,'2022-08-18 15:53:28','2022-08-18 15:53:28'),(168,'봄날의 햇살','따뜻한 봄 어느 날. 평화롭고 한적한 그 느낌을 즐기세요.',1,1,1,100,130,3,'STANDBY',530000,'2022-08-20 06:00:00',0,0,0,0,'2022-08-19 00:40:54','2022-08-19 00:40:54'),(169,'산촌','국내여행을 추억하며 그린 그림입니다.\n액자 포함\n\nOil on canvas.\n2021.09.09',17,16,1,15,20,1,'STANDBY',110000,'2022-08-19 04:00:01',0,0,0,0,'2022-08-19 01:46:30','2022-08-19 01:46:30'),(170,'Hotel Belvedere in Switzerland','얼마전 서울에서 진행 된 <우연히 웨스앤더슨> 전시에 출품했던 작품입니다.',17,16,4,50,30,1,'STANDBY',400000,'2022-08-19 05:00:00',0,0,0,0,'2022-08-19 01:55:36','2022-08-19 01:55:36'),(171,'Door to New  World','Acrylic on wood.\n2019.06.28',17,16,1,34,45,1,'STANDBY',900000,'2022-08-18 23:00:01',0,0,0,1,'2022-08-19 01:58:28','2022-08-19 01:58:45'),(172,'고요한 바다','고요한 바다를 표현한 사진입니다.',23,27,4,12,13,2,'STANDBY',56000,'2022-08-19 04:00:00',0,0,0,0,'2022-08-19 01:59:32','2022-08-19 01:59:32');
/*!40000 ALTER TABLE `personal_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_product_img`
--

DROP TABLE IF EXISTS `personal_product_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_product_img` (
  `p_img_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `p_img_uri` varchar(255) DEFAULT NULL,
  `p_product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`p_img_id`),
  KEY `FKbg9y9lj6t5gc51nvvll4uud1g` (`p_product_id`),
  CONSTRAINT `FKbg9y9lj6t5gc51nvvll4uud1g` FOREIGN KEY (`p_product_id`) REFERENCES `personal_product` (`p_product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_product_img`
--

LOCK TABLES `personal_product_img` WRITE;
/*!40000 ALTER TABLE `personal_product_img` DISABLE KEYS */;
INSERT INTO `personal_product_img` VALUES (40,'2022-08-11 05:09:19','2022-08-11 05:09:19','https://beedly-img.s3.ap-northeast-2.amazonaws.com/10748fb9-060c-4e9b-985e-c1ad193646d1',44),(45,'2022-08-11 05:34:18','2022-08-11 05:34:18','https://beedly-img.s3.ap-northeast-2.amazonaws.com/5cba9dc5-072c-400d-a57a-8ddc64ad304b',50),(46,'2022-08-11 05:37:57','2022-08-11 05:37:57','https://beedly-img.s3.ap-northeast-2.amazonaws.com/0aedafd1-9c6b-444c-892f-a295ba8a447d',51),(47,'2022-08-11 05:46:19','2022-08-11 05:46:19','https://beedly-img.s3.ap-northeast-2.amazonaws.com/e220d38c-62a1-429c-9ebf-f6d202d1c90c',52),(48,'2022-08-11 05:51:13','2022-08-11 05:51:13','https://beedly-img.s3.ap-northeast-2.amazonaws.com/c74cce65-b760-416c-a41f-65eb35bc5719',53),(83,'2022-08-14 04:54:15','2022-08-14 04:54:15','https://beedly-img.s3.ap-northeast-2.amazonaws.com/72a3a2a1-3fe0-40b0-84a0-9c9ca0391865',83),(84,'2022-08-14 04:56:51','2022-08-14 04:56:51','https://beedly-img.s3.ap-northeast-2.amazonaws.com/aa117f75-fb7a-4a18-9244-b8567160ebbf',84),(85,'2022-08-14 04:58:54','2022-08-14 04:58:54','https://beedly-img.s3.ap-northeast-2.amazonaws.com/0b623f83-3f34-4420-8344-13a050898cdb',85),(86,'2022-08-14 05:02:26','2022-08-14 05:02:26','https://beedly-img.s3.ap-northeast-2.amazonaws.com/920bf455-d3b4-4159-b33c-92717dc7a975',86),(87,'2022-08-14 05:04:20','2022-08-14 05:04:20','https://beedly-img.s3.ap-northeast-2.amazonaws.com/c6bbdb58-120e-423d-96e5-128c83236905',87),(88,'2022-08-14 05:13:04','2022-08-14 05:13:04','https://beedly-img.s3.ap-northeast-2.amazonaws.com/b2140efa-cd0e-4a18-aafe-dbc060df2d52',88),(89,'2022-08-14 05:15:50','2022-08-14 05:15:50','https://beedly-img.s3.ap-northeast-2.amazonaws.com/b228bd40-a9fb-4998-908b-d592aef6f4f2',89),(90,'2022-08-14 05:23:14','2022-08-14 05:23:14','https://beedly-img.s3.ap-northeast-2.amazonaws.com/d8511dbe-b88d-4194-a74e-973522ea7a16',90),(91,'2022-08-14 05:25:19','2022-08-14 05:25:19','https://beedly-img.s3.ap-northeast-2.amazonaws.com/1c839b47-debd-440a-af27-a3e33e90ee85',91),(92,'2022-08-14 05:26:26','2022-08-14 05:26:26','https://beedly-img.s3.ap-northeast-2.amazonaws.com/59d777ff-0a8a-4a7c-aa8e-8b366d8ad0be',92),(93,'2022-08-14 05:27:31','2022-08-14 05:27:31','https://beedly-img.s3.ap-northeast-2.amazonaws.com/f3a47c89-f029-46d4-a7a3-8c8bb2704007',93),(94,'2022-08-14 05:28:30','2022-08-14 05:28:30','https://beedly-img.s3.ap-northeast-2.amazonaws.com/eeeaa249-d087-4f43-8348-8437da9e3b54',94),(95,'2022-08-14 05:30:22','2022-08-14 05:30:22','https://beedly-img.s3.ap-northeast-2.amazonaws.com/81d0fa4b-9f07-4265-8ccc-0cdc5d2f40ee',95),(96,'2022-08-14 05:33:59','2022-08-14 05:33:59','https://beedly-img.s3.ap-northeast-2.amazonaws.com/5cc3157e-f72d-459d-a09f-376e0093ec75',96),(97,'2022-08-14 05:35:09','2022-08-14 05:35:09','https://beedly-img.s3.ap-northeast-2.amazonaws.com/1b2fcfa5-becb-4890-b581-6628e41eebb0',97),(98,'2022-08-14 07:19:02','2022-08-14 07:19:02','https://beedly-img.s3.ap-northeast-2.amazonaws.com/7c8f49e3-9928-4d97-be2e-ec4106fc4f38',99),(99,'2022-08-14 07:23:55','2022-08-14 07:23:55','https://beedly-img.s3.ap-northeast-2.amazonaws.com/ca24738c-33b4-4c15-85d5-09ad6c31dc68',100),(100,'2022-08-14 07:25:34','2022-08-14 07:25:34','https://beedly-img.s3.ap-northeast-2.amazonaws.com/2ee2bf6c-afe7-4f53-96b4-293edb349110',101),(102,'2022-08-14 07:45:12','2022-08-14 07:45:12','https://beedly-img.s3.ap-northeast-2.amazonaws.com/aae8c452-c014-40c5-b8a3-f19855096b19',104),(103,'2022-08-14 07:46:31','2022-08-14 07:46:31','https://beedly-img.s3.ap-northeast-2.amazonaws.com/ddafadb6-8be7-4b85-ba2e-b341e6769a1d',105),(104,'2022-08-14 07:49:04','2022-08-14 07:49:04','https://beedly-img.s3.ap-northeast-2.amazonaws.com/a1fcf70a-a501-4ebd-8d4b-64fcdf683390',106),(105,'2022-08-14 07:51:46','2022-08-14 07:51:46','https://beedly-img.s3.ap-northeast-2.amazonaws.com/cf89342a-3316-4c42-96f1-7d744878606f',107),(106,'2022-08-14 07:52:51','2022-08-14 07:52:51','https://beedly-img.s3.ap-northeast-2.amazonaws.com/d5b1fff2-80c1-4d6a-97e8-524c987b2fd5',108),(107,'2022-08-14 07:55:34','2022-08-14 07:55:34','https://beedly-img.s3.ap-northeast-2.amazonaws.com/576d4fd6-684a-401b-9947-f397fd94c9d8',109),(108,'2022-08-14 08:14:03','2022-08-14 08:14:03','https://beedly-img.s3.ap-northeast-2.amazonaws.com/2781bc50-81b7-40bc-9603-b11cdf279555',110),(109,'2022-08-14 08:18:38','2022-08-14 08:18:38','https://beedly-img.s3.ap-northeast-2.amazonaws.com/fb154acd-f66c-46c9-bb0a-4a6be49e3979',111),(113,'2022-08-17 07:45:35','2022-08-17 07:45:35','https://beedly-img.s3.ap-northeast-2.amazonaws.com/f913277a-bf44-47ff-8add-3c752fbaacea',113),(114,'2022-08-17 07:46:32','2022-08-17 07:46:32','https://beedly-img.s3.ap-northeast-2.amazonaws.com/608c7f1f-c33a-4c0d-80b5-8ee6b4ed0190',114),(116,'2022-08-17 08:35:41','2022-08-17 08:35:41','https://beedly-img.s3.ap-northeast-2.amazonaws.com/31b76cf9-9dc8-4b27-b939-7e96659b8e05',116),(117,'2022-08-17 08:48:25','2022-08-17 08:48:25','https://beedly-img.s3.ap-northeast-2.amazonaws.com/ab17b62f-0ab4-49c2-9faa-a6e83504817f',117),(118,'2022-08-17 08:49:07','2022-08-17 08:49:07','https://beedly-img.s3.ap-northeast-2.amazonaws.com/aeb8734b-0040-4735-992a-3aa8c6e032b1',118),(131,'2022-08-18 03:20:23','2022-08-18 03:20:23','https://beedly-img.s3.ap-northeast-2.amazonaws.com/dfeba20d-261b-4a18-b461-0cf800ad3a0c',125),(132,'2022-08-18 03:20:23','2022-08-18 03:20:23','https://beedly-img.s3.ap-northeast-2.amazonaws.com/db071f13-4998-40b1-b6ed-4b2a31e0ea92',125),(133,'2022-08-18 03:20:23','2022-08-18 03:20:23','https://beedly-img.s3.ap-northeast-2.amazonaws.com/39ce6196-74a6-48e6-880c-d0d53e311c6e',125),(134,'2022-08-18 03:39:29','2022-08-18 03:39:29','https://beedly-img.s3.ap-northeast-2.amazonaws.com/4ee90735-1af0-4af9-a2c5-b50306152a6a',126),(135,'2022-08-18 03:39:29','2022-08-18 03:39:29','https://beedly-img.s3.ap-northeast-2.amazonaws.com/d3850bbd-520e-4eb0-a4de-a1d398e0c2ce',126),(136,'2022-08-18 03:45:14','2022-08-18 03:45:14','https://beedly-img.s3.ap-northeast-2.amazonaws.com/243be0c9-83d1-441a-9ee9-88de49db9c55',127),(137,'2022-08-18 03:45:14','2022-08-18 03:45:14','https://beedly-img.s3.ap-northeast-2.amazonaws.com/8f59d539-50ae-4366-abb8-b1550a4695e3',127),(138,'2022-08-18 03:48:10','2022-08-18 03:48:10','https://beedly-img.s3.ap-northeast-2.amazonaws.com/cb1afe9c-7340-495f-be90-f3cefe140b24',128),(139,'2022-08-18 03:48:10','2022-08-18 03:48:10','https://beedly-img.s3.ap-northeast-2.amazonaws.com/1e055cc0-4ff1-4f5b-9856-9bb56fa266e1',128),(140,'2022-08-18 03:51:47','2022-08-18 03:51:47','https://beedly-img.s3.ap-northeast-2.amazonaws.com/ee7c656c-a5a0-4c54-956f-dc5dc2d70cb3',129),(141,'2022-08-18 03:51:47','2022-08-18 03:51:47','https://beedly-img.s3.ap-northeast-2.amazonaws.com/4607d7d6-2180-453c-a56c-7425ef32b858',129),(142,'2022-08-18 03:55:06','2022-08-18 03:55:06','https://beedly-img.s3.ap-northeast-2.amazonaws.com/d5027259-891c-462e-8779-cd6df6bea092',130),(143,'2022-08-18 03:55:06','2022-08-18 03:55:06','https://beedly-img.s3.ap-northeast-2.amazonaws.com/41675346-47b4-4aaa-ab7f-3a93b974f1be',130),(144,'2022-08-18 04:01:28','2022-08-18 04:01:28','https://beedly-img.s3.ap-northeast-2.amazonaws.com/b2d3a211-ac05-409a-9f46-6c3bf3f24c59',131),(145,'2022-08-18 04:01:28','2022-08-18 04:01:28','https://beedly-img.s3.ap-northeast-2.amazonaws.com/ddf69e70-7937-4091-bd7f-1b495987e161',131),(146,'2022-08-18 04:06:24','2022-08-18 04:06:24','https://beedly-img.s3.ap-northeast-2.amazonaws.com/a4251be7-3433-4ca3-8b32-7ebe3fd190c0',132),(147,'2022-08-18 04:06:24','2022-08-18 04:06:24','https://beedly-img.s3.ap-northeast-2.amazonaws.com/2b2ef976-ae04-43e9-9e77-e3b869a9935f',132),(148,'2022-08-18 04:36:19','2022-08-18 04:36:19','https://beedly-img.s3.ap-northeast-2.amazonaws.com/326be4bb-9415-42b5-b0ee-849782e9c2a9',133),(149,'2022-08-18 04:36:19','2022-08-18 04:36:19','https://beedly-img.s3.ap-northeast-2.amazonaws.com/5e969254-e72d-4241-bb5a-9886315b9ac6',133),(150,'2022-08-18 04:41:07','2022-08-18 04:41:07','https://beedly-img.s3.ap-northeast-2.amazonaws.com/2570e7d0-74c0-4cfc-906d-3dd0e8559c47',134),(151,'2022-08-18 04:47:53','2022-08-18 04:47:53','https://beedly-img.s3.ap-northeast-2.amazonaws.com/f85bf337-cba2-448c-b08f-a2e74f58e8a3',135),(152,'2022-08-18 04:51:15','2022-08-18 04:51:15','https://beedly-img.s3.ap-northeast-2.amazonaws.com/3c6945de-545f-4efd-be30-9e4f093c67a8',136),(153,'2022-08-18 07:29:36','2022-08-18 07:29:36','https://beedly-img.s3.ap-northeast-2.amazonaws.com/b99e1934-1b48-420f-b5a6-08e9546b7b63',137),(154,'2022-08-18 09:26:15','2022-08-18 09:26:15','https://beedly-img.s3.ap-northeast-2.amazonaws.com/ab5ffae4-a115-400a-928a-6ab51c2e4257',138),(155,'2022-08-18 09:26:15','2022-08-18 09:26:15','https://beedly-img.s3.ap-northeast-2.amazonaws.com/0874551e-93f1-4795-be98-8582fa5d57ed',138),(156,'2022-08-18 09:30:13','2022-08-18 09:30:13','https://beedly-img.s3.ap-northeast-2.amazonaws.com/ce733002-dadc-41df-88d6-37c3a469addb',139),(158,'2022-08-18 09:58:01','2022-08-18 09:58:01','https://beedly-img.s3.ap-northeast-2.amazonaws.com/849f0228-290f-48a2-a8f9-9bff31afff35',141),(159,'2022-08-18 09:58:52','2022-08-18 09:58:52','https://beedly-img.s3.ap-northeast-2.amazonaws.com/bdcb5279-a143-42f9-8855-a32b1ae1bdb7',142),(160,'2022-08-18 10:01:08','2022-08-18 10:01:08','https://beedly-img.s3.ap-northeast-2.amazonaws.com/f6c1f46b-65f3-4547-9439-28121e17fabe',143),(161,'2022-08-18 10:02:37','2022-08-18 10:02:37','https://beedly-img.s3.ap-northeast-2.amazonaws.com/7c184bc9-1348-488e-807f-36e7c91c465c',144),(162,'2022-08-18 10:03:59','2022-08-18 10:03:59','https://beedly-img.s3.ap-northeast-2.amazonaws.com/71535b00-1db0-4476-af9e-b2edeab4a8a6',145),(163,'2022-08-18 10:05:08','2022-08-18 10:05:08','https://beedly-img.s3.ap-northeast-2.amazonaws.com/d67b9d61-467a-4326-aa58-40a157c6f999',146),(164,'2022-08-18 10:06:29','2022-08-18 10:06:29','https://beedly-img.s3.ap-northeast-2.amazonaws.com/09e040b9-cd65-49f0-a587-cc50759acc54',147),(165,'2022-08-18 10:07:52','2022-08-18 10:07:52','https://beedly-img.s3.ap-northeast-2.amazonaws.com/1e595966-7024-4d8c-aa22-5d230554b781',148),(166,'2022-08-18 10:08:57','2022-08-18 10:08:57','https://beedly-img.s3.ap-northeast-2.amazonaws.com/4eec7b16-0873-4d9d-9070-ca708dbdaeb8',149),(167,'2022-08-18 10:09:52','2022-08-18 10:09:52','https://beedly-img.s3.ap-northeast-2.amazonaws.com/5d23af42-3cfa-4f56-9185-1c7779282a08',150),(170,'2022-08-18 10:43:14','2022-08-18 10:43:14','https://beedly-img.s3.ap-northeast-2.amazonaws.com/f8577eae-ce37-43fa-b126-58ccbcabd46c',153),(171,'2022-08-18 10:49:45','2022-08-18 10:49:45','https://beedly-img.s3.ap-northeast-2.amazonaws.com/866718c8-c01e-40d9-8fc6-49de3aab59a2',154),(172,'2022-08-18 11:24:13','2022-08-18 11:24:13','https://beedly-img.s3.ap-northeast-2.amazonaws.com/0d75146b-c7b0-4331-93e8-7e64fab1c83d',155),(181,'2022-08-18 14:36:18','2022-08-18 14:36:18','https://beedly-img.s3.ap-northeast-2.amazonaws.com/aa6d39e8-e721-4ad8-b132-1043b437741a',164),(182,'2022-08-18 15:48:14','2022-08-18 15:48:14','https://beedly-img.s3.ap-northeast-2.amazonaws.com/9ca4b1aa-0f6c-4cd7-8368-9b78c3fca181',165),(183,'2022-08-18 15:53:28','2022-08-18 15:53:28','https://beedly-img.s3.ap-northeast-2.amazonaws.com/55d43cb6-9b54-4077-96c2-2f36c144f054',166),(185,'2022-08-19 00:40:54','2022-08-19 00:40:54','https://beedly-img.s3.ap-northeast-2.amazonaws.com/04f50081-9b22-4171-ac05-0566c4de89e6',168),(186,'2022-08-19 01:46:30','2022-08-19 01:46:30','https://beedly-img.s3.ap-northeast-2.amazonaws.com/4e0fb667-68f2-4a84-904b-2ab95c9b1e19',169),(187,'2022-08-19 01:55:36','2022-08-19 01:55:36','https://beedly-img.s3.ap-northeast-2.amazonaws.com/b3b48e96-c3e1-4b1e-a73f-f913f4bb4e37',170),(188,'2022-08-19 01:58:45','2022-08-19 01:58:45','https://beedly-img.s3.ap-northeast-2.amazonaws.com/3bf965e1-acde-4635-85ee-1c2e8afd047e',171),(189,'2022-08-19 01:59:32','2022-08-19 01:59:32','https://beedly-img.s3.ap-northeast-2.amazonaws.com/cf856441-1463-44b5-a79d-bbc934856dda',172);
/*!40000 ALTER TABLE `personal_product_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_search_tag`
--

DROP TABLE IF EXISTS `personal_search_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_search_tag` (
  `p_search_tag_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `p_product_id` bigint DEFAULT NULL,
  `search_tag_id` bigint DEFAULT NULL,
  PRIMARY KEY (`p_search_tag_id`),
  KEY `FKla5nkybs2khhp6x9wanmknyek` (`p_product_id`),
  KEY `FKmjxbwqlikfd82yompuprcu4fl` (`search_tag_id`),
  CONSTRAINT `FKla5nkybs2khhp6x9wanmknyek` FOREIGN KEY (`p_product_id`) REFERENCES `personal_product` (`p_product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKmjxbwqlikfd82yompuprcu4fl` FOREIGN KEY (`search_tag_id`) REFERENCES `search_tag` (`search_tag_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=320 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_search_tag`
--

LOCK TABLES `personal_search_tag` WRITE;
/*!40000 ALTER TABLE `personal_search_tag` DISABLE KEYS */;
INSERT INTO `personal_search_tag` VALUES (23,'2022-08-14 04:54:14','2022-08-14 04:54:14',83,1),(24,'2022-08-14 04:54:14','2022-08-14 04:54:14',83,8),(25,'2022-08-14 04:54:14','2022-08-14 04:54:14',83,14),(26,'2022-08-14 04:56:51','2022-08-14 04:56:51',84,1),(27,'2022-08-14 04:56:51','2022-08-14 04:56:51',84,8),(28,'2022-08-14 04:56:51','2022-08-14 04:56:51',84,14),(29,'2022-08-14 04:58:54','2022-08-14 04:58:54',85,1),(30,'2022-08-14 04:58:54','2022-08-14 04:58:54',85,15),(31,'2022-08-14 05:02:26','2022-08-14 05:02:26',86,9),(32,'2022-08-14 05:02:26','2022-08-14 05:02:26',86,12),(33,'2022-08-14 05:02:26','2022-08-14 05:02:26',86,15),(34,'2022-08-14 05:04:20','2022-08-14 05:04:20',87,9),(35,'2022-08-14 05:04:20','2022-08-14 05:04:20',87,14),(36,'2022-08-14 05:04:20','2022-08-14 05:04:20',87,15),(37,'2022-08-14 05:13:03','2022-08-14 05:13:03',88,1),(38,'2022-08-14 05:13:03','2022-08-14 05:13:03',88,4),(39,'2022-08-14 05:13:04','2022-08-14 05:13:04',88,6),(40,'2022-08-14 05:13:04','2022-08-14 05:13:04',88,11),(41,'2022-08-14 05:13:04','2022-08-14 05:13:04',88,14),(42,'2022-08-14 05:15:50','2022-08-14 05:15:50',89,14),(43,'2022-08-14 05:15:50','2022-08-14 05:15:50',89,15),(85,'2022-08-18 03:27:02','2022-08-18 03:27:02',125,8),(86,'2022-08-18 03:27:02','2022-08-18 03:27:02',125,4),(87,'2022-08-18 03:27:02','2022-08-18 03:27:02',125,6),(88,'2022-08-18 03:27:02','2022-08-18 03:27:02',125,12),(89,'2022-08-18 03:27:02','2022-08-18 03:27:02',125,14),(90,'2022-08-18 03:39:28','2022-08-18 03:39:28',126,14),(91,'2022-08-18 03:39:28','2022-08-18 03:39:28',126,8),(92,'2022-08-18 03:39:28','2022-08-18 03:39:28',126,6),(93,'2022-08-18 03:39:28','2022-08-18 03:39:28',126,13),(94,'2022-08-18 03:39:28','2022-08-18 03:39:28',126,12),(95,'2022-08-18 03:45:14','2022-08-18 03:45:14',127,14),(96,'2022-08-18 03:45:14','2022-08-18 03:45:14',127,8),(97,'2022-08-18 03:45:14','2022-08-18 03:45:14',127,6),(98,'2022-08-18 03:45:14','2022-08-18 03:45:14',127,4),(99,'2022-08-18 03:45:14','2022-08-18 03:45:14',127,5),(100,'2022-08-18 03:45:14','2022-08-18 03:45:14',127,3),(101,'2022-08-18 03:45:14','2022-08-18 03:45:14',127,15),(102,'2022-08-18 03:45:14','2022-08-18 03:45:14',127,11),(109,'2022-08-18 03:48:10','2022-08-18 03:48:10',128,14),(110,'2022-08-18 03:48:10','2022-08-18 03:48:10',128,11),(111,'2022-08-18 03:48:10','2022-08-18 03:48:10',128,8),(112,'2022-08-18 03:48:10','2022-08-18 03:48:10',128,7),(113,'2022-08-18 03:48:10','2022-08-18 03:48:10',128,3),(114,'2022-08-18 03:48:10','2022-08-18 03:48:10',128,15),(115,'2022-08-18 03:51:47','2022-08-18 03:51:47',129,15),(116,'2022-08-18 03:51:47','2022-08-18 03:51:47',129,14),(117,'2022-08-18 03:51:47','2022-08-18 03:51:47',129,7),(118,'2022-08-18 03:51:47','2022-08-18 03:51:47',129,6),(119,'2022-08-18 03:51:47','2022-08-18 03:51:47',129,8),(120,'2022-08-18 03:55:06','2022-08-18 03:55:06',130,14),(121,'2022-08-18 03:55:06','2022-08-18 03:55:06',130,4),(122,'2022-08-18 03:55:06','2022-08-18 03:55:06',130,8),(123,'2022-08-18 03:55:06','2022-08-18 03:55:06',130,7),(124,'2022-08-18 03:55:06','2022-08-18 03:55:06',130,15),(125,'2022-08-18 03:55:06','2022-08-18 03:55:06',130,6),(126,'2022-08-18 04:01:28','2022-08-18 04:01:28',131,14),(127,'2022-08-18 04:01:28','2022-08-18 04:01:28',131,7),(128,'2022-08-18 04:01:28','2022-08-18 04:01:28',131,8),(129,'2022-08-18 04:01:28','2022-08-18 04:01:28',131,15),(130,'2022-08-18 04:06:24','2022-08-18 04:06:24',132,4),(131,'2022-08-18 04:06:24','2022-08-18 04:06:24',132,15),(132,'2022-08-18 04:06:24','2022-08-18 04:06:24',132,14),(133,'2022-08-18 04:06:24','2022-08-18 04:06:24',132,6),(134,'2022-08-18 04:36:18','2022-08-18 04:36:18',133,6),(135,'2022-08-18 04:36:18','2022-08-18 04:36:18',133,15),(136,'2022-08-18 04:41:07','2022-08-18 04:41:07',134,2),(137,'2022-08-18 04:41:07','2022-08-18 04:41:07',134,15),(138,'2022-08-18 04:41:07','2022-08-18 04:41:07',134,14),(139,'2022-08-18 04:41:07','2022-08-18 04:41:07',134,7),(140,'2022-08-18 04:41:07','2022-08-18 04:41:07',134,8),(141,'2022-08-18 04:47:53','2022-08-18 04:47:53',135,2),(142,'2022-08-18 04:47:53','2022-08-18 04:47:53',135,15),(143,'2022-08-18 04:47:53','2022-08-18 04:47:53',135,14),(144,'2022-08-18 04:51:15','2022-08-18 04:51:15',136,1),(145,'2022-08-18 04:51:15','2022-08-18 04:51:15',136,8),(146,'2022-08-18 04:51:15','2022-08-18 04:51:15',136,7),(147,'2022-08-18 04:51:15','2022-08-18 04:51:15',136,12),(150,'2022-08-18 07:29:36','2022-08-18 07:29:36',137,7),(151,'2022-08-18 09:26:14','2022-08-18 09:26:14',138,11),(152,'2022-08-18 09:26:14','2022-08-18 09:26:14',138,13),(153,'2022-08-18 09:26:14','2022-08-18 09:26:14',138,7),(154,'2022-08-18 09:26:14','2022-08-18 09:26:14',138,4),(155,'2022-08-18 09:26:14','2022-08-18 09:26:14',138,6),(156,'2022-08-18 09:30:13','2022-08-18 09:30:13',139,6),(157,'2022-08-18 09:30:13','2022-08-18 09:30:13',139,4),(158,'2022-08-18 09:30:13','2022-08-18 09:30:13',139,11),(159,'2022-08-18 09:30:13','2022-08-18 09:30:13',139,13),(164,'2022-08-18 09:58:01','2022-08-18 09:58:01',141,4),(165,'2022-08-18 09:58:01','2022-08-18 09:58:01',141,6),(166,'2022-08-18 09:58:52','2022-08-18 09:58:52',142,4),(167,'2022-08-18 09:58:52','2022-08-18 09:58:52',142,6),(168,'2022-08-18 10:01:08','2022-08-18 10:01:08',143,6),(169,'2022-08-18 10:01:08','2022-08-18 10:01:08',143,4),(170,'2022-08-18 10:02:37','2022-08-18 10:02:37',144,6),(171,'2022-08-18 10:03:59','2022-08-18 10:03:59',145,8),(172,'2022-08-18 10:03:59','2022-08-18 10:03:59',145,6),(173,'2022-08-18 10:05:08','2022-08-18 10:05:08',146,8),(174,'2022-08-18 10:05:08','2022-08-18 10:05:08',146,7),(175,'2022-08-18 10:06:28','2022-08-18 10:06:28',147,6),(176,'2022-08-18 10:06:28','2022-08-18 10:06:28',147,7),(177,'2022-08-18 10:06:28','2022-08-18 10:06:28',147,15),(178,'2022-08-18 10:07:51','2022-08-18 10:07:51',148,8),(179,'2022-08-18 10:08:57','2022-08-18 10:08:57',149,6),(180,'2022-08-18 10:09:52','2022-08-18 10:09:52',150,8),(185,'2022-08-18 10:43:14','2022-08-18 10:43:14',153,6),(186,'2022-08-18 10:43:14','2022-08-18 10:43:14',153,8),(187,'2022-08-18 10:43:14','2022-08-18 10:43:14',153,14),(188,'2022-08-18 10:49:45','2022-08-18 10:49:45',154,7),(189,'2022-08-18 10:49:45','2022-08-18 10:49:45',154,6),(190,'2022-08-18 10:49:45','2022-08-18 10:49:45',154,14),(191,'2022-08-18 10:49:45','2022-08-18 10:49:45',154,15),(195,'2022-08-18 10:51:30','2022-08-18 10:51:30',91,2),(196,'2022-08-18 10:51:30','2022-08-18 10:51:30',91,5),(197,'2022-08-18 10:51:30','2022-08-18 10:51:30',91,12),(198,'2022-08-18 10:51:30','2022-08-18 10:51:30',91,13),(202,'2022-08-18 10:51:59','2022-08-18 10:51:59',92,1),(203,'2022-08-18 10:51:59','2022-08-18 10:51:59',92,13),(204,'2022-08-18 10:51:59','2022-08-18 10:51:59',92,11),(205,'2022-08-18 10:51:59','2022-08-18 10:51:59',92,6),(206,'2022-08-18 10:56:25','2022-08-18 10:56:25',93,2),(207,'2022-08-18 10:56:25','2022-08-18 10:56:25',93,7),(208,'2022-08-18 10:56:25','2022-08-18 10:56:25',93,13),(209,'2022-08-18 10:56:25','2022-08-18 10:56:25',93,12),(210,'2022-08-18 11:24:13','2022-08-18 11:24:13',155,3),(211,'2022-08-18 11:24:13','2022-08-18 11:24:13',155,8),(212,'2022-08-18 11:24:13','2022-08-18 11:24:13',155,14),(216,'2022-08-18 11:28:27','2022-08-18 11:28:27',90,2),(217,'2022-08-18 11:28:27','2022-08-18 11:28:27',90,14),(218,'2022-08-18 11:28:27','2022-08-18 11:28:27',90,15),(231,'2022-08-18 13:14:10','2022-08-18 13:14:10',95,8),(232,'2022-08-18 13:14:10','2022-08-18 13:14:10',95,12),(233,'2022-08-18 13:14:10','2022-08-18 13:14:10',95,14),(234,'2022-08-18 13:15:48','2022-08-18 13:15:48',94,1),(235,'2022-08-18 13:15:48','2022-08-18 13:15:48',94,4),(236,'2022-08-18 13:15:48','2022-08-18 13:15:48',94,12),(237,'2022-08-18 13:15:48','2022-08-18 13:15:48',94,13),(238,'2022-08-18 13:15:48','2022-08-18 13:15:48',94,6),(239,'2022-08-18 13:16:32','2022-08-18 13:16:32',97,12),(240,'2022-08-18 13:16:32','2022-08-18 13:16:32',97,14),(241,'2022-08-18 13:16:32','2022-08-18 13:16:32',97,15),(242,'2022-08-18 13:16:32','2022-08-18 13:16:32',97,1),(243,'2022-08-18 13:16:32','2022-08-18 13:16:32',97,7),(244,'2022-08-18 13:16:55','2022-08-18 13:16:55',99,8),(245,'2022-08-18 13:16:55','2022-08-18 13:16:55',99,12),(246,'2022-08-18 13:16:55','2022-08-18 13:16:55',99,9),(247,'2022-08-18 13:16:55','2022-08-18 13:16:55',99,14),(248,'2022-08-18 13:17:18','2022-08-18 13:17:18',100,9),(249,'2022-08-18 13:17:18','2022-08-18 13:17:18',100,12),(250,'2022-08-18 13:17:18','2022-08-18 13:17:18',100,7),(251,'2022-08-18 13:17:18','2022-08-18 13:17:18',100,8),(252,'2022-08-18 13:17:18','2022-08-18 13:17:18',100,14),(253,'2022-08-18 13:29:11','2022-08-18 13:29:11',109,3),(254,'2022-08-18 13:29:11','2022-08-18 13:29:11',109,7),(255,'2022-08-18 13:37:01','2022-08-18 13:37:01',101,9),(256,'2022-08-18 13:37:29','2022-08-18 13:37:29',104,1),(257,'2022-08-18 13:37:29','2022-08-18 13:37:29',104,14),(258,'2022-08-18 13:37:29','2022-08-18 13:37:29',104,15),(261,'2022-08-18 13:38:44','2022-08-18 13:38:44',106,10),(262,'2022-08-18 13:38:44','2022-08-18 13:38:44',106,11),(263,'2022-08-18 13:38:44','2022-08-18 13:38:44',106,13),(264,'2022-08-18 13:38:44','2022-08-18 13:38:44',106,7),(265,'2022-08-18 13:38:44','2022-08-18 13:38:44',106,6),(266,'2022-08-18 13:39:13','2022-08-18 13:39:13',107,1),(267,'2022-08-18 13:39:13','2022-08-18 13:39:13',107,15),(268,'2022-08-18 13:39:13','2022-08-18 13:39:13',107,14),(269,'2022-08-18 13:39:57','2022-08-18 13:39:57',108,15),(270,'2022-08-18 13:39:57','2022-08-18 13:39:57',108,2),(271,'2022-08-18 13:40:56','2022-08-18 13:40:56',110,3),(272,'2022-08-18 13:40:56','2022-08-18 13:40:56',110,14),(273,'2022-08-18 13:46:02','2022-08-18 13:46:02',111,6),(274,'2022-08-18 13:46:02','2022-08-18 13:46:02',111,14),(275,'2022-08-18 13:46:17','2022-08-18 13:46:17',118,2),(276,'2022-08-18 13:46:17','2022-08-18 13:46:17',118,15),(277,'2022-08-18 13:46:17','2022-08-18 13:46:17',118,14),(278,'2022-08-18 14:24:51','2022-08-18 14:24:51',116,2),(279,'2022-08-18 14:24:51','2022-08-18 14:24:51',116,15),(280,'2022-08-18 14:25:14','2022-08-18 14:25:14',114,2),(281,'2022-08-18 14:25:14','2022-08-18 14:25:14',114,14),(282,'2022-08-18 14:25:34','2022-08-18 14:25:34',113,2),(283,'2022-08-18 14:25:34','2022-08-18 14:25:34',113,14),(284,'2022-08-18 14:25:34','2022-08-18 14:25:34',113,15),(288,'2022-08-18 14:36:18','2022-08-18 14:36:18',164,10),(289,'2022-08-18 14:36:18','2022-08-18 14:36:18',164,11),(290,'2022-08-18 14:36:18','2022-08-18 14:36:18',164,13),(291,'2022-08-18 15:48:14','2022-08-18 15:48:14',165,11),(292,'2022-08-18 15:48:14','2022-08-18 15:48:14',165,13),(293,'2022-08-18 15:53:28','2022-08-18 15:53:28',166,1),(294,'2022-08-18 15:53:28','2022-08-18 15:53:28',166,14),(299,'2022-08-19 00:40:54','2022-08-19 00:40:54',168,1),(300,'2022-08-19 00:40:54','2022-08-19 00:40:54',168,6),(301,'2022-08-19 00:40:54','2022-08-19 00:40:54',168,5),(304,'2022-08-19 01:18:31','2022-08-19 01:18:31',105,9),(305,'2022-08-19 01:18:31','2022-08-19 01:18:31',105,14),(306,'2022-08-19 01:46:30','2022-08-19 01:46:30',169,2),(307,'2022-08-19 01:46:30','2022-08-19 01:46:30',169,6),(308,'2022-08-19 01:46:30','2022-08-19 01:46:30',169,11),(309,'2022-08-19 01:55:36','2022-08-19 01:55:36',170,6),(314,'2022-08-19 01:58:45','2022-08-19 01:58:45',171,2),(315,'2022-08-19 01:58:45','2022-08-19 01:58:45',171,6),(316,'2022-08-19 01:58:45','2022-08-19 01:58:45',171,8),(317,'2022-08-19 01:58:45','2022-08-19 01:58:45',171,12),(318,'2022-08-19 01:59:32','2022-08-19 01:59:32',172,7),(319,'2022-08-19 01:59:32','2022-08-19 01:59:32',172,6);
/*!40000 ALTER TABLE `personal_search_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_sold`
--

DROP TABLE IF EXISTS `personal_sold`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_sold` (
  `p_sold_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `p_end_time` datetime DEFAULT NULL,
  `p_final_price` int DEFAULT NULL,
  `p_paid_flag` bit(1) DEFAULT NULL,
  `p_product_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`p_sold_id`),
  KEY `FKa3bi55j5no0d3tfqm1ac82p6m` (`user_id`),
  KEY `FKnaeh3c29lctnpy0b7blc8ub0r` (`p_product_id`),
  CONSTRAINT `FKa3bi55j5no0d3tfqm1ac82p6m` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKnaeh3c29lctnpy0b7blc8ub0r` FOREIGN KEY (`p_product_id`) REFERENCES `personal_product` (`p_product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_sold`
--

LOCK TABLES `personal_sold` WRITE;
/*!40000 ALTER TABLE `personal_sold` DISABLE KEYS */;
INSERT INTO `personal_sold` VALUES (32,'2022-08-18 02:03:00','2022-08-18 02:03:00','2022-08-18 02:03:00',275000,_binary '\0',52,8),(33,'2022-08-18 02:03:45','2022-08-18 02:03:45','2022-08-18 02:03:45',611000,_binary '\0',50,8),(42,'2022-08-19 01:27:29','2022-08-19 01:27:29','2022-08-19 01:27:29',315000,_binary '\0',90,27);
/*!40000 ALTER TABLE `personal_sold` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recommendation_tag`
--

DROP TABLE IF EXISTS `recommendation_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recommendation_tag` (
  `rec_tag_id` bigint NOT NULL AUTO_INCREMENT,
  `rec_tag_name` varchar(255) DEFAULT NULL,
  `rec_tag_brightness` int DEFAULT NULL,
  `rec_tag_saturation` int DEFAULT NULL,
  `rec_tag_temperature` int DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`rec_tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recommendation_tag`
--

LOCK TABLES `recommendation_tag` WRITE;
/*!40000 ALTER TABLE `recommendation_tag` DISABLE KEYS */;
INSERT INTO `recommendation_tag` VALUES (1,'따뜻한',0,2,5,NULL,NULL),(2,'뜨거운',-1,0,5,NULL,NULL),(3,'시원한',3,3,-5,NULL,NULL),(4,'차가운',-1,-1,-5,NULL,NULL),(5,'어두운',-5,-5,0,NULL,NULL),(6,'울적한',-3,-2,-2,NULL,NULL),(7,'우울한',-4,-3,-2,NULL,NULL),(8,'고요한',-1,-2,0,NULL,NULL),(9,'강렬한',2,5,2,NULL,NULL),(10,'부드러운',0,-1,0,NULL,NULL),(11,'산뜻한',3,2,-1,NULL,NULL),(12,'청량한',4,5,-4,NULL,NULL),(13,'고독한',-5,-4,0,NULL,NULL),(14,'장엄한',-3,-2,-2,NULL,NULL),(15,'명량한',4,3,1,NULL,NULL),(16,'단순한',0,0,0,NULL,NULL),(17,'상큼한',4,4,3,NULL,NULL),(18,'다채로운',2,5,0,NULL,NULL),(19,'평온한',-3,-2,-1,NULL,NULL),(20,'역동적인',4,5,0,NULL,NULL),(21,'잔잔한',-1,-4,-1,NULL,NULL),(22,'모던한',0,-5,0,NULL,NULL),(23,'로맨틱한',-1,0,5,NULL,NULL),(24,'정신없는',3,5,2,NULL,NULL),(25,'밝은',5,4,2,NULL,NULL);
/*!40000 ALTER TABLE `recommendation_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `search_tag`
--

DROP TABLE IF EXISTS `search_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `search_tag` (
  `search_tag_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `search_tag_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`search_tag_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `search_tag`
--

LOCK TABLES `search_tag` WRITE;
/*!40000 ALTER TABLE `search_tag` DISABLE KEYS */;
INSERT INTO `search_tag` VALUES (1,'2022-08-11 05:56:06','2022-08-11 05:56:06','수채화'),(2,'2022-08-11 05:56:06','2022-08-11 05:56:06','유화'),(3,'2022-08-11 05:56:06','2022-08-11 05:56:06','조각'),(4,'2022-08-11 05:57:44','2022-08-11 05:57:44','동물'),(5,'2022-08-11 05:57:49','2022-08-11 05:57:49','꽃'),(6,'2022-08-11 05:57:51','2022-08-11 05:57:51','자연'),(7,'2022-08-11 05:57:54','2022-08-11 05:57:54','사람'),(8,'2022-08-11 05:57:56','2022-08-11 05:57:56','도시'),(9,'2022-08-14 04:38:36','2022-08-14 04:38:36','색연필화'),(10,'2022-08-14 04:38:41','2022-08-14 04:38:41','수묵화'),(11,'2022-08-14 04:38:45','2022-08-14 04:38:45','동양화'),(12,'2022-08-14 04:38:47','2022-08-14 04:38:47','서양화'),(13,'2022-08-14 04:38:57','2022-08-14 04:38:57','고전'),(14,'2022-08-14 04:39:01','2022-08-14 04:39:01','모던'),(15,'2022-08-14 04:39:17','2022-08-14 04:39:17','추상');
/*!40000 ALTER TABLE `search_tag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `special_auction`
--

DROP TABLE IF EXISTS `special_auction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `special_auction` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `s_active_flag` bit(1) DEFAULT NULL,
  `s_board_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `cursprod_idx` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `s_board_id_UNIQUE` (`s_board_id`),
  KEY `FK38ljbkrst2gx9ulhy4c3446pg` (`user_id`),
  CONSTRAINT `FK38ljbkrst2gx9ulhy4c3446pg` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKvu90uixs9326i42wckqmot4j` FOREIGN KEY (`s_board_id`) REFERENCES `special_board` (`s_board_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `special_auction`
--

LOCK TABLES `special_auction` WRITE;
/*!40000 ALTER TABLE `special_auction` DISABLE KEYS */;
/*!40000 ALTER TABLE `special_auction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `special_bid`
--

DROP TABLE IF EXISTS `special_bid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `special_bid` (
  `s_bid_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `s_bid_price` int DEFAULT NULL,
  `s_product_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`s_bid_id`),
  KEY `FKdt4hpt1f5jgu6egd9kj9li8kx` (`user_id`),
  KEY `FKth4agv890jbwuu8c8ycc6fxu8` (`s_product_id`),
  CONSTRAINT `FKdt4hpt1f5jgu6egd9kj9li8kx` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKth4agv890jbwuu8c8ycc6fxu8` FOREIGN KEY (`s_product_id`) REFERENCES `special_product` (`s_product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `special_bid`
--

LOCK TABLES `special_bid` WRITE;
/*!40000 ALTER TABLE `special_bid` DISABLE KEYS */;
/*!40000 ALTER TABLE `special_bid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `special_board`
--

DROP TABLE IF EXISTS `special_board`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `special_board` (
  `s_board_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `s_board_desc` varchar(255) DEFAULT NULL,
  `s_board_subtitle` varchar(255) DEFAULT NULL,
  `s_board_title` varchar(255) DEFAULT NULL,
  `s_main_img_uri` varchar(255) DEFAULT NULL,
  `s_start_time` datetime DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  `is_deleted` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`s_board_id`),
  KEY `FK9ns3eruulsesn8hp841bff0k` (`user_id`),
  CONSTRAINT `FK9ns3eruulsesn8hp841bff0k` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `special_board`
--

LOCK TABLES `special_board` WRITE;
/*!40000 ALTER TABLE `special_board` DISABLE KEYS */;
INSERT INTO `special_board` VALUES (18,'2022-08-18 12:57:21','2022-08-18 13:03:03','이번 기획전의 주인공은 최근 아주 화려한 조명을 받고있는 그 화가입니다.\n\n본인만의 독특한 화풍과 표현 기법으로 폭풍적인 인기를 끌고있는 무느스크 스키오스키!\n\nBeedly에서 만나보세요!','최근 화려한 조명을 받고있는 그 화가, 지금 만나보세요!','무느스크 스키오스키 특집','https://beedly-img.s3.ap-northeast-2.amazonaws.com/5ef30f74-8475-441f-bb5f-194c50144518','2022-08-21 02:30:00',1,'N');
/*!40000 ALTER TABLE `special_board` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `special_favorite`
--

DROP TABLE IF EXISTS `special_favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `special_favorite` (
  `s_favorite_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `s_board_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`s_favorite_id`),
  KEY `FKcaqimulb62etv5rqlild5ul95` (`s_board_id`),
  KEY `FKgslh2cqnxx0p7mr9ytcj8dpe3` (`user_id`),
  CONSTRAINT `FKcaqimulb62etv5rqlild5ul95` FOREIGN KEY (`s_board_id`) REFERENCES `special_board` (`s_board_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKgslh2cqnxx0p7mr9ytcj8dpe3` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `special_favorite`
--

LOCK TABLES `special_favorite` WRITE;
/*!40000 ALTER TABLE `special_favorite` DISABLE KEYS */;
/*!40000 ALTER TABLE `special_favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `special_history`
--

DROP TABLE IF EXISTS `special_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `special_history` (
  `s_history_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `s_action_status` int DEFAULT NULL,
  `s_auction_id` bigint DEFAULT NULL,
  `s_user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`s_history_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `special_history`
--

LOCK TABLES `special_history` WRITE;
/*!40000 ALTER TABLE `special_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `special_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `special_product`
--

DROP TABLE IF EXISTS `special_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `special_product` (
  `s_product_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `s_artist_name` varchar(255) DEFAULT NULL,
  `s_product_d` int DEFAULT NULL,
  `s_product_h` int DEFAULT NULL,
  `s_product_desc` varchar(1000) DEFAULT NULL,
  `s_product_name` varchar(255) DEFAULT NULL,
  `s_sold_status` varchar(255) DEFAULT NULL,
  `s_start_price` int DEFAULT NULL,
  `s_product_w` int DEFAULT NULL,
  `category_id` bigint DEFAULT NULL,
  `s_board_id` bigint DEFAULT NULL,
  `is_deleted` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`s_product_id`),
  KEY `FK9aegmku7aeamx3rav0ffn8vy` (`category_id`),
  KEY `FKatuxmr5knkh7kiosaswms450h` (`s_board_id`),
  CONSTRAINT `FK9aegmku7aeamx3rav0ffn8vy` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKatuxmr5knkh7kiosaswms450h` FOREIGN KEY (`s_board_id`) REFERENCES `special_board` (`s_board_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `special_product`
--

LOCK TABLES `special_product` WRITE;
/*!40000 ALTER TABLE `special_product` DISABLE KEYS */;
INSERT INTO `special_product` VALUES (18,'2022-08-18 13:06:22','2022-08-18 13:06:22','무느스크 스키오스키',2,100,'광활한 숲 속. 복잡하면서도 단순한 자연의 모습을 표현했습니다.','숲의 세계','STANDBY',500000,120,1,18,'N'),(19,'2022-08-18 14:18:24','2022-08-18 14:18:24','무느스크 스키오스키',2,150,'내가 꿈꾸던 곳. 내가 꿈꾸던 그 세상. 그 세상은 어디있는걸까.','몽상','STANDBY',700000,100,1,18,'N'),(20,'2022-08-18 14:19:07','2022-08-18 14:19:07','무느스크 스키오스키',2,100,'빛이란 있다가도 없는 것이며, 없다가도 있는 것이다.','빛의 색감','STANDBY',300000,130,1,18,'N'),(21,'2022-08-18 14:20:04','2022-08-18 14:20:04','무느스크 스키오스키',3,70,'밝게 빛나던 너는 왜 망가져 버린 것일까','환상','STANDBY',230000,70,1,18,'N'),(22,'2022-08-18 14:20:51','2022-08-18 14:20:51','무느스크 스키오스키',2,100,'내가 맞는걸까 네가 맞는걸까','혼동','STANDBY',600000,130,1,18,'N');
/*!40000 ALTER TABLE `special_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `special_product_img`
--

DROP TABLE IF EXISTS `special_product_img`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `special_product_img` (
  `s_img_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `s_img_uri` varchar(255) DEFAULT NULL,
  `s_product_id` bigint DEFAULT NULL,
  PRIMARY KEY (`s_img_id`),
  KEY `FKrialbl3hjojkrxb19ydjd57g5` (`s_product_id`),
  CONSTRAINT `FKrialbl3hjojkrxb19ydjd57g5` FOREIGN KEY (`s_product_id`) REFERENCES `special_product` (`s_product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `special_product_img`
--

LOCK TABLES `special_product_img` WRITE;
/*!40000 ALTER TABLE `special_product_img` DISABLE KEYS */;
INSERT INTO `special_product_img` VALUES (38,'2022-08-18 13:06:22','2022-08-18 13:06:22','https://beedly-img.s3.ap-northeast-2.amazonaws.com/8d904b2c-b6bc-4964-b660-2e855d63621f',18),(39,'2022-08-18 14:18:24','2022-08-18 14:18:24','https://beedly-img.s3.ap-northeast-2.amazonaws.com/8df20d7c-4692-476c-b7ab-3c355eab8b4f',19),(40,'2022-08-18 14:19:08','2022-08-18 14:19:08','https://beedly-img.s3.ap-northeast-2.amazonaws.com/ece481f2-9f10-4744-b075-3e2f378b6d4d',20),(41,'2022-08-18 14:20:04','2022-08-18 14:20:04','https://beedly-img.s3.ap-northeast-2.amazonaws.com/10fdd655-44c9-424c-8f9e-05deac580ea5',21),(42,'2022-08-18 14:20:51','2022-08-18 14:20:51','https://beedly-img.s3.ap-northeast-2.amazonaws.com/a5467f39-f25b-4117-af02-dd29cf4fffe0',22);
/*!40000 ALTER TABLE `special_product_img` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `special_sold`
--

DROP TABLE IF EXISTS `special_sold`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `special_sold` (
  `s_sold_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `s_end_time` datetime DEFAULT NULL,
  `s_final_price` int DEFAULT NULL,
  `s_paid_flag` bit(1) DEFAULT NULL,
  `s_product_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`s_sold_id`),
  KEY `FKe87wgpgpv6j4i2ftdk9bgny60` (`user_id`),
  KEY `FKjvxgf3jt2ru55eekdwao3cfmb` (`s_product_id`),
  CONSTRAINT `FKe87wgpgpv6j4i2ftdk9bgny60` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKjvxgf3jt2ru55eekdwao3cfmb` FOREIGN KEY (`s_product_id`) REFERENCES `special_product` (`s_product_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `special_sold`
--

LOCK TABLES `special_sold` WRITE;
/*!40000 ALTER TABLE `special_sold` DISABLE KEYS */;
/*!40000 ALTER TABLE `special_sold` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `kakao_id` bigint DEFAULT NULL,
  `user_addr` varchar(255) DEFAULT NULL,
  `user_bday` date DEFAULT NULL,
  `user_email` varchar(255) DEFAULT NULL,
  `user_gender` varchar(255) DEFAULT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `user_nickname` varchar(255) DEFAULT NULL,
  `user_role` varchar(255) DEFAULT NULL,
  `user_tel` varchar(255) DEFAULT NULL,
  `user_brightness` int DEFAULT '0',
  `user_saturation` int DEFAULT '0',
  `user_temperature` int DEFAULT '0',
  `user_score` int DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'2022-08-05 22:03:05','2022-08-19 01:54:00',2355466496,'인천 남동구 남동대로 860','1998-02-07','rjeowornjs@naver.com','M','박재권','잭','ROLE_ADMIN','01020396329',1,4,0,NULL),(8,'2022-08-07 21:42:27','2022-08-11 02:49:00',2375901465,NULL,'1997-01-27','2sy0127@naver.com','F','쥴리(Julie)','쥴리(Julie)','ROLE_ADMIN','010-8828-8203',0,0,0,NULL),(16,'2022-08-11 05:02:45','2022-08-19 01:32:40',2375905641,'서울 강동구 상암로 375-16(상일동,삼성그린빌라) 104동 402호','1996-01-10','dbwlsanes123@hanmail.net','F','차유진','차유차유','ROLE_ADMIN','01091450628',7,7,1,NULL),(17,'2022-08-12 08:37:20','2022-08-18 02:52:26',2385845518,'경기 성남시 분당구 대왕판교로606번길 45(삼평동,판교역 푸르지오시티) 123번방','2022-08-11','msg0125@naver.com','M','기저기','자취생 Eric','ROLE_ARTIST','01012345678',7,14,1,NULL),(25,'2022-08-18 14:38:27','2022-08-18 14:39:59',2371704057,'경기 남양주시 진접읍 금강로 1553-26(장현리,신우아파트) 106동 1305호','1998-12-28','dldkgus98@naver.com','F','이아현','햄토리','ROLE_ARTIST','01028721882',-5,-2,-1,NULL),(27,'2022-08-19 01:22:10','2022-08-19 01:56:01',2375668263,'경기 용인시 기흥구 관곡로 16(신갈동,갈현마을 현대홈타운) 506동101호','1997-03-01','zazachucky@naver.com','M','문석희','자자쳐키','ROLE_ARTIST','01088545471',-6,-4,-12,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_recommendation`
--

DROP TABLE IF EXISTS `user_recommendation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_recommendation` (
  `user_rec_id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `rec_tag_id` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`user_rec_id`),
  KEY `FKpesdt5o09ecgwyy5tyitoorad` (`rec_tag_id`),
  KEY `FKrs534a1t9mqluofcvu5ph3g5o` (`user_id`),
  CONSTRAINT `FKpesdt5o09ecgwyy5tyitoorad` FOREIGN KEY (`rec_tag_id`) REFERENCES `recommendation_tag` (`rec_tag_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FKrs534a1t9mqluofcvu5ph3g5o` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=727 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_recommendation`
--

LOCK TABLES `user_recommendation` WRITE;
/*!40000 ALTER TABLE `user_recommendation` DISABLE KEYS */;
INSERT INTO `user_recommendation` VALUES (262,'2022-08-12 08:39:22','2022-08-12 08:39:22',7,17),(263,'2022-08-12 08:39:22','2022-08-12 08:39:22',9,17),(264,'2022-08-12 08:39:22','2022-08-12 08:39:22',12,17),(265,'2022-08-12 08:39:22','2022-08-12 08:39:22',14,17),(266,'2022-08-12 08:39:22','2022-08-12 08:39:22',20,17),(267,'2022-08-12 08:39:22','2022-08-12 08:39:22',23,17),(268,'2022-08-12 08:39:22','2022-08-12 08:39:22',25,17),(465,'2022-08-18 14:39:59','2022-08-18 14:39:59',1,25),(466,'2022-08-18 14:39:59','2022-08-18 14:39:59',3,25),(467,'2022-08-18 14:39:59','2022-08-18 14:39:59',10,25),(468,'2022-08-18 14:39:59','2022-08-18 14:39:59',13,25),(469,'2022-08-18 14:39:59','2022-08-18 14:39:59',19,25),(704,'2022-08-18 14:58:05','2022-08-18 14:58:05',1,1),(705,'2022-08-18 14:58:05','2022-08-18 14:58:05',2,1),(706,'2022-08-18 14:58:05','2022-08-18 14:58:05',3,1),(707,'2022-08-18 14:58:05','2022-08-18 14:58:05',4,1),(718,'2022-08-19 01:23:32','2022-08-19 01:23:32',3,27),(719,'2022-08-19 01:23:32','2022-08-19 01:23:32',4,27),(720,'2022-08-19 01:23:32','2022-08-19 01:23:32',13,27),(721,'2022-08-19 01:23:32','2022-08-19 01:23:32',14,27),(722,'2022-08-19 01:32:40','2022-08-19 01:32:40',9,16),(723,'2022-08-19 01:32:40','2022-08-19 01:32:40',11,16),(724,'2022-08-19 01:32:40','2022-08-19 01:32:40',16,16),(725,'2022-08-19 01:32:40','2022-08-19 01:32:40',18,16),(726,'2022-08-19 01:32:40','2022-08-19 01:32:40',22,16);
/*!40000 ALTER TABLE `user_recommendation` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-19 11:04:30
