package tech.buildvs.livechatms.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;
import tech.buildvs.livechatms.domain.ChatInput;
import tech.buildvs.livechatms.domain.ChatOutput;

@Controller
public class LiveChatController {

    @MessageMapping("/new-message")
    @SendTo("/topics/livechat")
    public ChatOutput newMessage(ChatInput input){
        String message = input.user() + ": " + input.message();
        System.out.println(message);
        return new ChatOutput(HtmlUtils.htmlEscape(message));
    }

}