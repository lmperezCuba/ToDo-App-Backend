import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './auth/logger/logger.module';
import { LoggerMiddleware } from './auth/logger/logger.middleware';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './auth/users/users.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
     // typeDefs:
      installSubscriptionHandlers: true,
      debug: process.env.NODE_ENV === 'dev',
      playground: process.env.NODE_ENV === 'dev',
    }),
    AuthModule,
    LoggerModule,
    UsersModule,
    CommonModule,
    ConfigModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
   /*  ...httpInterceptorProviders,
    {
    provide: APP_GUARD,
    useClass: RolesGuard,
  },*/
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('');
  }
}
