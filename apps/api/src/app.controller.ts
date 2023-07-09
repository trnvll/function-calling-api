import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AppService } from '@app/app.service'
import { AuthGuard } from '@nestjs/passport'
import { OpenAIDto } from '@app/dto/openai.dto'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  getHello(): string {
    return this.appService.getHello()
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  openai(@Body() openAIDto: OpenAIDto) {
    return this.appService.openai(openAIDto.query)
  }
}
