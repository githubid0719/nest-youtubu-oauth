import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { YoutubeOauthGuard } from './guard/youtube.oauth.guard';
import type { AuthenticatedRequest, YoutubeUser } from './interfaces/user.interface';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @UseGuards(YoutubeOauthGuard)
  @Get('api_v2/oauth/youtube/callback')
  youtubeCallback(@Req() req: AuthenticatedRequest): YoutubeUser {
    const userInfo: YoutubeUser = req.user;
    return userInfo;
  }

  @UseGuards(YoutubeOauthGuard)
  @Get('api_v2/oauth/youtube')
  youtube() {}


}
