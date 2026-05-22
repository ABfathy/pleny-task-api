import { Cuisines } from '@/common/enums/Cuisines.enum';
import { PaginationDto } from '@/common/dto/Pagination.dto';
import { IsEnum, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterRestaurantsDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Type of cuisine to filter by',
    enum: Cuisines,
    example: Cuisines.ASIAN,
  })
  @IsOptional()
  @IsEnum(Cuisines)
  cuisine?: Cuisines;
}
