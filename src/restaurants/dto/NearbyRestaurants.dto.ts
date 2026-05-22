import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max } from 'class-validator';

export class NearbyRestaurantsDto {
  @ApiProperty({
    description: 'Latitude of search origin',
    example: 30.0444,
  })
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat!: number;

  @ApiProperty({
    description: 'Longitude of search origin',
    example: 31.2357,
  })
  @IsNumber()
  @Min(-180)
  @Max(180)
  lng!: number;
}
