import { Controller, Post, Body, Param, Get, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiOperation,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { FollowsRestaurantDto } from './dto/follows-restaurant.dto';
import { ParseMongoIdPipe } from '@/common/pipes/parse-mongo-id.pipe';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // i used the follow dto in body and the id for route param more restful
  @ApiOperation({ summary: 'Follow a restaurant' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiConflictResponse()
  @ApiNotFoundResponse()
  @Post(':id/follow')
  followRestaurant(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() followsRestaurantDto: FollowsRestaurantDto,
  ) {
    return this.usersService.followRestaurant(id, followsRestaurantDto);
  }

  @ApiOperation({ summary: 'Get restaurants followed by user' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @Get(':id/following')
  getFollowing(@Param('id', ParseMongoIdPipe) id: string) {
    return this.usersService.getFollowing(id);
  }

  // restId passed via route param more restful - part of resource identifier
  @ApiOperation({ summary: 'Unfollow a restaurant' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @Delete(':userId/follow/:restaurantId')
  unfollowRestaurant(
    @Param('userId', ParseMongoIdPipe) userId: string,
    @Param('restaurantId', ParseMongoIdPipe) restaurantId: string,
  ) {
    return this.usersService.unfollowRestaurant(userId, restaurantId);
  }
}
