package com.dm.demo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Date;

@Data
public class Issues {
    @JsonProperty("id")  // 改为 JSON 中的字段名
    private String issues_id;

    @JsonProperty("name")
    private String issues_name;

    @JsonProperty("mention_times")
    private Integer issues_mention_times;

    @JsonProperty("citations")
    private Integer issues_citations;

    @JsonProperty("updated_at")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private Date issues_updated_time;

    @JsonProperty("issues_project_id")
    private String issues_project_id;
}