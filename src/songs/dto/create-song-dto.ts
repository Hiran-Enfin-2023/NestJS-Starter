import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSongDTO {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  readonly artists;

  @IsDateString()
  @IsNotEmpty()
  readonly releaseDate: Date;

  @IsNotEmpty()
  @IsMilitaryTime()
  readonly duration: Date;

  @IsNotEmpty()
  @IsOptional()
  readonly lyrics: string;
}
