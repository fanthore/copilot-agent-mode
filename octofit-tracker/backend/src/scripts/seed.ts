import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models.js';

async function seedDatabase() {
  try {
    await connectDatabase();

    const users = await Promise.all([
      UserModel.findOneAndUpdate(
        { username: 'alex-runner' },
        { name: 'Alex Rivera', username: 'alex-runner', email: 'alex@example.com' },
        { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
      ),
      UserModel.findOneAndUpdate(
        { username: 'sam-cyclist' },
        { name: 'Sam Chen', username: 'sam-cyclist', email: 'sam@example.com' },
        { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
      ),
      UserModel.findOneAndUpdate(
        { username: 'jordan-lifts' },
        { name: 'Jordan Patel', username: 'jordan-lifts', email: 'jordan@example.com' },
        { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
      ),
    ]);

    const team = await TeamModel.findOneAndUpdate(
      { name: 'Morning Movers' },
      { name: 'Morning Movers', description: 'A team for consistent early workouts.', members: users.map(({ _id }) => _id) },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
    );

    await Promise.all([
      ActivityModel.findOneAndUpdate(
        { user: users[0]._id, type: 'Running' },
        { user: users[0]._id, team: team._id, type: 'Running', durationMinutes: 32, caloriesBurned: 280 },
        { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
      ),
      ActivityModel.findOneAndUpdate(
        { user: users[1]._id, type: 'Cycling' },
        { user: users[1]._id, team: team._id, type: 'Cycling', durationMinutes: 45, caloriesBurned: 410 },
        { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
      ),
      ActivityModel.findOneAndUpdate(
        { user: users[2]._id, type: 'Strength training' },
        {
          user: users[2]._id,
          team: team._id,
          type: 'Strength training',
          durationMinutes: 40,
          caloriesBurned: 320,
        },
        { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
      ),
      ...users.map((user, index) =>
        LeaderboardModel.findOneAndUpdate(
          { user: user._id },
          { user: user._id, team: team._id, points: [320, 275, 240][index], rank: index + 1 },
          { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
        ),
      ),
      WorkoutModel.findOneAndUpdate(
        { title: 'Starter Run' },
        {
          title: 'Starter Run',
          description: 'An easy-paced run with a short warm-up and cool-down.',
          difficulty: 'beginner',
          durationMinutes: 25,
          exercises: ['5-minute warm-up', '15-minute easy run', '5-minute cool-down'],
        },
        { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
      ),
      WorkoutModel.findOneAndUpdate(
        { title: 'Full-body Strength' },
        {
          title: 'Full-body Strength',
          description: 'A balanced bodyweight strength session.',
          difficulty: 'intermediate',
          durationMinutes: 35,
          exercises: ['Squats', 'Push-ups', 'Reverse lunges', 'Plank'],
        },
        { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
      ),
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
