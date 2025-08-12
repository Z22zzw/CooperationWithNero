package com.dm.demo.entity;

import lombok.Data;

import java.util.List;

@Data
public class ProjectDetailsResponse {
    private String id;
    private String name;
    private int totalUp;
    private int totalCite;
    private List<ProjectMention> projectMentions;
    private List<ProjectPlatformDivision> projectPlatformDivisions;
    private List<ProjectRegionalDivision> projectRegionalDivisions;
    private List<ProjectChangeLine> projectChangeLines;
}
