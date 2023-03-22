package com.ssafy.tlens.entity.rdbms;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class News extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "news_id")
    private Long newsId;

    @Column(name = "title" , length = 50)
    @NotNull
    private String title;

    @Column(name = "summary")
    @NotNull
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

    @OneToMany(mappedBy = "news")
    private List<UserNewsScrap> scraps = new ArrayList<>();
}