package com.dm.demo.entity;

import lombok.Data;

@Data
public class ProjectMention {
    private String id;
    private String project_id;
    private String name;
    private String visibility;
    private String change_indicator;
}
