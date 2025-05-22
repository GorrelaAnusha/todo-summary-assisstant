package com.example.todoapp.controller;

import com.example.todoapp.model.Todo;
import com.example.todoapp.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@RestController
@RequestMapping("/todos")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @Value("${openai.api.key}")
    private String openaiApiKey;

    @Value("${slack.webhook.url}")
    private String slackWebhookUrl;

    @GetMapping
    public List<Todo> getTodos() {
        return todoRepository.findAll();
    }

    @PostMapping
    public Todo addTodo(@RequestBody Todo todo) {
        return todoRepository.save(todo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable Long id) {
        return todoRepository.findById(id)
                .map(todo -> {
                    todoRepository.delete(todo);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
    @PutMapping("/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable Long id, @RequestBody Todo updatedTodo) {
        return todoRepository.findById(id)
            .map(todo -> {
                todo.setText(updatedTodo.getText());
                todo.setCompleted(updatedTodo.isCompleted());
                return ResponseEntity.ok(todoRepository.save(todo));
            })
            .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping("/summarize")
    public ResponseEntity<String> summarizeTodos() {
        List<Todo> todos = todoRepository.findAll();
        if (todos.isEmpty()) {
            return ResponseEntity.ok("No todos to summarize.");
        }

        // Convert todos to text prompt
        StringBuilder promptBuilder = new StringBuilder("Summarize the following todo list:\n");
        for (int i = 0; i < todos.size(); i++) {
            promptBuilder.append(i + 1).append(". ").append(todos.get(i).getText()).append("\n");
        }
        String prompt = promptBuilder.toString();

        // OpenAI API payload
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-3.5-turbo");
        requestBody.put("messages", List.of(
            Map.of("role", "system", "content", "You are a helpful assistant."),
            Map.of("role", "user", "content", prompt)
        ));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openaiApiKey);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
        RestTemplate restTemplate = new RestTemplate();

        try {
            // Call OpenAI chat completion API
            ResponseEntity<Map> response = restTemplate.postForEntity(
                "https://api.openai.com/v1/chat/completions",
                requestEntity,
                Map.class
            );

            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
            Map<String, Object> messageMap = (Map<String, Object>) choices.get(0).get("message");
            String summary = (String) messageMap.get("content");

            // Prepare Slack payload and headers
            Map<String, String> slackPayload = Map.of("text", summary);
            HttpHeaders slackHeaders = new HttpHeaders();
            slackHeaders.setContentType(MediaType.APPLICATION_JSON);

            HttpEntity<Map<String, String>> slackEntity = new HttpEntity<>(slackPayload, slackHeaders);

            // Send summary to Slack webhook
            restTemplate.postForObject(slackWebhookUrl.trim(), slackEntity, String.class);

            return ResponseEntity.ok("Summary sent to Slack!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error summarizing todos or sending to Slack.");
        }
    }

    }

