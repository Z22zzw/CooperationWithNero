package com.dm.demo.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class Projects {
    private String id;
    private String name;
    private String issues;

    private LocalDateTime updateTime;
    private String mostVisible = "";
    private String yourVisibility;
    private String topCitation;
    private String yourCitation;

}
