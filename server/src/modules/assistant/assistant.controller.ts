import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { AssistantService } from "./assistant.service";
import { AssistantChatRequestDto } from "./dto/assistant-chat-request.dto";
import { AssistantChatResponseDto } from "./dto/assistant-chat-response.dto";
import { AssistantDataResponseDto } from "./dto/assistant-data-response.dto";
import { GetAssistantDataQueryDto } from "./dto/get-assistant-data.query.dto";

@Controller("assistant")
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Get()
  getAssistantData(@Query() { subjectId, gradeId, lessonId }: GetAssistantDataQueryDto): Promise<AssistantDataResponseDto> {
    return this.assistantService.getAssistantData(subjectId, gradeId, lessonId);
  }

  @Post("chat")
  chat(@Body() request: AssistantChatRequestDto): Promise<AssistantChatResponseDto> {
    return this.assistantService.chat(request);
  }
}
