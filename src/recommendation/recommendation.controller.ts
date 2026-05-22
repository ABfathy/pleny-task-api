import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RecommendationService } from './recommendation.service';

@ApiTags('recommendations')
@Controller('recommendation')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @ApiOperation({
    summary:
      'Get restaurant recommendations and similar users based on shared cuisines',
  })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @Get(':id')
  getRecommendations(@Param('id') id: string) {
    return this.recommendationService.getRecommendations(id);
  }
}
