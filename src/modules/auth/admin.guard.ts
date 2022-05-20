import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '../user/types';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    return user.role === Role.ADMIN;
  }
}
