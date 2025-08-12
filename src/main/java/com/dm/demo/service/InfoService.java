package com.dm.demo.service;

import com.dm.demo.entity.BaseResponse;
import com.dm.demo.entity.ProjectDetailsResponse;
import com.dm.demo.entity.Request;
import org.springframework.stereotype.Service;


public interface InfoService{

    BaseResponse getBaseInfo(String userid);

    String HandleText(String text);

    ProjectDetailsResponse getProjectDetails(String projectId);

    void addProject(Request request);
}
