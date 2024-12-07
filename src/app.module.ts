import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from './knex/knex.module';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true, envFilePath: '.env'}), KnexModule.register({
    debug: true,
    client: 'pg',
    connection: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
    }
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
