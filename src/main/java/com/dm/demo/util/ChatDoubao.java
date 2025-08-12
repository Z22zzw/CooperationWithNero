package com.dm.demo.util;

import com.volcengine.ark.runtime.model.bot.completion.chat.BotChatCompletionRequest;
import com.volcengine.ark.runtime.model.completion.chat.ChatMessage;
import com.volcengine.ark.runtime.model.completion.chat.ChatMessageRole;
import com.volcengine.ark.runtime.service.ArkService;
import okhttp3.ConnectionPool;
import okhttp3.Dispatcher;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;

public class ChatDoubao {
    private static final String API_KEY = System.getenv("ARK_API_KEY");
    private static final String BOT_ID = "bot-20250812161129-f6v9s";
    private static final long SSE_TIMEOUT = 60 * 60 * 1000L; // 60分钟超时
    private static final ConnectionPool connectionPool = new ConnectionPool(5, 2, TimeUnit.MINUTES);
    private static final Dispatcher dispatcher = new Dispatcher(Executors.newFixedThreadPool(5));

    private static final ArkService service = ArkService.builder()
            .dispatcher(dispatcher)
            .connectionPool(connectionPool)
            .baseUrl("https://ark.cn-beijing.volces.com/api/v3/")
            .apiKey(API_KEY)
            .build();

    public static SseEmitter askDoubao(String question) {
        SseEmitter emitter = new SseEmitter(SSE_TIMEOUT);

        // 设置SSE事件处理
        emitter.onCompletion(() -> cleanUp());
        emitter.onTimeout(() -> cleanUp());
        emitter.onError((ex) -> cleanUp());

        // 使用线程池处理流式请求
        Executors.newSingleThreadExecutor().submit(() -> {
            try {
                List<ChatMessage> messages = buildMessages(question);
                BotChatCompletionRequest request = buildRequest(messages);

                // 流式响应处理
                service.streamBotChatCompletion(request)
                        .doOnError(error -> {
                            emitter.completeWithError(error);
                            cleanUp();
                        })
                        .blockingForEach(choice -> {
                            if (!choice.getChoices().isEmpty()) {
                                String content = (String) choice.getChoices().get(0).getMessage().getContent();
                                emitter.send(SseEmitter.event()
                                        .data(content)
                                        .id(String.valueOf(System.currentTimeMillis())));
                            }
                        });

                // 发送完成事件
                emitter.send(SseEmitter.event()
                        .name("complete")
                        .data("")
                        .id("end"));
                emitter.complete();

            } catch (Exception e) {
                emitter.completeWithError(e);
                cleanUp();
            }
        });

        return emitter;
    }

    private static List<ChatMessage> buildMessages(String question) {
        List<ChatMessage> messages = new ArrayList<>();
        messages.add(ChatMessage.builder()
                .role(ChatMessageRole.SYSTEM)
                .content("你是豆包，是由字节跳动开发的AI助手，回答要专业且简洁")
                .build());
        messages.add(ChatMessage.builder()
                .role(ChatMessageRole.USER)
                .content(question)
                .build());
        return messages;
    }

    private static BotChatCompletionRequest buildRequest(List<ChatMessage> messages) {
        return BotChatCompletionRequest.builder()
                .botId(BOT_ID)
                .messages(messages)
                .stream(true)
                .build();
    }

    private static void cleanUp() {
        try {
            service.shutdownExecutor();
            dispatcher.executorService().shutdown();
        } catch (Exception e) {
            // 静默处理关闭异常
        }
    }
}