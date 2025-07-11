import { z } from 'zod';
import { baseProcedure, createTRPCRouter } from '../init';
import { authRouter } from '@/modules/auth/server/procedure';
import { staticsRouter } from '@/modules/home/statics/server/procedure';
export const appRouter = createTRPCRouter({
  auth: authRouter,
  statics : staticsRouter,

});
// export type definition of API
export type AppRouter = typeof appRouter;
