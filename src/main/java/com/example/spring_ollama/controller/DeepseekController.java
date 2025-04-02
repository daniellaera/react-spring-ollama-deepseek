package com.example.spring_ollama.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api/v1/llm/")
@CrossOrigin(origins = "*")
@Tag(name = "Deepseek API", description = "Handles AI model requests")
public class DeepseekController {

    private final ChatClient chatClient;

    public DeepseekController(ChatClient.Builder chatClient) {
        this.chatClient = chatClient.build();
    }
    
    @Operation(summary = "Get response from LLM", description = "Provide a chat prompt and receive a response")
    @GetMapping("/{chat}")
    public ResponseEntity<String> promptWithPathVariable(@PathVariable String chat) {
        try {
            String response = chatClient
                    .prompt(chat)
                    .call()
                    .content();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }

    @Operation(summary = "Stream chat response", description = "Streams responses from the AI model")
    @GetMapping("/stream/{chat}")
    public Flux<String> streamChat(@PathVariable String chat) {
        return chatClient
                .prompt()
                .user(chat)
                .stream()
                .content();
    }
}
