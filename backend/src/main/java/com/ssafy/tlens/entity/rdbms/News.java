package com.ssafy.tlens.entity.rdbms;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class News extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "news_id")
    private Long newsId;

    @Column(name = "title" , length = 50)
    @NotNull
    private String title;

    @Column(name = "summary")
    private String summary;

    @Column(name = "reporter" , length = 50)
    private String reporter;

    @Column(name = "press" , length = 50)
    private String press;

    @Column(name = "region" , length = 100)
    private String region;

    @Column(name = "category" , length = 50)
    private String category;

    @Column(name = "enterprise" , length = 50)
    private String enterprise;

    @Column(name = "thumbnail" , length = 300)
    private String thumbNail;

    @Column(name = "link" , length = 300)
    private String link;

    @OneToMany(mappedBy = "news")
    private List<Scrap> scraps = new ArrayList<>();

    @Override
    public String toString() {
        return "News{" +
                "newsId=" + newsId +
                ", title='" + title + '\'' +
                ", summary='" + summary + '\'' +
                ", reporter='" + reporter + '\'' +
                ", press='" + press + '\'' +
                ", region='" + region + '\'' +
                ", category='" + category + '\'' +
                ", enterprise='" + enterprise + '\'' +
                ", thumbNail='" + thumbNail + '\'' +
                ", link='" + link + '\'' +
                ", scraps=" + scraps +
                '}';
    }
}