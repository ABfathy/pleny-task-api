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
  ArrayUnique,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
} from 'class-validator';

import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@ValidatorConstraint({ name: 'isLngLat', async: false })
class IsLngLat implements ValidatorConstraintInterface {
  validate(value: number[]) {
    if (!Array.isArray(value)) return false;
    const [lng, lat] = value;
    return lng >= -180 && lng <= 180 && lat >= -90 && lat <= 90;
  }
  defaultMessage() {
    return 'coordinates must be [lng, lat] with lng in [-180,180] and lat in [-90,90]';
  }
}

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
  @Validate(IsLngLat)
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
  @ArrayUnique()
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
