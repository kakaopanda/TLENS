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
public class Region {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "region_id")
    private Long regionId;

    @Column(name = "name", length = 100)
    private String name;

    // 순환참조
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "super_region_id")
    private Region superRegion;

    @OneToMany(mappedBy = "superRegion", fetch = FetchType.LAZY)
    private List<Region> subRegions;

    @OneToMany(mappedBy = "region")
    private List<RegionTrend> trends = new ArrayList<>();
}
