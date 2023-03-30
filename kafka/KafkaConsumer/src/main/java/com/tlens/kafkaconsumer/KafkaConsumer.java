package com.tlens.kafkaconsumer;

import com.tlens.kafkaconsumer.util.KafkaConstants;
import org.apache.hadoop.shaded.org.eclipse.jetty.websocket.common.frames.DataFrame;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.apache.spark.SparkConf;
import org.apache.spark.sql.Dataset;
import org.apache.spark.sql.Row;
import org.apache.spark.sql.SparkSession;
import org.apache.spark.sql.streaming.OutputMode;
import org.apache.spark.sql.streaming.StreamingQueryException;
import org.apache.spark.streaming.Durations;
import org.apache.spark.streaming.api.java.JavaStreamingContext;
import org.apache.spark.streaming.kafka010.ConsumerStrategies;
import org.apache.spark.streaming.kafka010.KafkaUtils;
import org.apache.spark.streaming.kafka010.LocationStrategies;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeoutException;

@Component
public class KafkaConsumer implements ApplicationRunner {

//    @Override
//    public void run(ApplicationArguments args) throws TimeoutException, StreamingQueryException {
//        SparkConf conf = new SparkConf()
//                .setAppName(KafkaConstants.TOPIC_NAME)
//                .setMaster("local[2]");
//
//        Dataset<Row> df = SparkSession.builder()
//                .config(conf)
//                .getOrCreate()
//                .readStream()
//                .format("kafka")
//                .option("kafka.bootstrap.servers", "j8c206.p.ssafy.io:9092")
//                .option("subscribe", KafkaConstants.TOPIC_NAME)
//
//                .option("startingOffsets", "earliest")
//                .option("maxOffsetsPerTrigger", 10)
//                .option("stopGracefullyOnShutdown", true)
//
//                .option("group.id", "consumer")
//                .load();
//
//        df.selectExpr("CAST(key AS STRING)", "CAST(value AS STRING)")
//                .writeStream()
//                .format("console")
//                .outputMode(OutputMode.Append())
//                .start()
//                .awaitTermination();
//    }

    @Override
    public void run(ApplicationArguments args) {
        SparkConf conf = new SparkConf()
                .setAppName(KafkaConstants.TOPIC_NAME)
                .setMaster("local[2]");
//                .setMaster("spark://cluster.p.ssafy.io:43463");

        JavaStreamingContext jsc = new JavaStreamingContext(conf, Durations.seconds(5));

        Map<String, Object> kafkaParams = Map.of(
                "bootstrap.servers", "j8c206.p.ssafy.io:9092",
                "group.id", "consumer-tlens-1",
                "key.deserializer", StringDeserializer.class.getName(),
                "value.deserializer", StringDeserializer.class.getName(),
                "key.serializer", StringSerializer.class.getName(),
                "value.serializer", StringSerializer.class.getName(),
                "auto.offset.reset", "earliest",
                "enable.auto.commit", false
        );

        KafkaUtils.createDirectStream(
                        jsc,
                        LocationStrategies.PreferConsistent(),
                        ConsumerStrategies.<String, String>Subscribe(List.of(KafkaConstants.TOPIC_NAME), kafkaParams)
                )
                .map(ConsumerRecord::value)
                .print();

        jsc.start();

        try {
            jsc.awaitTermination();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

}
