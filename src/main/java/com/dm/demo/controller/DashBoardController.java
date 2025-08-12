package com.dm.demo.controller;

import com.dm.demo.DTO.IssuesDTO;
import com.dm.demo.entity.*;
import com.dm.demo.mapper.DemoMapper;
import com.dm.demo.service.InfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class DashBoardController {

    @Autowired
    DemoMapper demoMapper;
    @Autowired
    InfoService infoService;


    @PostMapping("/api/base")
    public BaseResponse base(@RequestBody UserId userid){
        return infoService.getBaseInfo(userid.getUserid());
    }

    @PostMapping("/api/issues")
    public List<IssuesDTO> responseIssues(@RequestBody Uid uid){
//        System.out.println(uid.getProject_id());
        return demoMapper.findByProjectId(uid.getProject_id());
    }
    @PutMapping("/api/addissue")
    public ResponseEntity<?> addIssues(@RequestBody IssueRequest issueRequest) {
        ArrayList<Issues> issues = issueRequest.getIssueList();
        try{
            for (Issues issue : issues) {
                demoMapper.putIssues(issue.getIssues_id(),issue.getIssues_name(),issue.getIssues_mention_times(),issue.getIssues_citations(),issue.getIssues_updated_time(), issueRequest.getProjectId());
            }
            return ResponseEntity.ok("添加成功");
        }catch (Exception e){
            return ResponseEntity.status(500).body("添加失败"+e.getMessage() + issues + issueRequest.getProjectId());
        }
    }

    @DeleteMapping("api/deleteIssues")
    public ResponseEntity<?> deleteIssues(@RequestBody Id id) {
        try{
            for(String i: id.getId()){
                demoMapper.deleteIssuesById(i);
            }
            return ResponseEntity.ok("已删除");
        }
        catch (Exception e){
            return ResponseEntity.status(500).body("删除失败"+e.getMessage());
        }
    }

    @PutMapping("/api/addProject")
    public void addProject(@RequestBody Request request){
        infoService.addProject(request);
    }

    @GetMapping("/api/projectDetails")
    public ProjectDetailsResponse getProjectDetails(@RequestParam("projectId") String projectId) {
        return infoService.getProjectDetails(projectId);
    }

    @DeleteMapping("/api/deleteProject")
    public void deleteProject(@RequestBody ProjectId projectId) {
        demoMapper.deleteProjectById(projectId);
    }
}
