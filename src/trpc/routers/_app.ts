import { courseRouter } from '@/modules/course/server/procedure';
import { createTRPCRouter } from '../init';
import { authRouter } from '@/modules/auth/server/procedure';
import { lessonRouter } from '@/modules/lessons/server/procedured';
import { quizzRouter } from '@/modules/quizz/server/procedure';
import { staticsRouter } from '@/modules/statics/server/procedure';
export const appRouter = createTRPCRouter({
  auth: authRouter,
  statics : staticsRouter,
  quizz : quizzRouter,
  lesson : lessonRouter,
  course : courseRouter,


});
// export type definition of API
export type AppRouter = typeof appRouter;
