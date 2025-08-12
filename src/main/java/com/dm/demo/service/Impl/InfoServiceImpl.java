package com.dm.demo.service.Impl;

import com.dm.demo.entity.*;
import com.dm.demo.mapper.DemoMapper;
import com.dm.demo.service.InfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InfoServiceImpl implements InfoService {

    @Autowired
    DemoMapper demoMapper;

    @Override
    public BaseResponse getBaseInfo(String userid) {

        if(userid == null||userid.trim().isEmpty()){
            throw new RuntimeException("用户ID不能为空");
        }
        BaseResponse baseResponse = new BaseResponse();

        baseResponse.setMenu(new Menu());
        baseResponse.setProfiles(new Profiles());
        baseResponse.getMenu().setProjects(new ArrayList<>());
        baseResponse.getMenu().setDomains(new ArrayList<>());

        baseResponse.getMenu().setProjects(demoMapper.getProject(userid));
        baseResponse.getMenu().setDomains(demoMapper.getDomains(userid));
        baseResponse.setProfiles(demoMapper.getProfile(userid));
//
//        System.out.println("正在查询用户: " + userid);  // 调试日志
//
//        Profiles profile = demoMapper.getProfile(userid);
//        System.out.println("档案查询结果: " + profile);  // 必须非null
//
//        List<Projects> projects = demoMapper.getProject(userid);
//        System.out.println("项目数量: " + projects.size());
        return baseResponse;
    }


    int globalCnt = 0;
    @Override
    public String HandleText(String text) {
        return null;
    }

    @Override
    public ProjectDetailsResponse getProjectDetails(String projectId) {
        ProjectDetailsResponse projectDetailsResponse = new ProjectDetailsResponse();
        projectDetailsResponse.setId(projectId);
        projectDetailsResponse.setName(demoMapper.getProjectName(projectId));
        projectDetailsResponse.setTotalUp(demoMapper.getProjectStats(projectId).getTotal_up());
        projectDetailsResponse.setTotalCite(demoMapper.getProjectStats(projectId).getTotal_cite());
        projectDetailsResponse.setProjectMentions(demoMapper.getProjectMentions(projectId));
        projectDetailsResponse.setProjectPlatformDivisions(demoMapper.getProjectPlatformDivisions(projectId));
        projectDetailsResponse.setProjectRegionalDivisions(demoMapper.getProjectRegionalDivisions(projectId));
        projectDetailsResponse.setProjectChangeLines(demoMapper.getProjectChangeLines(projectId));
        return projectDetailsResponse;
    }

    @Override
    public void addProject(Request request) {
        String d = "空";
        demoMapper.insertProject(request.getUserid(),request.getProject().getId(),request.getProject().getName(),d);
        demoMapper.insertProjectStats(request.getProject().getId());
        demoMapper.insertRegionalDivision(request.getProject().getId(),d);
        demoMapper.insertChangeLine(request.getProject().getId(),d);
    }
}
