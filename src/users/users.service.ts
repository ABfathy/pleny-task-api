import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { Restaurant } from '@/restaurants/schemas/restaurant.schema';
import { UserFollowsRestaurant } from './schemas/user-follows-restaurant.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>,
    @InjectModel(UserFollowsRestaurant.name)
    private readonly userFollowsRestaurantModel: Model<UserFollowsRestaurant>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await new this.userModel(createUserDto).save();

    return newUser;
  }

  async followRestaurant(
    userId: string,
    restaurantId: string,
  ): Promise<UserFollowsRestaurant> {
    const [user, restaurant] = await Promise.all([
      this.userModel.findById(userId),
      this.restaurantModel.findById(restaurantId),
    ]);

    if (!user) throw new NotFoundException('User Not found');
    if (!restaurant) throw new NotFoundException('Restaurant Not found');

    const newFollow = await new this.userFollowsRestaurantModel({
      userId: user._id,
      restaurantId: restaurant._id,
    }).save();

    return newFollow;
  }

  async unfollowRestaurant(
    userId: string,
    restaurantId: string,
  ): Promise<void> {
    const [user, restaurant] = await Promise.all([
      this.userModel.findById(userId),
      this.restaurantModel.findById(restaurantId),
    ]);

    if (!user) throw new NotFoundException('User Not found');
    if (!restaurant) throw new NotFoundException('Restaurant Not found');

    const deletedFollow =
      await this.userFollowsRestaurantModel.findOneAndDelete({
        userId: user._id,
        restaurantId: restaurant._id,
      });

    if (!deletedFollow)
      throw new NotFoundException('User doesnt follow restaurant');
  }

  async getFollowing(userId: string): Promise<Restaurant[]> {
    const user = await this.userModel.findById(userId);

    if (!user) throw new NotFoundException('User Not found');

    const follows = await this.userFollowsRestaurantModel
      .find({
        userId: user._id,
      })
      .lean();

    const restaurantIds = follows.map((f) => f.restaurantId);
    const restaurants = await this.restaurantModel
      .find({ _id: { $in: restaurantIds } })
      .lean();

    return restaurants;
  }
}
