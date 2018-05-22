import { Get, Post, Put, Delete, Controller } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root(): string {
    return 'Hello World!';
  }

  @Post()
  create(): string {
    return 'Post arrived!';
  }

  @Put()
  update(): string {
    return 'Put arrived!';
  }

  @Delete()
  delete() : string {
    return 'Delete arrived!';
  }
}
