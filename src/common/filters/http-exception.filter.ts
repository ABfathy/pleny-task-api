import { Catch, ConflictException, ExceptionFilter } from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any) {
    if (exception.code === 11000) {
      throw new ConflictException('A restaurant exits with this slug');
    }
  }
}
