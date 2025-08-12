//import com.openai.client.OpenAIClient;
//import com.openai.client.okhttp.OpenAIOkHttpClient;
//import com.openai.models.ChatCompletion;
//import com.openai.models.ChatCompletionCreateParams;
//
//import java.util.List;
//
//// OpenAI Java SDK 目前为 beta 阶段，此代码实例所使用的SDK版本号为0.32.0
//public class  {
//    public static void main(String[] args) {
//        // 创建 OpenAI 客户端，连接 DashScope 的兼容接口
//        OpenAIClient client = OpenAIOkHttpClient.builder()
//                .apiKey(System.getenv("DASHSCOPE_API_KEY"))  // 或替换为 .apiKey("sk-xxx")
//                .baseUrl("https://dashscope.aliyuncs.com/compatible-mode/v1")
//                .build();
//
//        // 创建 ChatCompletion 参数
//        ChatCompletionCreateParams params = ChatCompletionCreateParams.builder()
//                .model("qwen-plus")  // 指定模型
//                .addSystemMessage("You are a helpful assistant.")
//                .addUserMessage("你是谁？")
//                .build();
//
//        // 发送请求并获取响应
//        ChatCompletion chatCompletion = client.chat().completions().create(params);
//
//
//        // 提取并打印 content 字段内容
//        List<ChatCompletion.Choice> choices = chatCompletion.choices();
//        if (!choices.isEmpty()) {
//            String content = choices.get(0).message().content().orElse("无响应内容");
//            System.out.println(content);
//        }
//    }
//}