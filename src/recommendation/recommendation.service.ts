import { User } from '@/users/schemas/user.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RecommendationResponseDto } from './dto/recommendation-response.dto';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectModel(User.name)
    private readonly usersModel: Model<User>,
  ) {}

  async getRecommendations(id: string): Promise<RecommendationResponseDto> {
    const user = await this.usersModel.findById(id);

    if (!user) throw new NotFoundException('User not found');

    const result = await this.usersModel.aggregate([
      {
        $match: {
          favoriteCuisines: { $in: user.favoriteCuisines },
          _id: { $ne: user._id },
        },
      },
      {
        $lookup: {
          from: 'userfollowsrestaurants',
          localField: '_id',
          foreignField: 'userId',
          as: 'follows',
        },
      },
      {
        $facet: {
          users: [{ $project: { fullName: 1, favoriteCuisines: 1 } }],
          restaurants: [
            {
              $lookup: {
                from: 'restaurants',
                localField: 'follows.restaurantId',
                foreignField: '_id',
                as: 'restaurants',
              },
            },
            { $unwind: '$restaurants' },
            { $replaceRoot: { newRoot: '$restaurants' } },
            { $group: { _id: '$_id', doc: { $first: '$$ROOT' } } },
            { $replaceRoot: { newRoot: '$doc' } },
          ],
        },
      },
    ]);

    return result[0] as RecommendationResponseDto;
  }
}
