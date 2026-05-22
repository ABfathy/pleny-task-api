import { Cuisines } from '@/common/enums/cuisines.enum';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  Equals,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
  MaxLength,
} from 'class-validator';

import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({
    description: 'type of location',
    example: 'Point',
  })
  @IsNotEmpty()
  @Equals('Point')
  type!: 'Point';

  @ApiProperty({
    description: 'Coordinates of location',
    type: [Number],
    example: [31.2357, 30.0444],
  })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  @IsNumber({}, { each: true })
  coordinates!: number[];
}

export class CreateRestaurantDto {
  @ApiProperty({
    description: 'English name of restaurant',
    example: 'il brka',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nameEnglish!: string;

  @ApiProperty({
    description: 'Arabic name of restaurant',
    example: 'البركة',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nameArabic!: string;

  @ApiProperty({
    description: 'Slug of the restaurant',
    example: 'il-brka-fried-chicken',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  slug!: string;

  @ApiProperty({
    description: 'Cuisines offered by restaurant',
    enum: Cuisines,
    isArray: true,
    example: [Cuisines.FRIED],
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @IsEnum(Cuisines, { each: true })
  cuisines!: Cuisines[];

  @ApiProperty({
    description: 'Location of restaurant',
    type: () => CreateLocationDto,
    example: { type: 'Point', coordinates: [31.2357, 30.0444] },
  })
  @IsObject()
  @ValidateNested()
  @Type(() => CreateLocationDto)
  location!: CreateLocationDto;
}
