import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { YoutubeStrategy } from './strategies/youtube.stratrgies';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,             // 全局可用，无需每个模块导入
      envFilePath: '.env',        // 默认为 .env，可设置数组或其它路径
      ignoreEnvFile: false,
      cache: true,                // 缓存结果
      expandVariables: true,      // 可选：支持 ${VAR} 变量展开
    }),
  ],
  controllers: [AppController],
  providers: [AppService, YoutubeStrategy],
})
export class AppModule {}
