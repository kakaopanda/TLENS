package com.tlens.kafkaproducer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;
import org.springframework.util.concurrent.ListenableFuture;
import org.springframework.util.concurrent.ListenableFutureCallback;

@Service
public class KafkaProducerService {

    private static final String TOPIC_NAME = "tlens";
    @Autowired
    private KafkaTemplate<String, Message> kafkaTemplate;

    @Autowired
    private KafkaTemplate<String, String> msgKafkaTemplate;

    public void sendJson(Message message) {
        kafkaTemplate.send(TOPIC_NAME, message);
    }

    public void send(String message) {
        msgKafkaTemplate.send(TOPIC_NAME, message);
    }

    public void sendWithCallback(String message) {
        ListenableFuture<SendResult<String, String>> future = msgKafkaTemplate.send(TOPIC_NAME, message);

        future.addCallback(new ListenableFutureCallback<SendResult<String, String>>() {
            @Override
            public void onFailure(Throwable ex) {
                System.out.println("Failed " + message + " due to : " + ex.getMessage());
            }

            @Override
            public void onSuccess(SendResult<String, String> result) {
                System.out.println("Sent " + message + " offset:" + result.getRecordMetadata().offset());
            }
        });
    }
}
