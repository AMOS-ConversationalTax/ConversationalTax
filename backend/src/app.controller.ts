import { Get, Post, Put, Delete, Controller } from '@nestjs/common';

/**
 * Main controller of the backend -
 * can be used for testing whether the backend is online or not
 */
@Controller()
export class AppController {

  /**
   * Method to test a simple Get on the backend
   * @returns {string} Returns a simple 'Hello World!'
   */
  @Get()
  root(): string {
    return 'Hello World!';
  }

  /**
   * Method to test a simple Post on the backend
   * @returns {string} Returns a simple 'Post arrived!'
   */
  @Post()
  create(): string {
    return 'Post arrived!';
  }

  /**
   * Method to test a simple Put on the backend
   * @returns {string} Returns a simple 'Put arrived!'
   */
  @Put()
  update(): string {
    return 'Put arrived!';
  }

  /**
   * Method to test a simple Delete on the backend
   * @returns {string} Returns a simple 'Delete arrived!'
   */
  @Delete()
  delete(): string {
    return 'Delete arrived!';
  }
}
