package com.tlens.kafkaconsumer;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.spark.SparkConf;
import org.apache.spark.api.java.function.PairFunction;
import org.apache.spark.streaming.Duration;
import org.apache.spark.streaming.api.java.JavaInputDStream;
import org.apache.spark.streaming.api.java.JavaStreamingContext;
import org.apache.spark.streaming.kafka010.ConsumerStrategies;
import org.apache.spark.streaming.kafka010.KafkaUtils;
import org.apache.spark.streaming.kafka010.LocationStrategies;
import org.springframework.boot.CommandLineRunner;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Component;
import scala.Tuple2;

import java.util.*;

@Component
@RequiredArgsConstructor
public class KafkaConsumer implements CommandLineRunner {

    private static final String TOPIC_NAME = "tlens";

    @Override
    public void run(String... args) throws Exception {
        SparkConf conf = new SparkConf()
                .setAppName(TOPIC_NAME)
                .setMaster("spark://cluster.p.ssafy.io:39735")
                .set("spark.driver.allowMultipleContexts", "true");
        JavaStreamingContext jsc = new JavaStreamingContext(conf, new Duration(100));

        Map<String, Object> kafkaParams = new HashMap<String, Object>();
        kafkaParams.put("bootstrap.servers", "j8c206.p.ssafy.io:9092");
        kafkaParams.put("group.id", "consumer-tlens");
        kafkaParams.put("auto.offset.reset", "earliest");
        kafkaParams.put("enable.auto.commit", false);

        Collection<String> topics = Arrays.asList("tlens");

        JavaInputDStream<ConsumerRecord<String, String>> stream = KafkaUtils.createDirectStream(
                jsc, LocationStrategies.PreferConsistent(), ConsumerStrategies.<String, String>Subscribe(topics, kafkaParams));

        stream.mapToPair(
                new PairFunction<ConsumerRecord<String, String>, String, String>() {
                    public Tuple2<String, String> call(ConsumerRecord<String, String> record) {
                        return new Tuple2<String, String>(record.key(), record.value());
                    }
                });

        stream.map(ConsumerRecord::value).print();

        jsc.start();
        jsc.awaitTermination();

    }
}
