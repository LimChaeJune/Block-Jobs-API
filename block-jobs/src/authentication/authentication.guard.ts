import { Request } from 'express';
import { Observable } from 'rxjs';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthenticationService } from './services/authentication/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthenticationService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private validateRequest(request: Request) {
    if (!request.headers.authorization.includes('Baarer')) {
      return false;
    }

    const jwtString = request.headers.authorization.split('Bearer ')[1];

    this.authService.TokenVerify(jwtString);

    return true;
  }
}
