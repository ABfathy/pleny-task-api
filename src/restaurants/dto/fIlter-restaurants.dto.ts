import { Cuisines } from '@/common/enums/cuisines.enum';
import { PaginationDto } from '@/common/dto/pagination.dto';
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
