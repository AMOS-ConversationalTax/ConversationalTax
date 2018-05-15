import { Get, Controller, Post, UseInterceptors, FileInterceptor, UploadedFile } from '@nestjs/common';
import * as fs from 'fs';

@Controller()
export class AppController {
  @Get()
  root(): string {
    return 'Hello World!';
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    // console.log(file);
    fs.writeFile(file.originalname, file.buffer, 'binary', (err) => {
      if (err) {
        // console.log(err);
      } else {
        // console.log("The file was saved!");
      }
    });
  }
}
