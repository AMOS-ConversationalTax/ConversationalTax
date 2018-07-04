import { Get, Controller } from '@nestjs/common';

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
}
