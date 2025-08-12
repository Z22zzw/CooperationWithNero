package com.dm.demo.DTO;

import lombok.Data;

import java.util.Date;

@Data
public class IssuesDTO {
    private String id;
    private String name;
    private int mention_times;
    private int citations;
    private Date updated_at;
}
