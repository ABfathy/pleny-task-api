# Restaurant API

NestJS + MongoDB REST API for restaurant management and recommendations.

## Stack
- NestJS (Express)
- MongoDB + Mongoose
- Swagger UI → `/api/docs`

## Setup

```bash
pnpm install
cp .env.example .env  # add DATABASE_URI
pnpm run seed         # seed the database - don't do this if you use the one i will provide in email
pnpm run start:dev
```

## Endpoints

### Restaurants
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/restaurants` | Create restaurant |
| GET | `/api/restaurants` | List all — filter by `?cuisine=` + pagination |
| GET | `/api/restaurants/nearby` | Find within 1km — requires `?lat=&lng=` |
| GET | `/api/restaurants/:identifier` | Get by ID or slug |

### Users
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/users` | Create user |
| POST | `/api/users/:id/follow` | Follow a restaurant |
| GET | `/api/users/:id/following` | Get followed restaurants |
| DELETE | `/api/users/:userId/follow/:restaurantId` | Unfollow |

### Recommendations
| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/recommendation/:id` | Get recommended restaurants based on shared cuisine preferences |

## How recommendations work

Takes a user ID, finds other users with overlapping favorite cuisines, returns their followed restaurants alongside those users in a single aggregation pipeline.