package com.dm.demo.entity;

import lombok.Data;

import java.util.List;

@Data
public class IssueResponse {
    private List<Issues> issues;
    private boolean success;

}
