import { Cuisines } from '@/common/enums/Cuisines.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  fullName!: string;

  @Prop({ required: true, type: [String], enum: Cuisines })
  favoriteCuisines!: Cuisines[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ favoriteCuisines: 1 });
