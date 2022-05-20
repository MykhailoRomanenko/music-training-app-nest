import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChordModule } from './modules/chord/chord.module';
import { TypegooseModule } from 'nestjs-typegoose';
import { ConfigModule } from '@nestjs/config';
import { GuitarChordModule } from './modules/guitar-chord/guitar-chord.module';
import { ScaleModule } from './modules/scale/scale.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { EntityAlreadyExistsInterceptor } from './common/interceptors/entity-already-exists-interceptor';
import { NotFoundInterceptor } from './common/interceptors/not-found.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypegooseModule.forRoot(process.env.MONGODB_URI),
    ChordModule,
    GuitarChordModule,
    ScaleModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: EntityAlreadyExistsInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: NotFoundInterceptor,
    },
  ],
})
export class AppModule {}
