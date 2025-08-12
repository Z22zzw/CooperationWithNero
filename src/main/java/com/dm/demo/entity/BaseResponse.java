package com.dm.demo.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class BaseResponse {
    private Menu menu;
    private Profiles profiles;
}
