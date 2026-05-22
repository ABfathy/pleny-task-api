import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './schemas/user.schema';
import {
  UserFollowsRestaurant,
  UserFollowsRestaurantSchema,
} from './schemas/user-follows-restaurant.schema';
import { RestaurantsModule } from '@/restaurants/restaurants.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: UserFollowsRestaurant.name,
        schema: UserFollowsRestaurantSchema,
      },
    ]),
    RestaurantsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [MongooseModule],
})
export class UsersModule {}
