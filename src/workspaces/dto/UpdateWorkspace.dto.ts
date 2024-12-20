import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateWorkspaceDto {
	@IsString()
	@MinLength(1)
	@MaxLength(16)
	name: string;
}
