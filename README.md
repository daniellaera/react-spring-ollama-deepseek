# Chat AI with DeepSeek, SpringBoot, React & Vite

First of all, make sure to install Ollama.
I did for MacOS for example, and once installed normally you are to suppoosed to have the following command available to execute: 

``ollama run deepseek-r1:1.5b``.

So this create a Ollama server running on port `11434`; that's exactly what we're setting in backend resource properties:
```yml
spring:
  application:
    name: spring-ollama
  ai:
    ollama:
      base-url: http://localhost:11434
      chat:
        options:
          model: deepseek-r1:1.5b
```

Run backend:

```sh 

mvn spring-boot:run

```
 Run frontend located in `/client`
```sh 

npm run dev

```

Home Chat prompt at http://localhost:5173/

OpenAPI is available at: http://localhost:8080/swagger-ui/index.html.

A couple of endpoints:
- ### /api/v1/llm/stream/{chat}
- ### /api/v1/llm/{chat}