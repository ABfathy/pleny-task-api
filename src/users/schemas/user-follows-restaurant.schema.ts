import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true })
export class UserFollowsRestaurant {
  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'User' })
  userId!: Types.ObjectId;

  @Prop({ required: true, type: SchemaTypes.ObjectId, ref: 'Restaurant' })
  restaurantId!: Types.ObjectId;
}

export const UserFollowsRestaurantSchema = SchemaFactory.createForClass(
  UserFollowsRestaurant,
);

UserFollowsRestaurantSchema.index({ userId: 1 });
UserFollowsRestaurantSchema.index({ restaurantId: 1 });
UserFollowsRestaurantSchema.index(
  { userId: 1, restaurantId: 1 },
  { unique: true },
);
