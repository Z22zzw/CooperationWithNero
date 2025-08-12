package com.dm.demo.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UserId {
    @JsonProperty("userid")
    private String userid;
}
