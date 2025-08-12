package com.dm.demo.entity;

import lombok.Builder;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Menu {
    private  List<Projects> projects;
    private  List<Domains> domains;

}
