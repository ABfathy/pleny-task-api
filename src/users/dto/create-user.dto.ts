import { Cuisines } from '@/common/enums/cuisines.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  ArrayUnique,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'Full name of the user',
    example: 'Abdallah Mohamed Fathy',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  fullName!: string;

  @ApiProperty({
    description: 'Cuisines liked by user',
    example: [Cuisines.ASIAN, Cuisines.FRIED],
    enum: Cuisines,
    isArray: true,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  @IsEnum(Cuisines, { each: true })
  favoriteCuisines!: Cuisines[];
}
