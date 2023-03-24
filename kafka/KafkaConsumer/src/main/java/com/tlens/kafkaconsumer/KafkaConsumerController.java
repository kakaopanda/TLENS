package com.tlens.kafkaconsumer;

import org.springframework.stereotype.Controller;

@Controller
public class KafkaConsumerController {

    private final static String TOPIC_NAME = "deal";
    private final static String BOOTSTRAP_SERVERS = "";
    private final static String SECURITY_PROTOCOL = "SASL_SSL";
    private final static String JAAS_CONFIG = "org.apache.kafka.common." +
            "security.plain.PlainLoginModule   required username=''   " +
            "password='';";
    private final static String SSL_ENDPOINT = "https";
    private final static String SASL_MECHANISM = "PLAIN";
    private final static String GROUP_ID = "consumer-save-veggiemeal-";
    private final static int CONSUMER_COUNT = 6; // Partition 개수와 연동될 쓰레드 개수 (1 Partition : 1 Consumer Thread)
//    private final static List<ConsumerWorker> workers = new ArrayList<>();
}
