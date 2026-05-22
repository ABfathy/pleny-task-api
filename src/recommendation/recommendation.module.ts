import { Module } from '@nestjs/common';
import { RecommendationService } from './recommendation.service';
import { RecommendationController } from './recommendation.controller';
import { UsersModule } from '@/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [RecommendationService],
  controllers: [RecommendationController],
})
export class RecommendationModule {}
