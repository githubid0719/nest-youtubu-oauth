import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class YoutubeStrategy extends PassportStrategy(Strategy, 'youtube') {
  constructor(
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.get<string>('YOUTUBE_CLIENT_ID') as string,
      clientSecret: configService.get<string>('YOUTUBE_CLIENT_SECRET') as string,
      callbackURL: configService.get<string>('YOUTUBE_CALLBACK_URL') as string,
      scope: [
        'profile',
        'email',
        'https://www.googleapis.com/auth/adwords',
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/youtube.readonly',
        'https://www.googleapis.com/auth/youtube.upload',
      ],
      passReqToCallback: true,
    });
  }

  authenticate(req: Request, options?: any): void {
    options = options || {};
    options.client_id = this.configService.get<string>('YOUTUBE_CLIENT_ID') as string;
    options.accessType = 'offline';
    options.prompt = 'consent';
    // 利用state透传game信息
    // TODO 如果这里以后有多个参数需要透传，则需要利用JSON来传递字符串
    options.state = JSON.stringify({
      game: req.query.game,
      scope: req.query.scope,
      studioId: req.query.studio_id,
      gameList: req.query.game_list,
    });
    super.authenticate(req, options);
  }

  validate(
    req: Request,
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): void {
    try {
      const stateInfo = JSON.parse(req.query.state as string);
      // TODO 整理结构
      // TODO 获取授权人的账号信息
      const authInfo = {
        profile,
        accessToken: _accessToken,
        refreshToken: _refreshToken,
        game: stateInfo.game,
        scope: stateInfo.scope,
        studioId: stateInfo.studioId,
        gameList: stateInfo.gameList,
      };
      done(null, authInfo);
    } catch (e) {
      console.error('validate state info error', (e as Error).message);
      return done(e as Error, false);
    }
  }
}
