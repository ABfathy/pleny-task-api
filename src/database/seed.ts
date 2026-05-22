import mongoose, { Schema, model } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

enum Cuisines {
  FRIED = 'Fried',
  ASIAN = 'Asian',
  BURGERS = 'Burgers',
  PIZZA = 'Pizza',
  SYRIAN = 'Syrian',
  ITALIAN = 'Italian',
}

const RestaurantSchema = new Schema(
  {
    nameEnglish: String,
    nameArabic: String,
    slug: { type: String, unique: true },
    cuisines: [{ type: String, enum: Cuisines }],
    location: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: [Number],
    },
  },
  { timestamps: true },
);
RestaurantSchema.index({ location: '2dsphere' });

const UserSchema = new Schema(
  {
    fullName: String,
    favoriteCuisines: [{ type: String, enum: Cuisines }],
  },
  { timestamps: true },
);

const UserFollowsRestaurantSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant' },
  },
  { timestamps: true },
);
UserFollowsRestaurantSchema.index(
  { userId: 1, restaurantId: 1 },
  { unique: true },
);

const RestaurantModel = model('Restaurant', RestaurantSchema);
const UserModel = model('User', UserSchema);
const UserFollowsRestaurantModel = model(
  'UserFollowsRestaurant',
  UserFollowsRestaurantSchema,
);

// random cairo based
const restaurants = [
  {
    nameEnglish: 'Wimpy',
    nameArabic: 'ومبي',
    slug: 'wimpy-burger',
    cuisines: [Cuisines.BURGERS],
    location: { type: 'Point', coordinates: [31.2357, 30.0444] },
  },
  {
    nameEnglish: 'Bazooka',
    nameArabic: 'بازوكا',
    slug: 'bazooka-fried-chicken',
    cuisines: [Cuisines.FRIED, Cuisines.BURGERS],
    location: { type: 'Point', coordinates: [31.236, 30.0447] },
  },

  {
    nameEnglish: 'Buffalo burger',
    nameArabic: 'بافلو برجر',
    slug: 'buffalo-burger',
    cuisines: [Cuisines.BURGERS],
    location: { type: 'Point', coordinates: [31.235, 30.044] },
  },

  {
    nameEnglish: 'Chinese Muslim restaurant',
    nameArabic: 'مطعم الصينى المسلم',
    slug: 'chinese-muslim-restaurant-nasr-city',
    cuisines: [Cuisines.ASIAN],
    location: { type: 'Point', coordinates: [31.2365, 30.0452] },
  },
  {
    nameEnglish: 'Panda house',
    nameArabic: 'باندا هاوس',
    slug: 'panda-house',
    cuisines: [Cuisines.ASIAN],
    location: { type: 'Point', coordinates: [31.237, 30.0456] },
  },

  {
    nameEnglish: 'Nile Pizza Co',
    nameArabic: 'نايل بيتزا',
    slug: 'nile-pizza-co',
    cuisines: [Cuisines.PIZZA, Cuisines.ITALIAN],
    location: { type: 'Point', coordinates: [31.2345, 30.0435] },
  },
  {
    nameEnglish: 'Roma Trattoria',
    nameArabic: 'روما تراتوريا',
    slug: 'roma-trattoria',
    cuisines: [Cuisines.ITALIAN],
    location: { type: 'Point', coordinates: [31.2375, 30.046] },
  },

  {
    nameEnglish: 'Abou Mazen',
    nameArabic: 'أبو مازن',
    slug: 'abou-mazen-il-sory',
    cuisines: [Cuisines.SYRIAN],
    location: { type: 'Point', coordinates: [31.234, 30.043] },
  },
  {
    nameEnglish: 'zeen Al Sham',
    nameArabic: 'زين الشام',
    slug: 'zeen-al-sham',
    cuisines: [Cuisines.SYRIAN, Cuisines.PIZZA],
    location: { type: 'Point', coordinates: [31.2335, 30.0425] },
  },
];

const users = [
  { fullName: 'Ahmed Hassan', favoriteCuisines: [Cuisines.ASIAN] },
  { fullName: 'Omar Khalil', favoriteCuisines: [Cuisines.ASIAN] },

  {
    fullName: 'Sara Mohamed',
    favoriteCuisines: [Cuisines.BURGERS, Cuisines.FRIED],
  },
  {
    fullName: 'Youssef Fathy',
    favoriteCuisines: [Cuisines.BURGERS, Cuisines.FRIED],
  },

  {
    fullName: 'Nour Abdallah',
    favoriteCuisines: [Cuisines.PIZZA, Cuisines.ITALIAN],
  },

  { fullName: 'Mariam Adel', favoriteCuisines: [Cuisines.SYRIAN] },
];

async function seed() {
  const DATABASE_URI =
    process.env.DATABASE_URI ?? 'mongodb://localhost:27017/restaurant-api';

  await mongoose.connect(DATABASE_URI);

  await Promise.all([
    RestaurantModel.deleteMany({}),
    UserModel.deleteMany({}),
    UserFollowsRestaurantModel.deleteMany({}),
  ]);

  const insertedRestaurants = await RestaurantModel.insertMany(restaurants);
  const insertedUsers = await UserModel.insertMany(users);

  const r = Object.fromEntries(insertedRestaurants.map((r) => [r.slug, r._id]));
  const u = Object.fromEntries(insertedUsers.map((u) => [u.fullName, u._id]));

  const follows = [
    {
      userId: u['Ahmed Hassan'],
      restaurantId: r['chinese-muslim-restaurant-nasr-city'],
    },
    { userId: u['Ahmed Hassan'], restaurantId: r['nile-pizza-co'] },

    { userId: u['Omar Khalil'], restaurantId: r['panda-house'] },
    { userId: u['Omar Khalil'], restaurantId: r['roma-trattoria'] },

    { userId: u['Sara Mohamed'], restaurantId: r['wimpy-burger'] },
    { userId: u['Sara Mohamed'], restaurantId: r['buffalo-burger'] },

    { userId: u['Youssef Fathy'], restaurantId: r['bazooka-fried-chicken'] },
    { userId: u['Youssef Fathy'], restaurantId: r['wimpy-burger'] },

    { userId: u['Nour Abdallah'], restaurantId: r['nile-pizza-co'] },
    { userId: u['Nour Abdallah'], restaurantId: r['roma-trattoria'] },

    { userId: u['Mariam Adel'], restaurantId: r['abou-mazen-il-sory'] },
    { userId: u['Mariam Adel'], restaurantId: r['zeen-al-sham'] },
  ];

  await UserFollowsRestaurantModel.insertMany(follows);

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  mongoose.disconnect();
  process.exit(1);
});
