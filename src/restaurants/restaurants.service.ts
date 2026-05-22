import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import { isValidObjectId, Model } from 'mongoose';
import { CreateRestaurantDto } from './dto/CreateRestaurant.dto';
import { FilterRestaurantsDto } from './dto/FIlterRestaurants.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>,
  ) {}

  async create(dto: CreateRestaurantDto): Promise<Restaurant> {
    const newRestaurant = await new this.restaurantModel(dto).save();

    return newRestaurant;
  }

  async findAll(dto: FilterRestaurantsDto): Promise<Restaurant[]> {
    const filter = dto.cuisine ? { cuisines: dto.cuisine } : {};

    const restaurants = await this.restaurantModel
      .find(filter)
      .skip((dto.page - 1) * dto.limit)
      .limit(dto.limit)
      .lean();

    return restaurants;
  }

  async findOne(identifier: string): Promise<Restaurant> {
    const filter = isValidObjectId(identifier)
      ? { _id: identifier }
      : { slug: identifier };

    const restaurant = await this.restaurantModel.findOne(filter).lean();

    if (!restaurant) throw new NotFoundException('Restaurant not found');

    return restaurant;
  }
}
