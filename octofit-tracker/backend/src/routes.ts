import { Router, type Request, type Response } from 'express';
import type { Model } from 'mongoose';
import {
  ActivityModel,
  LeaderboardModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from './models.js';

function createResourceRouter<T>(resource: Model<T>): Router {
  const router = Router();

  router.get('/', async (_request: Request, response: Response) => {
    response.json(await resource.find().sort({ createdAt: -1 }).lean());
  });

  router.post('/', async (request: Request, response: Response) => {
    response.status(201).json(await resource.create(request.body));
  });

  router.get('/:id', async (request: Request, response: Response) => {
    const document = await resource.findById(request.params.id).lean();
    if (!document) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }
    response.json(document);
  });

  router.patch('/:id', async (request: Request, response: Response) => {
    const document = await resource.findByIdAndUpdate(request.params.id, request.body, {
      new: true,
      runValidators: true,
    });
    if (!document) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }
    response.json(document);
  });

  router.delete('/:id', async (request: Request, response: Response) => {
    const document = await resource.findByIdAndDelete(request.params.id);
    if (!document) {
      response.status(404).json({ error: 'Resource not found' });
      return;
    }
    response.status(204).end();
  });

  return router;
}

const apiRouter = Router();
apiRouter.use('/users', createResourceRouter(UserModel));
apiRouter.use('/teams', createResourceRouter(TeamModel));
apiRouter.use('/activities', createResourceRouter(ActivityModel));
apiRouter.use('/leaderboard', createResourceRouter(LeaderboardModel));
apiRouter.use('/workouts', createResourceRouter(WorkoutModel));

export default apiRouter;