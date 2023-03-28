package com.ssafy.tlens.api.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TrendWordcloudDTO {
    
    private String name;
    private int cnt;
    
}
