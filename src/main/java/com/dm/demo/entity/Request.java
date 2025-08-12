package com.dm.demo.entity;

import com.dm.demo.entity.Project;
import lombok.Data;

@Data
public class Request {
    private Project project;
    private String userid;
}
