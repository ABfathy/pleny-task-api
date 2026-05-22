import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import { isValidObjectId, Model } from 'mongoose';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { FilterRestaurantsDto } from './dto/fIlter-restaurants.dto';
import { NearbyRestaurantsDto } from './dto/nearby-restaurants.dto';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<Restaurant>,
  ) {}

  async create(createRestaurantDto: CreateRestaurantDto): Promise<Restaurant> {
    const newRestaurant = await new this.restaurantModel(
      createRestaurantDto,
    ).save();

    return newRestaurant;
  }

  async findAll(
    filterRestaurantsDto: FilterRestaurantsDto,
  ): Promise<Restaurant[]> {
    const filter = filterRestaurantsDto.cuisine
      ? { cuisines: filterRestaurantsDto.cuisine }
      : {};

    const restaurants = await this.restaurantModel
      .find(filter)
      .skip((filterRestaurantsDto.page - 1) * filterRestaurantsDto.limit)
      .limit(filterRestaurantsDto.limit)
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

  async findNearby(
    nearbyRestaurantsDto: NearbyRestaurantsDto,
  ): Promise<Restaurant[]> {
    const restaurants = await this.restaurantModel
      .find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [nearbyRestaurantsDto.lng, nearbyRestaurantsDto.lat],
            },
            $maxDistance: 1000,
          },
        },
      })
      .lean();

    return restaurants;
  }
}
