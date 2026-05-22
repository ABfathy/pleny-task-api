import { Cuisines } from '@/common/enums/cuisines.enum';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Restaurant {
  @Prop({ required: true })
  nameEnglish!: string;

  @Prop({ required: true })
  nameArabic!: string;

  @Prop({ unique: true, required: true })
  slug!: string;

  @Prop({
    required: true,
    type: [String],
    enum: Cuisines,
  })
  cuisines!: Cuisines[];

  @Prop({
    type: {
      type: String,
      required: true,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  })
  location!: {
    type: 'Point';
    coordinates: number[];
  };
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);

RestaurantSchema.index({ location: '2dsphere' });
RestaurantSchema.index({ cuisines: 1 });
