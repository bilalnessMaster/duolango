import { courseRouter } from '@/modules/course/server/procedure';
import { createTRPCRouter } from '../init';
import { authRouter } from '@/modules/auth/server/procedure';
import { lessonRouter } from '@/modules/lessons/server/procedured';
import { quizzRouter } from '@/modules/quizz/server/procedure';
import { staticsRouter } from '@/modules/statics/server/procedure';
import { shopRouter } from '@/modules/shop/server/procedure';
export const appRouter = createTRPCRouter({
  auth: authRouter,
  statics: staticsRouter,
  quizz: quizzRouter,
  lesson: lessonRouter,
  course: courseRouter,
  shop: shopRouter,


});
// export type definition of API
export type AppRouter = typeof appRouter;
