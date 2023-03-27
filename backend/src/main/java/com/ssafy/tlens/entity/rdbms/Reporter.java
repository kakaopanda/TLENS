package com.ssafy.tlens.entity.rdbms;

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
public class Reporter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "reporter_id")
    private Long reporterId;

    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @Column(name = "department", nullable = false, length = 50)
    private String department;

    @Builder.Default
    @OneToMany(mappedBy = "reporter")
    private List<ReporterTrend> trends = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "reporter")
    private List<Subscribe> subscribes = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "press_id")
    private Press press;
}
