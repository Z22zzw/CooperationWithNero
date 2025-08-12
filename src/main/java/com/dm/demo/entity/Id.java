package com.dm.demo.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class Id {
    @JsonProperty("id")
    private List<String> id;
}
