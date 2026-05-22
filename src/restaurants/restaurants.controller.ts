import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/CreateRestaurant.dto';
import { FilterRestaurantsDto } from './dto/FIlterRestaurants.dto';
import { NearbyRestaurantsDto } from './dto/NearbyRestaurants.dto';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantService: RestaurantsService) {}

  @ApiOperation({ summary: 'Create a new restaurant' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiConflictResponse()
  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantService.create(createRestaurantDto);
  }

  @ApiOperation({ summary: 'List all restaurants | filter by cuisine' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @Get()
  findAll(@Query() filterRestaurantsDto: FilterRestaurantsDto) {
    return this.restaurantService.findAll(filterRestaurantsDto);
  }

  @ApiOperation({ summary: 'Find nearby restaurants from Origin point by 1km' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @Get('nearby')
  findNearby(@Query() nearbyRestaurantsDto: NearbyRestaurantsDto) {
    return this.restaurantService.findNearby(nearbyRestaurantsDto);
  }

  @ApiOperation({ summary: 'Find restaurant by Id or slug' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Get(':identifier')
  findOne(@Param('identifier') identifier: string) {
    return this.restaurantService.findOne(identifier);
  }
}
