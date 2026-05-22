import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Page number to retrieve',
    example: 1,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Max docs per page',
    example: 10,
  })
  @IsOptional()
  @IsInt()
  @Max(100)
  @Min(1)
  limit: number = 10;
}
