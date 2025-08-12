package com.dm.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // 允许所有接口
//                .allowedOrigins("http://localhost:3001")  // 允许前端来源
                .allowedOrigins("http://0.0.0.0:*","http://localhost:3000","http://127.0.0.1:5500","http://192.168.0.74:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // 允许的请求方法
                .allowedHeaders("*")  // 允许所有请求头
                .allowCredentials(true)  // 允许携带Cookie
                .maxAge(3600);  // 预检请求的有效期（秒）
    }
}
