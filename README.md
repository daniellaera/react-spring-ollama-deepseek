# Chat AI with DeepSeek, SpringBoot, React, Chakra UI & Vite

<div align="center">

<img src="/logos/Spring_Boot.png" alt="Spring Boot" width="100"/>
<img src="/logos/deepseek-logo.png" alt="Spring Boot" width="100"/>
<img src="/logos/react-logo.svg" alt="Spring Boot" width="100"/>
<img src="/logos/chakra-logo.svg" alt="Spring Boot" width="100"/>
<img src="/logos/logo-with-shadow.png" alt="Spring Boot" width="100"/>

</div>

---

A web application built with **React**, **Spring Boot**, **Vite**, **Chakra UI**, **Ollama**, and **DeepSeek LLM model**.

## 🔧 Technologies Used

- **React** - Frontend framework for building user interfaces.
- **Spring Boot** - Backend framework for creating stand-alone, production-grade Spring-based applications.
- **Vite** - Next-generation frontend tooling for fast development.
- **Chakra UI** - Modern and accessible React component library for building user interfaces.
- **Ollama** - Platform for running large language models locally.
- **DeepSeek LLM** - Advanced language model for intelligent responses.

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