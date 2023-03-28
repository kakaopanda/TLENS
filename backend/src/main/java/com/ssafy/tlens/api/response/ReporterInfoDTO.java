package com.ssafy.tlens.api.response;

import com.ssafy.tlens.entity.rdbms.News;
import com.ssafy.tlens.entity.rdbms.Reporter;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ReporterInfoDTO {

    private String name;
    private String press;
    private String thumbnail;

    public ReporterInfoDTO(Reporter reporter) {
        name = reporter.getName();
        press = reporter.getPress().getName();
        thumbnail = reporter.getThumbnail();
    }
}
