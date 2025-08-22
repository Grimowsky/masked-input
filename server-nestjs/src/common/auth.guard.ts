import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

function validateRequest() {
  //this should handle validation logic
  //and return true while access granted
  //return false while not granted
  return true;
}

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    console.log('@@@, auth guard request @@@', request);
    return validateRequest();
  }
}
