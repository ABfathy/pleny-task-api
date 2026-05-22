import { Cuisines } from '@/common/enums/cuisines.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({ required: true })
  fullName!: string;

  @Prop({ required: true, type: [String], enum: Cuisines })
  favoriteCuisines!: Cuisines[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ favoriteCuisines: 1 });
