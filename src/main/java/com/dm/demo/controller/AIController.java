package com.dm.demo.controller;

import com.dm.demo.mapper.DemoMapper;
import com.dm.demo.service.InfoService;
import com.dm.demo.util.ChatCompletionsExample;
import com.dm.demo.util.ChatDoubao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.HashMap;
import java.util.Map;

@RestController
//@CrossOrigin(origins = "*") // 允许所有跨域请求
public class AIController {

    @Autowired
    public DemoMapper demoMapper;

    @Autowired
    public InfoService infoService;
    protected String questionFromAI;

    //客服
    @PostMapping("/api/chat")
    public String chat(@RequestParam("question") String question) {
        return ChatCompletionsExample.getStandardChatResponse(question);
    }

    //请求Ai回答,给出相关问题
    @PostMapping("/questionAI")
    public Object handleQuestion(@RequestParam("question") String question) {
        return ChatCompletionsExample.returnJson( question);
    }

    //通过相关问题，获取Ai回答
    @GetMapping("/api/askAi")
    public String askAi(@RequestParam("question") String question, @RequestParam("ai_name") String ai_name){
        return ChatCompletionsExample.DeepSeek(question);
    }

    //获取流式传输
    @GetMapping("/api/askaiai")
    public SseEmitter askAi(@RequestParam("message") String message){
        return ChatDoubao.askDoubao(message);
    }



//以下部分为测试用途

    @GetMapping("/api/test")
    SseEmitter T1() {
        SseEmitter emitter = new SseEmitter();
        new Thread(() -> {
            try {
                for (int i = 0; i < 20; i++) {
                    emitter.send(SseEmitter.event().id(String.valueOf(i))
                            .name("msg").data("sse" + i));
                    Thread.sleep(100);
                }
                emitter.complete();
            } catch (Exception e) { emitter.completeWithError(e);}
        }).start();
        return emitter;
    }



//    @PostMapping("/raiseQuestion")
//    public String raiseQuestion(@RequestParam("key")String key){
//        String text = ChatCompletionsExample.raiseTheQuestion(key);
//        questionFromAI = text;
//        return text;
//    }
//
//    @GetMapping("/analyseQuestion")
//    public String analyseQuestion(){
//        return ChatCompletionsExample.analyseTheQuestion(questionFromAI);
//    }

    //测试使用
//    @GetMapping("/api/menuDetails")
//    public Object menuDetail(){
//        Menus menus = new Menus();
//
//        List<Object> list = new ArrayList<>();
//        menus.setName("首项目");
//        menus.setId("1234");
//        list.add(menus);
//        list.add(menus);
//
//
//        Profiles profiles = new Profiles();
//        profiles.setEmail("111");
//        profiles.setName("nero");
//
//        Response response = new Response();
//        response.setMenus(menus);
//        response.setProfiles(profiles);
//        Map<Object,Object> map = new HashMap<>();
//
//        map.put("menu",list);
//        map.put("profiles",profiles);
//        return map;
//    }

    //获取项目详情
//    @GetMapping("/api/projects/{id}")
//    public Object projectDetails(){
//
//    }
//    @GetMapping("/api/Test")
//    public Object test(@RequestParam("question") String question){
//        return ChatCompletionsExample.Test("测试");
//    }
}