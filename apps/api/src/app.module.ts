import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsModule } from './news/news.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
@Module({
  imports: [MongooseModule.forRootAsync({
    imports: [ ConfigModule ],
    useFactory: async( configService: ConfigService)=> ({
      uri: configService.get('MONGO_URI'),
    }),
    inject: [ ConfigService ]
  }), NewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
