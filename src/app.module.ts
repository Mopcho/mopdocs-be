import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from './knex/knex.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
		KnexModule.register({
			debug: true,
			client: 'pg',
			connection: {
				host: process.env.DATABASE_HOST,
				port: parseInt(process.env.DATABASE_PORT),
				user: process.env.DATABASE_USER,
				password: process.env.DATABASE_PASSWORD,
				database: process.env.DATABASE_NAME,
			},
		}),
		AuthModule,
		UsersModule,
	],
})
export class AppModule {}
