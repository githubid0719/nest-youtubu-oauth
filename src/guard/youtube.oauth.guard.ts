import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class YoutubeOauthGuard extends AuthGuard('youtube') {
  constructor() {
    super({
      accessType: 'offline',
      prompt: 'consent', // 每次都提示
    });
  }
}
