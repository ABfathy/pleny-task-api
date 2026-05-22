import { ApiProperty } from '@nestjs/swagger';

export class RecommendationResponseDto {
  @ApiProperty({ type: [Object] })
  users!: Record<string, any>[];

  @ApiProperty({ type: [Object] })
  restaurants!: Record<string, any>[];
}
