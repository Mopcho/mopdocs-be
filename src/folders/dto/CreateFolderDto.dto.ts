import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateFolderDto {
	@IsString()
	@MinLength(1)
	@MaxLength(16)
	name: string;

	@IsString()
	@IsOptional()
	label?: string;

	@IsString()
	@IsOptional()
	parentId?: string;
}
