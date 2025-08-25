export interface YoutubeUser {
  profile: {
    id: string;
    displayName: string;
    emails?: Array<{
      value: string;
      verified: boolean;
    }>;
    photos?: Array<{
      value: string;
    }>;
    provider: string;
    _raw: string;
    _json: any;
  };
  accessToken: string;
  refreshToken: string;
  game?: string;
  scope?: string;
  studioId?: string;
  gameList?: string;
}

export interface AuthenticatedRequest extends Request {
  user: YoutubeUser;
}