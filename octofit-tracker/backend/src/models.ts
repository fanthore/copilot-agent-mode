import { model, Schema, Types } from 'mongoose';

export interface User {
  name: string;
  username: string;
  email: string;
}

export interface Team {
  name: string;
  description: string;
  members: Types.ObjectId[];
}

export interface Activity {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  performedAt: Date;
}

export interface LeaderboardEntry {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  points: number;
  rank: number;
}

export interface Workout {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  exercises: string[];
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  },
  { timestamps: true },
);

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, default: '' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

const activitySchema = new Schema<Activity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, default: 0, min: 0 },
    performedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const leaderboardSchema = new Schema<LeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, min: 0, default: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

const workoutSchema = new Schema<Workout>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: { type: [String], default: [] },
  },
  { timestamps: true },
);

export const UserModel = model<User>('User', userSchema);
export const TeamModel = model<Team>('Team', teamSchema);
export const ActivityModel = model<Activity>('Activity', activitySchema);
export const LeaderboardModel = model<LeaderboardEntry>('Leaderboard', leaderboardSchema);
export const WorkoutModel = model<Workout>('Workout', workoutSchema);