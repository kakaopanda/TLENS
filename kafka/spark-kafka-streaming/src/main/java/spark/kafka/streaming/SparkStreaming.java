package spark.kafka.streaming;

import org.apache.spark.SparkConf;
import org.apache.spark.api.java.JavaSparkContext;
import org.apache.spark.streaming.Durations;
import org.apache.spark.streaming.api.java.JavaStreamingContext;

import java.time.Duration;
import java.util.HashSet;

public class SparkStreaming {
    public static JavaSparkContext sc;

    private static final String BOOTSTRAP_SERVER = "j8c206.p.ssafy.io:9092";
    private static final String TOPIC_NAME = "tlens";
    public static void main(String[] args) {

        SparkConf sparkConf = new SparkConf();
        sparkConf.setMaster("local[2]");
        sparkConf.setAppName("SparkStreaming");

        JavaStreamingContext jsc = new JavaStreamingContext(sparkConf, Durations.seconds(10));

        HashSet<String> topicsSet
    }
}
