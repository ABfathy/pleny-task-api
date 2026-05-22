import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class FollowsRestaurantDto {
  @ApiProperty({
    description: 'Id of followed restaurant',
    example: '6a0f36cb560e5950b15b78a4',
  })
  @IsMongoId()
  restaurantId!: string;
}
