package com.dm.demo.util;

import com.volcengine.ark.runtime.exception.ArkException;
import com.volcengine.ark.runtime.model.bot.completion.chat.BotChatCompletionRequest;
import com.volcengine.ark.runtime.model.bot.completion.chat.BotChatCompletionResult;
import com.volcengine.ark.runtime.model.completion.chat.ChatCompletionRequest;
import com.volcengine.ark.runtime.model.completion.chat.ChatMessage;
import com.volcengine.ark.runtime.model.completion.chat.ChatMessageRole;
import com.volcengine.ark.runtime.service.ArkService;
//import com.volcengine.ark.runtime.service.exception.ArkException;
import okhttp3.ConnectionPool;
import okhttp3.Dispatcher;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicReference;


public class ChatCompletionsExample {
    // 1. 初始化AI服务（确保API Key和地址正确）
    private static final String apiKey = System.getenv("ARK_API_KEY"); // 从环境变量获取API Key
    private static final String baseUrl = "https://ark.cn-beijing.volces.com/api/v3"; // 火山引擎API地址
    private static final ArkService service;

    // 静态代码块：初始化AI服务（只执行一次）
    static {
        if (apiKey == null || apiKey.isEmpty()) {
            throw new RuntimeException("请配置环境变量 ARK_API_KEY（火山引擎API Key）");
        }
        // 配置连接池和调度器
        ConnectionPool connectionPool = new ConnectionPool(5, 1, TimeUnit.SECONDS);
        Dispatcher dispatcher = new Dispatcher();
        // 初始化服务
        service = ArkService.builder()
                .dispatcher(dispatcher)
                .connectionPool(connectionPool)
                .baseUrl(baseUrl)
                .apiKey(apiKey)
                .build();
    }

    /**
     * 调用AI模型获取回答（供控制器调用）
     */
    public static String getStandardChatResponse(String userQuestion) throws ArkException {
        // 构建对话消息
        List<ChatMessage> messages = new ArrayList<>();
        // 系统提示：定义AI角色
        messages.add(ChatMessage.builder()
                .role(ChatMessageRole.SYSTEM)
                .content("你是当夏科技在当夏GEO生成式引擎优化服务数据监测平台的人工智能助手。不要深度思考，我要快速回答。")
                .build());
        // 用户问题
        messages.add(ChatMessage.builder()
                .role(ChatMessageRole.USER)
                .content(userQuestion)
                .build());

        // 构建请求

        ChatCompletionRequest request = ChatCompletionRequest.builder()
                .model("ep-20250811140130-c9jb2") // 确保模型ID正确
                .messages(messages)
                .thinking(new ChatCompletionRequest.ChatCompletionRequestThinking("disabled"))
                .temperature(0.7d)
                .build();

//        System.out.println("当前思考模式: " + request.getThinking().getType());
        // 调用AI接口并返回结果（直接返回第一个回答）
        String content1 = (String) service.createChatCompletion(request)
                .getChoices()
                .get(0) // 取第一个回答
                .getMessage()
                .getContent();
        String content2 = (String) service.createChatCompletion(request)
                .getChoices()
                .get(0)
                .getMessage()
                .getReasoningContent();
        return content2+content1;
    }

//    public static String raiseTheQuestion(String userQuestion) throws ArkException {
//        // 构建对话消息
//        List<ChatMessage> messages = new ArrayList<>();
//        // 系统提示：定义AI角色
//        messages.add(ChatMessage.builder()
//                .role(ChatMessageRole.SYSTEM)
//                .content("你是当夏科技的GEO（Generate Engine Optimization）生成式引擎优化服务的监测平台的人工智能问题机。你的任务是对于客户提出的关键字或关键句通过联网搜索分析并提出有关这个关键字或者关键句的问题，便于后续再对于这个问题展开AI分析，不要深度思考，我要快速回答。")
//                .build());
//        // 用户问题
//        messages.add(ChatMessage.builder()
//                .role(ChatMessageRole.USER)
//                .content(userQuestion)
//                .build());
//
//        // 构建请求
//        ChatCompletionRequest request = ChatCompletionRequest.builder()
//                .model("doubao-1-5-pro-32k-250115") // 确保模型ID正确
//                .messages(messages)
//                .build();
//
//        // 调用AI接口并返回结果（直接返回第一个回答）
//        return (String) service.createChatCompletion(request)
//                .getChoices()
//                .get(0) // 取第一个回答
//                .getMessage()
//                .getContent();
//    }
//
//    public static String analyseTheQuestion(String userQuestion) throws ArkException {
//        // 构建对话消息
//        List<ChatMessage> messages = new ArrayList<>();
//        // 系统提示：定义AI角色
//        messages.add(ChatMessage.builder()
//                .role(ChatMessageRole.SYSTEM)
//                .content("你是当夏科技的GEO（Generate Engine Optimization）生成式引擎优化服务的监测平台的人工智能问题机。你的任务是对于客户提出的问题给出相关的回答，不要深度思考，我要快速回答。。")
//                .build());
//        // 用户问题
//        messages.add(ChatMessage.builder()
//                .role(ChatMessageRole.USER)
//                .content(userQuestion)
//                .build());
//
//        // 构建请求
//        ChatCompletionRequest request = ChatCompletionRequest.builder()
//                .model("ep-20250811140130-c9jb2") // 确保模型ID正确
//                .messages(messages)
//                .build();
//
//        // 调用AI接口并返回结果（直接返回第一个回答）
//        return (String) service.createChatCompletion(request)
//                .getChoices()
//                .get(0) // 取第一个回答
//                .getMessage()
//                .getContent();
//    }
    public static String returnJson(String userQuestion) throws ArkException {
        // 构建对话消息
        List<ChatMessage> messages = new ArrayList<>();
        // 系统提示：定义AI角色
        messages.add(ChatMessage.builder()
                .role(ChatMessageRole.SYSTEM)
                .content("根据提出的关键词或关键句，返回多条相关问题，不要深度思考，我要快速回答。，返回格式为字符串数组格式为 {'data':['String1','String2','String3'],'success':200}")
                .build());
        // 用户问题
        messages.add(ChatMessage.builder()
                .role(ChatMessageRole.USER)
                .content(userQuestion)
                .build());

        // 构建请求
        ChatCompletionRequest request = ChatCompletionRequest.builder()
                .model("doubao-1-5-pro-32k-250115") // 确保模型ID正确
                .messages(messages)
                .thinking(new ChatCompletionRequest.ChatCompletionRequestThinking("disabled"))
                .build();

        // 调用AI接口并返回结果（直接返回第一个回答）
        return (String) service.createChatCompletion(request)
                .getChoices()
                .get(0) // 取第一个回答
                .getMessage()
                .getContent();
    }
    // 可选：关闭服务（一般在应用退出时调用）

    //使用不同平台的模型
    public static String DeepSeek(String userQuestion) {
        // 构建对话消息
        List<ChatMessage> messages = new ArrayList<>();
        // 系统提示：定义AI角色
        messages.add(ChatMessage.builder()
                .role(ChatMessageRole.SYSTEM)
                .content("你是deepseek人工智能助手，请联网搜索为我获得问题答案。请直接提供答案，无需解释思考过程。\"")
                .build());
        // 用户问题
        messages.add(ChatMessage.builder()
                .role(ChatMessageRole.USER)
                .content(userQuestion)
                .build());

        // 构建请求
        ChatCompletionRequest request = ChatCompletionRequest.builder()
                .model("ep-20250811140130-c9jb2") // 确保模型ID正确
                .messages(messages)
                .stream(true)
//                .thinking(new ChatCompletionRequest.ChatCompletionRequestThinking("disabled"))
                .build();


        // 调用AI接口并返回结果（直接返回第一个回答）
        return (String) service.createChatCompletion(request)
                .getChoices()
                .get(0) // 取第一个回答
                .getMessage()
                .getContent();
    }

    public static SseEmitter Ask(String message) {
        ArkService arkService;
        String apiKey = System.getenv(("ARK_API_KEY"));
        arkService = ArkService.builder()
                .apiKey(apiKey)
                .build();
        SseEmitter emitter = new SseEmitter(60_000L); // 60秒超时

        // 使用线程池执行异步任务
        Executors.newSingleThreadExecutor().submit(() -> {
            try {
                List<ChatMessage> messages = new ArrayList<>();
                messages.add(ChatMessage.builder()
                        .role(ChatMessageRole.SYSTEM)
                        .content("你是豆包，是由字节跳动开发的 AI 人工智能助手")
                        .build());
                messages.add(ChatMessage.builder()
                        .role(ChatMessageRole.USER)
                        .content(message)
                        .build());

                ChatCompletionRequest request = ChatCompletionRequest.builder()
                        .model("ep-20250811140130-c9jb2")
                        .messages(messages)
                        .stream(true)
                        .thinking(new ChatCompletionRequest.ChatCompletionRequestThinking("disabled"))
                        .build();

                // 流式处理响应
                arkService.streamChatCompletion(request)
                        .doOnError(Throwable::printStackTrace)
                        .blockingForEach(chunk -> {
                            if (chunk.getChoices() != null && !chunk.getChoices().isEmpty()) {
                                String content = String.valueOf(chunk.getChoices().get(0).getMessage().getContent());
                                if (content != null && !"null".equals(content)) {
                                    emitter.send(SseEmitter.event()
                                            .data(content)
                                            .name("chat-chunk"));
                                }
                            }
                        });

                emitter.send(SseEmitter.event().name("complete").data(""));
                emitter.complete();
            } catch (Exception e) {
                emitter.completeWithError(e);
            } finally {
                arkService.shutdownExecutor();
            }

        });

        return emitter;
    }

//    public static Object Test(String question) {
//        AtomicReference<Object> content = new AtomicReference<>(new Object());
//        System.out.println("\n----- standard request -----");
//        final List<ChatMessage> messages = new ArrayList<>();
//        final ChatMessage systemMessage = ChatMessage.builder().role(ChatMessageRole.SYSTEM).content("你是DeepSeek，是一个 AI 人工智能助手").build();
//        final ChatMessage userMessage = ChatMessage.builder().role(ChatMessageRole.USER).content(question).build();
//        messages.add(systemMessage);
//        messages.add(userMessage);
//
//        BotChatCompletionRequest chatCompletionRequest = BotChatCompletionRequest.builder()
//                .botId("bot-20250811140007-xb5p9")
//                .messages(messages)
//                .build();
//
//        BotChatCompletionResult chatCompletionResult =  service.createBotChatCompletion(chatCompletionRequest);
//        chatCompletionResult.getChoices().forEach(choice -> System.out.println(choice.getMessage().getContent()));
//        // the references example
//        if (chatCompletionResult.getReferences() != null) {
//            chatCompletionResult.getReferences().forEach(ref -> System.out.println(ref.getUrl()));
//        }
//
//        // 对于R1模型，输出reasoning content
//        chatCompletionResult.getChoices().forEach(choice -> System.out.println(choice.getMessage().getReasoningContent()));
//
//        System.out.println("\n----- streaming request -----");
//        final List<ChatMessage> streamMessages = new ArrayList<>();
//        final ChatMessage streamSystemMessage = ChatMessage.builder().role(ChatMessageRole.SYSTEM).content("你是DeepSeek，是一个 AI 人工智能助手").build();
//        final ChatMessage streamUserMessage = ChatMessage.builder().role(ChatMessageRole.USER).content("常见的十字花科植物有哪些？").build();
//        streamMessages.add(streamSystemMessage);
//        streamMessages.add(streamUserMessage);
//
//        BotChatCompletionRequest streamChatCompletionRequest = BotChatCompletionRequest.builder()
//                .botId("bot-20250811140007-xb5p9")
//                .messages(streamMessages)
//                .build();
//
//        service.streamBotChatCompletion(streamChatCompletionRequest)
//                .doOnError(Throwable::printStackTrace)
//                .blockingForEach(
//                        choice -> {
//                            if (choice.getReferences() != null && !choice.getReferences().isEmpty()) {
//                                choice.getReferences().forEach(ref -> System.out.println(ref.getUrl()));
//                            }
//                            if (!choice.getChoices().isEmpty()) {
//                                if (choice.getChoices().get(0).getMessage().getReasoningContent() != null) {
////                                    System.out.print(choice.getChoices().get(0).getMessage().getReasoningContent()); // 对于R1模型，输出reasoning content
//                                }
////                                System.out.print(choice.getChoices().get(0).getMessage().getContent());
//                                content.set(choice.getChoices().get(0).getMessage().getContent());
//                            }
//                        }
//                );
//
//        // shutdown service after all requests is finished
//        service.shutdownExecutor();
//        return content;
//    }
    public static void shutdown() {
        service.shutdownExecutor();
    }
}