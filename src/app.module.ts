import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {MongooseModule} from '@nestjs/mongoose'
import { ConfigModule,ConfigService } from '@nestjs/config';
//MongooseModule.forRoot()
@Module({
  imports: [AuthModule, UserModule,ConfigModule.forRoot({isGlobal:true})
  ,MongooseModule.forRootAsync({
    imports:[ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      uri: configService.get<string>('MONGODB_URL'),
    }),
    inject: [ConfigService],

  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
