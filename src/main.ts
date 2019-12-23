import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService} from './config/config.service';
import * as helmet from 'helmet';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('/api');
  app.use(helmet());
  // app.use(csurf());
  // app.use(loggerGlobal);
  // app.useGlobalGuards();
  // app.useGlobalInterceptors(new LoggingInterceptor());
  const config = app.get('ConfigService');
  const port = config.get('APP_PORT'); // loading port using config service
  await app.listen(port);
  console.log(`Listening on http://localhost:${port}`);
}
bootstrap().then(() => { console.log('Bootstrap loaded'); });
