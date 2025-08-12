package com.dm.demo.mapper;

import com.dm.demo.DTO.IssuesDTO;
import com.dm.demo.entity.*;
import org.apache.ibatis.annotations.*;

import java.util.Date;
import java.util.List;

@Mapper
public interface DemoMapper {
//    @Select("select * from user")
//    List<User> findAll();

    //
    //插入 issues
    //
    @Insert("INSERT INTO projects_issues SET id = #{issues_id}, name = #{issues_name}, mention_times = #{issues_mention_times}, citations = #{issues_citations}, updated_at = #{issues_updated_time},issues_project_id=#{issues_project_id}")
    void putIssues(@Param("issues_id") String issues_id,
                   @Param("issues_name") String issues_name,
//                          @Param("issues_platform_name") List<String> issues_platform_name,
                   @Param("issues_mention_times") int issues_mention_times,
                   @Param("issues_citations") int issues_citations,
                   @Param("issues_updated_time") Date issues_updated_time,
                   @Param("issues_project_id") String issues_project_id);

    @Select("select * from projects_issues where projects_issues.issues_project_id=#{id} order by updated_at desc")
    List<IssuesDTO> findByProjectId(@Param("id") String id);

    @Select("select * from projects_issues")
    List<Issues> findAll();

    @Select("select * from projects_issues where id = #{id}")
    List<Issues> findById(@Param("id") String id);

    @Delete("delete from projects_issues where id = #{id}")
    void deleteIssuesById(@Param("id") String id);


    //
    //通过userid查询dashboard初始值
    //
    @Select("SELECT * from profiles where userid = #{id}")
    Profiles getProfile(@Param("id") String id);

    @Select("SELECT * from projects where userid = #{id}")
    List<Projects> getProject(@Param("id") String id);

    @Select("SELECT * from domains where userid = #{id}")
    List<Domains> getDomains(@Param("id") String id);

    //
    //插入Project
    //
    /*
         * 插入项目主表
         */
        @Insert("INSERT INTO projects SET " +
                "userid = #{userid}, " +
                "id = #{id}, " +
                "name = #{name}, " +
                "created_time = NOW(), " +
                "issues = 0, " +
                "updateTime = NOW(), " +
                "updated_time = NOW(), " +
                "mostVisible = #{defaultValue}, " +
                "yourVisibility = #{defaultValue}, " +
                "topCitation = #{defaultValue}, " +
                "yourCitation = #{defaultValue}")
        int insertProject(@Param("userid") String userid,
                          @Param("id") String id,
                          @Param("name") String name,
                          @Param("defaultValue") String defaultValue);
    /**
     * 插入项目统计表
     */
    @Insert("INSERT INTO project_stats SET " +
            "project_id = #{projectId}, " +
            "total_up = 0, " +
            "total_cite = 0")
    int insertProjectStats(@Param("projectId") String projectId);

    /**
     * 插入区域划分表
     */
    @Insert("INSERT INTO regional_divisions SET " +
            "project_id = #{projectId}, " +
            "name = #{defaultValue}, " +
            "visibility = #{defaultValue}, " +
            "change_indicator = #{defaultValue}")
    int insertRegionalDivision(@Param("projectId") String projectId,
                               @Param("defaultValue") String defaultValue);

    /**
     * 插入平台划分表
     */
    @Insert("INSERT INTO platform_divisions SET " +
            "project_id = #{projectId}, " +
            "name = #{defaultValue}, " +
            "visibility = #{defaultValue}, " +
            "change_indicator = #{defaultValue}")
    int insertPlatformDivision(@Param("projectId") String projectId,
                               @Param("defaultValue") String defaultValue);

    /**
     * 插入变化线表
     */
    @Insert("INSERT INTO change_lines SET " +
            "project_id = #{projectId}, " +
            "x_value = #{defaultValue}, " +
            "y_value = #{defaultValue}")
    int insertChangeLine(@Param("projectId") String projectId,
                         @Param("defaultValue") String defaultValue);
    //
    //查变化
    //
    @Select("select name from projects where id = #{id}")
    String getProjectName(@Param("id") String id);

    @Select("select * from project_stats where project_id=#{id}")
    ProjectStats getProjectStats(@Param("id") String id);

    @Select("select * from project_mentions where project_id=#{id}")
    List<ProjectMention> getProjectMentions(@Param("id") String id);

    @Select("select * from platform_divisions where project_id= #{id}")
    List<ProjectPlatformDivision> getProjectPlatformDivisions(@Param("id") String id);

    @Select("select * from regional_divisions where project_id= #{id}")
    List<ProjectRegionalDivision> getProjectRegionalDivisions(@Param("id") String id);

    @Select("select * from change_lines where project_id= #{id}")
    List<ProjectChangeLine> getProjectChangeLines(@Param("id") String id);

    @Delete("delete from projects where id = #{projectId}")
    void deleteProjectById(ProjectId projectId);

//@Update("update projects_issues set issues_name = #{issues_name}, issues_platform_name = #{issues_platform_name}, " +
//        "issues_mention_times = #{issues_mention_times}, issues_citations = #{issues_citations}, " +
//        "issues_updated_time = #{issues_updated_time}, issues_project_id = #{issues_project_id}, " +
//        " where issues_id = #{issues_id}")
//public void modifyIssues(@Param("issues_id") String issues_id,
//                      @Param("issues_name") String issues_name,
//                      @Param("issues_platform_name") String issues_platform_name,
//                      @Param("issues_mention_times") int issues_mention_times,
//                      @Param("issues_citations") int issues_citations,
//                      @Param("issues_updated_time") Date issues_updated_time,
//                      @Param("issues_project_id") String issues_project_id);

}