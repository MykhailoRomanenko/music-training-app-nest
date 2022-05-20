import EntityAlreadyExistsError from '../errors/entity-already-exists.error';
import {
  CallHandler,
  ConflictException,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class EntityAlreadyExistsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof EntityAlreadyExistsError) {
          throw new ConflictException(error.message);
        }
        throw error;
      }),
    );
  }
}
