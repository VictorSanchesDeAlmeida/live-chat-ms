# Live Chat Microservice

Este projeto é um microserviço de chat ao vivo desenvolvido com **Spring Boot** e **WebSockets**. Ele permite que usuários enviem mensagens em tempo real utilizando **STOMP** sobre WebSockets.

## Tecnologias Utilizadas
- Java 21+
- Spring Boot
- Spring WebSocket
- STOMP
- HTML (para escape de mensagens)

## Como Funciona
O projeto utiliza **WebSockets** para comunicação em tempo real:
1. **Os clientes enviam mensagens** para o endpoint `/app/new-message`.
2. **O servidor recebe e processa** a mensagem, escapando o conteúdo HTML.
3. **As mensagens são enviadas** para todos os clientes conectados através do tópico `/topics/livechat`.

## Estrutura do Código

### `LivechatmsApplication`
Classe principal do projeto, responsável por iniciar a aplicação Spring Boot.

```java
@SpringBootApplication
public class LivechatmsApplication {
    public static void main(String[] args) {
        SpringApplication.run(LivechatmsApplication.class, args);
    }
}
```

### `LiveChatController`
Controlador que gerencia as mensagens enviadas pelos usuários.

```java
@Controller
public class LiveChatController {
    
    @MessageMapping("/new-message")
    @SendTo("/topics/livechat")
    public ChatOutput newMessage(ChatInput input){
        return new ChatOutput(HtmlUtils.htmlEscape(input.user() + ": " + input.message()));
    }
}
```

### `WebSocketConfig`
Configuração do WebSocket para habilitar STOMP e definir os endpoints.

```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topics");
        registry.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/buildrun-livechat-websocket");
    }
}
```

## Como Rodar o Projeto
1. Clone o repositório:
   ```sh
   git clone https://github.com/seu-usuario/livechatms.git
   cd livechatms
   ```
2. Execute a aplicação Spring Boot:
   ```sh
   mvn spring-boot:run
   ```
3. Conecte um cliente WebSocket ao endpoint `/buildrun-livechat-websocket` para enviar e receber mensagens.

## Próximos Passos
- Criar uma interface web para interagir com o chat.
- Armazenamento de mensagens em banco de dados.
- Autenticação de usuários.

## Contribuição
Pull requests são bem-vindos! Para mudanças maiores, abra uma issue primeiro para discutir o que deseja modificar.

## Licença
Este projeto está sob a licença MIT.

