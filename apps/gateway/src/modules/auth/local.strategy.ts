import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import express from 'express';
import { IVerifyOptions, Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(
      {
        usernameField: 'account',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (
        req: express.Request,
        account: string,
        password: string,
        done: (error: any, user?: any, options?: IVerifyOptions) => void,
      ) => {
        // console.log({ req: req.body, account, password });
        try {
          const user = await this.authService.validateUser(account, password);
          if (!user) {
            return done(null, false, {
              message: new UnauthorizedException().message,
            });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    );
  }
  // async validate(username: string, password: string): Promise<any> {
  //   console.log({ username, password });
  //   const user = await this.authService.validateUser(username, password);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }
}
