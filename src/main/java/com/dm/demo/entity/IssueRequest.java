package com.dm.demo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;

@Data
public class IssueRequest {
    @JsonProperty("project_id")
    private String projectId;

    @JsonProperty("issueList")
    private ArrayList<Issues> issueList;
}
