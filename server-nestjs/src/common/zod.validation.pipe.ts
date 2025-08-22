import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: any, metadata: ArgumentMetadata): any {
    try {
      console.log('i wass here validation');
      return this.schema.parse(value);
    } catch (e) {
      console.log('i was here - catch');
      throw new BadRequestException('Request validation failed');
    }
  }
}
