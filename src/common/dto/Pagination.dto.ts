import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
export class PaginationDto {
  @ApiPropertyOptional({
    description: 'Page number to retrieve',
    example: 1,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    description: 'Max docs per page',
    example: 10,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Max(100)
  @Min(1)
  limit: number = 10;
}
