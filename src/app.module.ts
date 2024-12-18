import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from './knex/knex.module';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './response/response.interceptor';
import { FilesModule } from './files/files.module';
import { FoldersModule } from './folders/folders.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { WorkspacesUsersModule } from './workspaces-users/workspaces-users.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
	imports: [
		EventEmitterModule.forRoot(),
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
		FilesModule,
		FoldersModule,
		WorkspacesModule,
		WorkspacesUsersModule,
	],
	providers: [
		{
			provide: APP_INTERCEPTOR,
			useClass: ResponseInterceptor,
		},
	],
})
export class AppModule {}
