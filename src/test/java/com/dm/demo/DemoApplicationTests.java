package com.dm.demo;

import com.dm.demo.entity.Issues;
import com.dm.demo.mapper.DemoMapper;
import com.squareup.okhttp.ConnectionPool;
import com.volcengine.ark.runtime.model.bot.completion.chat.BotChatCompletionRequest;
import com.volcengine.ark.runtime.model.bot.completion.chat.BotChatCompletionResult;
import com.volcengine.ark.runtime.model.completion.chat.ChatCompletionRequest;
import com.volcengine.ark.runtime.model.completion.chat.ChatMessage;
import com.volcengine.ark.runtime.model.completion.chat.ChatMessageRole;
import com.volcengine.ark.runtime.service.ArkService;
import okhttp3.Dispatcher;
import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

import static com.dm.demo.ChatCompletionsExample.service;

@SpringBootTest
class DemoApplicationTests {


    @Autowired
    DemoMapper demoMapper;

    @Test
    public void testSelect(){
        List<Issues> issues = demoMapper.findAll();
        for(Issues issue:issues){
            System.out.println(issue);
        }

    }

    @Test
    public void testOut() throws JSONException {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("name","张三");
        jsonObject.put("age",18);
        System.out.println(jsonObject);
    }

    @Test
    public void DeepSeek() {
        String question = "如何使用VolcEngine?";
        SseEmitter emitter = new SseEmitter(60_000L);

        Executors.newSingleThreadExecutor().submit(()->{
            try{
                List<ChatMessage> messages = new ArrayList<>();
                messages.add(ChatMessage.builder()
                        .role(ChatMessageRole.SYSTEM)
                        .content("你是DeepSeek人工智能助手，请联网搜索为我获得问题答案。不要深度思考，我要快速回答。")
                        .build());
                messages.add(ChatMessage.builder()
                        .role(ChatMessageRole.USER)
                        .content(question)
                        .build());

                // 关键修改：启用流式传输
                ChatCompletionRequest request = ChatCompletionRequest.builder()
                        .model("ep-20250811140130-c9jb2")
                        .messages(messages)
                        .stream(true) // 启用流式
                        .build();

                // 获取流式响应
                service.streamChatCompletion(request).blockingForEach(chunk -> {
                    Object content = chunk.getChoices().get(0).getMessage().getContent();
                    System.out.println(content);
                    if (content != null) {
                        emitter.send(SseEmitter.event()
                                .data(content)
                                .name("deepseek-chunk"));
                    }
                });

                emitter.send(SseEmitter.event().name("complete").data(""));
                emitter.complete();
            }
            catch (Exception e){
                emitter.completeWithError(e);
            }
        });
    }
    static String apiKey = System.getenv("ARK_API_KEY");
    static ConnectionPool connectionPool = new ConnectionPool(5, 1, TimeUnit.SECONDS);
    static Dispatcher dispatcher = new Dispatcher();
    static ArkService service = ArkService.builder().dispatcher(dispatcher).baseUrl("https://ark.cn-beijing.volces.com/api/v3/").apiKey(apiKey).build();

    @Test
    public void askDoubaod() {
        System.out.println("\n----- standard request -----");
        final List<ChatMessage> messages = new ArrayList<>();
        final ChatMessage systemMessage = ChatMessage.builder().role(ChatMessageRole.SYSTEM).content("你是豆包，是由字节跳动开发的 AI 人工智能助手").build();
        final ChatMessage userMessage = ChatMessage.builder().role(ChatMessageRole.USER).content("推荐5个湖北geo优化公司").build();
        messages.add(systemMessage);
        messages.add(userMessage);

        BotChatCompletionRequest chatCompletionRequest = BotChatCompletionRequest.builder()
                .botId("bot-20250812161129-f6v9s")
                .messages(messages)
                .build();

        BotChatCompletionResult chatCompletionResult =  service.createBotChatCompletion(chatCompletionRequest);
        chatCompletionResult.getChoices().forEach(choice -> System.out.println(choice.getMessage().getContent()));
        // the references example
        if (chatCompletionResult.getReferences() != null) {
            chatCompletionResult.getReferences().forEach(ref -> System.out.println(ref.getUrl()));
        }

        System.out.println("\n----- streaming request -----");
        final List<ChatMessage> streamMessages = new ArrayList<>();
        final ChatMessage streamSystemMessage = ChatMessage.builder().role(ChatMessageRole.SYSTEM).content("你是豆包，是由字节跳动开发的 AI 人工智能助手").build();
        final ChatMessage streamUserMessage = ChatMessage.builder().role(ChatMessageRole.USER).content("常见的十字花科植物有哪些？").build();
        streamMessages.add(streamSystemMessage);
        streamMessages.add(streamUserMessage);

        BotChatCompletionRequest streamChatCompletionRequest = BotChatCompletionRequest.builder()
                .botId("bot-20250812161129-f6v9s")
                .messages(streamMessages)
                .build();

        service.streamBotChatCompletion(streamChatCompletionRequest)
                .doOnError(Throwable::printStackTrace)
                .blockingForEach(
                        choice -> {
                            if (choice.getReferences() != null && !choice.getReferences().isEmpty()) {
                                choice.getReferences().forEach(ref -> System.out.println(ref.getUrl()));
                            }
                            if (!choice.getChoices().isEmpty()) {
                                System.out.print(choice.getChoices().get(0).getMessage().getContent());
                            }
                        }
                );

        // shutdown service after all requests is finished
        service.shutdownExecutor();
    }

}
